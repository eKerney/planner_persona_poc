import * as geoprocessor from "@arcgis/core/rest/geoprocessor.js";
import esriRequest from "@arcgis/core/request.js";
import { AppContextInterface2, DataContextInterface, GPingestReturn, GeoprocessingParams } from "../types";
import { DataStatus, LoadingStatus, RequestType } from "../types/enums";
import ingestData from './gpIngestReturn.json';

export const fetchGeoprocessData = (dataContext: DataContextInterface, dataDispatch: any, appContext: AppContextInterface2, appDispatch: any, formData: any = '', fieldMap: object = {}) => {
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

  const GeoprocessorSubmitJob = (baseGPurl: string, gpToolURL: string, gpParams: GeoprocessingParams, itemID: string) => {
    console.log('GeoprocessorSubmitJob')
    gpParams.FIle = { itemID: itemID };
    // console.log(gpParams);
    geoprocessor.submitJob((`${baseGPurl}${gpToolURL}`), gpParams).then((jobInfo) => {
     console.log("ArcGIS Server job ID: ", jobInfo.jobId);
      const options = { interval: 1500, statusCallback: (j: any) => console.log("Job Status: ", j.jobStatus, j.messages, j.messages.length > 0 ? j.messages[j.messages.length-1].description : '')};
      jobInfo.waitForJobCompletion(options).then(() => {
        const gpIngestReturn: GPingestReturn = { Return_Fields: '', Return_df_Json: {}, Return_Req_Fields: ''}
        jobInfo.fetchResultData("Return_Fields").then((data) => gpIngestReturn.Return_Fields = data.value.split(","))
        jobInfo.fetchResultData("Return_df_Json").then((data) => gpIngestReturn.Return_df_Json = data.value)
        jobInfo.fetchResultData("Return_Req_Fields").then((data) => {
          gpIngestReturn.Return_Req_Fields = data.value.split(",")
          dataDispatch({ type: 'gpIngestReturn', payload: gpIngestReturn })
          appDispatch({ type: 'dataStatus', payload: LoadingStatus.SUCCESS })
          appDispatch({ type: 'multiple', payload: {
            dataStatus: LoadingStatus.LOADING, 
            currentDataState: DataStatus.FIELDSRETURNED,
            requestType: RequestType.PREPROCESS
          }})
        })
        // console.log('gpIngestReturn', gpIngestReturn)
        // console.log('I MADE IT HERE!!!!')
        // dataDispatch({ type: 'gpIngestReturn', payload: gpIngestReturn })
        // // appDispatch({ type: 'dataStatus', payload: LoadingStatus.SUCCESS })
        // appDispatch({ type: 'multiple', payload: {
        //   dataStatus: LoadingStatus.LOADING, 
        //   currentDataState: DataStatus.FIELDSRETURNED,
        //   requestType: RequestType.PREPROCESS
        // }})
      });
    });
  }

  // const ETLgeoProcessingIngest = (gpParams: GeoprocessingParams, baseGPurl: string, gpUploadURL: string, gpToolURL: string, formData: HTMLFormElement) => {
  //   console.log('ETLgeoProcessingIngest');
  //   appDispatch({ type: 'multiple', payload: {dataStatus: LoadingStatus.LOADING, currentDataState: DataStatus.DATASUBMITTED}})
  //   const uploadSucceeded = (response: any) => {
  //     const itemID = response["data"]["item"].itemID;
  //     console.log("File upload successful, item ID: ", itemID);
  //     GeoprocessorSubmitJob(baseGPurl, gpToolURL, gpParams, itemID);
  //     return itemID;
  //   }
  //   const uploadFailed = (response: any) => console.log("Failed: ", response);
  //   esriRequest((`${baseGPurl}${gpUploadURL}`), {
  //     method: "post", 
  //     body: formData,
  //     authMode: "immediate",
  //   }).then(uploadSucceeded, uploadFailed)
  //     .catch((error) => {
  //       console.error('An error occured uploading the file: ' + error);
  //       return null;
  //     });
  // }

  // local testing
  const ETLgeoProcessingIngest = (gpParams: GeoprocessingParams, baseGPurl: string, gpUploadURL: string, gpToolURL: string, formData: HTMLFormElement) => {
    console.log('ETLgeoProcessingIngest');
    const gpIngestReturn: GPingestReturn = { 
      Return_Fields: ingestData.Return_Fields.split(","), 
      Return_df_Json: ingestData.Return_df_Json, 
      Return_Req_Fields: ingestData.Return_Req_Fields.split(",")
    }
    //
    dataDispatch({ type: 'gpIngestReturn', payload: gpIngestReturn })
    appDispatch({ type: 'multiple', payload: {
      dataStatus: LoadingStatus.LOADING, 
      currentDataState: DataStatus.FIELDSRETURNED,
      requestType: RequestType.PREPROCESS
    }})

  }

  const ETLgeoProcessingPreprocess = (gpParams: GeoprocessingParams, baseGPurl: string, gpToolURL: string, fieldMap: object) => {
    console.log('ETLgeoProcessingPreprocess');
    gpParams = {
      ...gpParams, 
      JSON_data: dataContext.gpIngestReturn.Return_df_Json, 
      Field_Map: dataContext.fieldMap
      // JSON_data: JSON.stringify(dataContext.gpIngestReturn.Return_df_Json), 
      // Field_Map: JSON.stringify(dataContext.fieldMap)
    };
    console.log(gpParams);
    // console.log(dataContext.gpIngestReturn);
    geoprocessor.submitJob((`${baseGPurl}${gpToolURL}`), gpParams).then((jobInfo) => {
     console.log("ArcGIS Server job ID: ", jobInfo.jobId);
      const options = { interval: 1500, statusCallback: (j: any) => console.log("Job Status: ", j.jobStatus, j.messages)};
      jobInfo.waitForJobCompletion(options).then(() => {
        jobInfo.fetchResultData("Return_df_Json").then((data) => console.log(data.value))
        // dataDispatch({ type: 'gpIngestReturn', payload: gpIngestReturn })
        appDispatch({ type: 'dataStatus', payload: LoadingStatus.SUCCESS })
      });
    });
  }

  switch (appContext.requestType) {
    case RequestType.INGEST:
      ETLgeoProcessingIngest(gpParams, baseGPurl, gpUploadURL, gpToolURL, formData)
      break;
    case RequestType.PREPROCESS:
      ETLgeoProcessingPreprocess(gpParams, baseGPurl, gpToolURL, fieldMap)
      break;
    case RequestType.UPLOAD:
      // ETLgeoProcessingUpload(gpParams, baseGPurl, gpToolURL)
      break;
    case RequestType.FETCH:
      // fetchData()
      break;
  }
}
