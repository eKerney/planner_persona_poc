import * as geoprocessor from "@arcgis/core/rest/geoprocessor.js";
import esriRequest from "@arcgis/core/request.js";
import { AppContextInterface2, DataContextInterface, GPreturnData, GeoprocessingParams } from "../types";
import { DataStatus, LoadingStatus, RequestType } from "../types/enums";
import { DataContext } from "../contexts/DataStore";
import { AppContext2 } from "../contexts/AppStore2";
import { useContext } from "react";

export const useGeoprocessTool = () => {
  // @ts-ignore
  const [dataContext, dataDispatch] = useContext<DataContextInterface>(DataContext) 
  // @ts-ignore
  const [appContext, appDispatch] = useContext<AppContextInterface2>(AppContext2)
  // parameterized URL for GP Tool 
  const baseGPurl = "https://gis-dev.airspacelink.com/server/rest/services/ETLUpload/GPServer";
  const gpToolURL = "/etl_upload";
  const gpUploadURL = "/uploads/upload";

  const gpParams: GeoprocessingParams = {
    FIle: { itemID: ''},
    Data_Type: 'obstacles',
    Ingest_Trigger: appContext.requestType === RequestType.INGEST ? true : false,
    Preprocess_Trigger: appContext.requestType === RequestType.PREPROCESS ? true : false,
    Upload_Trigger: appContext.requestType === RequestType.UPLOAD ? true : false,
    Field_Map: {},
    JSON_data: {}
  };

  // options for statusCallback messaging from geoprocessor.submitJob()
  const options = { 
    interval: 1500, 
    statusCallback: (j: any) => {
      const description = j.messages.length > 0
        ? j.messages[j.messages.length-1].description
        : '';
      console.log("Job Status: ", j.jobStatus, j.messages, description);
      appDispatch({ type: 'geoprocessingMessages', payload: {
        type: 'jobStatus', 
        currentDataState: appContext.currentDataState,
        message: description
      }})
    }
  };
  const errorCallback = (error: any) => {
        console.error(`An error occured!!!: ${JSON.stringify(error)}`);
        console.error(error);
        const description: String = error.messages[error.messages.length-1].description;
        appDispatch({ type: 'geoprocessingMessages', payload: {
          type: 'jobStatus', 
          currentDataState: appContext.currentDataState,
          message: description
        }})
        return null;
  }

  // GP Tool Ingest Request
  const ETLgeoProcessingIngest = (gpParams: GeoprocessingParams, baseGPurl: string, gpUploadURL: string, gpToolURL: string) => {
    console.log('ETLgeoProcessingIngest');
    console.log('ETLgeoProcessingIngest', dataContext.dataForm);
    appDispatch({ type: 'multiple', payload: {dataStatus: LoadingStatus.LOADING, currentDataState: DataStatus.DATASUBMITTED}})
    const uploadSucceeded = (response: any) => {
      const itemID = response["data"]["item"].itemID;
      console.log("File upload successful, item ID: ", itemID);
      GeoprocessorSubmitJob(baseGPurl, gpToolURL, gpParams, itemID);
      return itemID;
    }
    const uploadFailed = (response: any) => console.log("Failed: ", response);
    esriRequest((`${baseGPurl}${gpUploadURL}`), {
      method: "post", 
      body: dataContext.dataForm,
      authMode: "immediate",
    }).then(uploadSucceeded, uploadFailed)
    .catch((error) => {
      console.error('An error occured uploading the file: ' + error);
      return null;
    });
  }

  // Atfer file upload via esriRequest() - fire GeoProcessor Ingest Job
  const GeoprocessorSubmitJob = (baseGPurl: string, gpToolURL: string, gpParams: GeoprocessingParams, itemID: string) => {
    console.log('GeoprocessorSubmitJob')
    gpParams.FIle = { itemID: itemID };
    // gpParams.FIle = { itemID: '' };

    geoprocessor.submitJob((`${baseGPurl}${gpToolURL}`), gpParams).then((jobInfo) => {
      console.log("ArcGIS Server job ID: ", jobInfo.jobId);

      jobInfo.waitForJobCompletion(options).then(() => {
        const gpIngestReturn: GPreturnData = { Return_Fields: '', Return_df_Json: {}, Return_Req_Fields: ''}

        jobInfo.fetchResultData("Return_Fields").then((data) => gpIngestReturn.Return_Fields = data.value.split(","))
        jobInfo.fetchResultData("Return_df_Json").then((data) => gpIngestReturn.Return_df_Json = data.value)

        jobInfo.fetchResultData("Return_Req_Fields").then((data) => {
          gpIngestReturn.Return_Req_Fields = data.value.split(",")
          console.log('Ingest', gpIngestReturn)
          dataDispatch({ type: 'gpIngestReturn', payload: gpIngestReturn })
          appDispatch({ type: 'dataStatus', payload: LoadingStatus.SUCCESS })
          appDispatch({ type: 'multiple', payload: {
            dataStatus: LoadingStatus.WAITING, 
            currentDataState: DataStatus.FIELDSRETURNED,
            requestType: RequestType.PREPROCESS,
            geoprocessingParams: {...appContext.geoprocessingParams, 
              FIle: {itemID: itemID}, 
              Data_Type: 'obstacles', 
              JSON_data: gpIngestReturn.Return_df_Json  
            }
          }
          })
        })
      })
      .catch((error) => errorCallback(error))
    })
  }

  // GeoProcessing PreProcess Job Function
  // testing error here
  const ETLgeoProcessingPreprocess = (gpParams: GeoprocessingParams, baseGPurl: string, gpToolURL: string) => {
    console.log('ETLgeoProcessingPreprocess');
    appDispatch({ type: 'multiple', payload: {dataStatus: LoadingStatus.LOADING}})
    gpParams = {
      ...gpParams, 
      FIle : appContext.geoprocessingParams.FIle,
      JSON_data: dataContext.gpIngestReturn.Return_df_Json,
      Field_Map: dataContext.fieldMap
      // Field_Map: {'someKey': 'someValue'} 
    };
    console.log('gpParams', gpParams);

    geoprocessor.submitJob((`${baseGPurl}${gpToolURL}`), gpParams).then((jobInfo) => {
      console.log("ArcGIS Server job ID: ", jobInfo.jobId);

      jobInfo.waitForJobCompletion(options).then(() => {
        jobInfo.fetchResultData("Return_df_Json").then((data) => {
          console.log('PreProcess Success');
          appDispatch({ type: 'dataStatus', payload: LoadingStatus.SUCCESS })
          dataDispatch({ type: 'gpPreprocessReturn', payload: {...dataContext.gpPreprocessReturn, Return_df_Json: data.value} })
          appDispatch({ type: 'multiple', payload: {
            dataStatus: LoadingStatus.WAITING, 
            currentDataState: DataStatus.FIELDSMATCHED,
            requestType: RequestType.UPLOAD,
            geoprocessingParams: {...appContext.geoprocessingParams, Data_Type: 'obstacles', JSON_data: data.value  }
          }});
        });
      })
      .catch((error) => errorCallback(error))
    })
  }

  // GeoProcessing Publish/Upload Final stage Function 
  const ETLgeoProcessingUpload = (gpParams: GeoprocessingParams, baseGPurl: string, gpToolURL: string) => {
    console.log('ETLgeoProcessingUpload');
    appDispatch({ type: 'multiple', payload: {dataStatus: LoadingStatus.LOADING}})
    gpParams = {
      ...gpParams, 
      FIle : appContext.geoprocessingParams.FIle,
      JSON_data: dataContext.gpPreprocessReturn.Return_df_Json,
    };
    console.log(gpParams);

    geoprocessor.submitJob((`${baseGPurl}${gpToolURL}`), gpParams).then((jobInfo) => {
      console.log("ArcGIS Server job ID: ", jobInfo.jobId);

      jobInfo.waitForJobCompletion(options).then(() => {
        jobInfo.fetchResultData("Return_Append_Count").then((data) => {
          appDispatch({ type: 'geoprocessingMessages', payload: {
            type: 'jobStatus', 
            currentDataState: appContext.currentDataState,
            message: `NEW FEATURES ADDED: ${data.value}`
          }})
        });
        jobInfo.fetchResultData("Return_df_Json").then((data) => {
          console.log('Upload Complete', data.value)
          appDispatch({ type: 'dataStatus', payload: LoadingStatus.SUCCESS })
          appDispatch({ type: 'multiple', payload: {
            currentDataState: DataStatus.DATAAPPROVED,
            requestType: RequestType.COMPLETED,
            geoprocessingParams: {...appContext.geoprocessingParams, Data_Type: 'obstacles', JSON_data: data.value  }
          }});
        });
      })
      .catch((error) => errorCallback(error))
    });
  }

  // Logic for which type of request occurs here
  const fetchSwitch = () => {
    switch (appContext.requestType) {
      case RequestType.INGEST:
        ETLgeoProcessingIngest(gpParams, baseGPurl, gpUploadURL, gpToolURL)
        break;
      case RequestType.PREPROCESS:
        ETLgeoProcessingPreprocess(gpParams, baseGPurl, gpToolURL)
        break;
      case RequestType.UPLOAD:
        ETLgeoProcessingUpload(gpParams, baseGPurl, gpToolURL)
        break;
      case RequestType.FETCH:
        // fetchData()
        break;
    }
  }

  return fetchSwitch;

}

