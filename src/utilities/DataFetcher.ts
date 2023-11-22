import * as geoprocessor from "@arcgis/core/rest/geoprocessor.js";
import esriRequest from "@arcgis/core/request.js";
import { AppContextInterface2, DataContextInterface, GPingestReturn, GeoprocessingParams } from "../types";
import { DataStatus, LoadingStatus, RequestType } from "../types/enums";

export const fetchGeoprocessData = (dataContext: DataContextInterface, dataDispatch: any, appContext: AppContextInterface2, 
                                    appDispatch: any, formData?: any, fieldMap?: object) => {
  // TODO: Parameterize these routes 
  const baseGPurl = "https://gis-dev.airspacelink.com/server/rest/services/ETLUpload/GPServer";
  const gpToolURL = "/etl_upload";
  const gpUploadURL = "/uploads/upload";

  const gpParams: GeoprocessingParams = {
    FIle: { itemID: ''},
    Data_Type: dataContext.dataType,
    Ingest_Trigger: appContext.requestType === RequestType.INGEST ? true : false,
    Preprocess_Trigger: appContext.requestType === RequestType.PREPROCESS ? true : false,
    Upload_Trigger: appContext.requestType === RequestType.UPLOAD ? true : false,
    Field_Map: {},
    df_json: {}
  };


  const GeoprocessorSubmitJob = (baseGPurl: string, gpToolURL: string, gpParams: GeoprocessingParams, itemID: string) => {
    gpParams.FIle = { itemID: itemID };
    geoprocessor.submitJob((`${baseGPurl}${gpToolURL}`), gpParams).then((jobInfo) => {
     console.log("ArcGIS Server job ID: ", jobInfo.jobId);
      const options = { interval: 1500, statusCallback: (j: any) => console.log("Job Status: ", j.jobStatus, j.messages)};
      jobInfo.waitForJobCompletion(options).then(() => {
        const gpIngestReturn: GPingestReturn = { Return_Fields: '', Return_df_Json: '', Return_Req_Fields: ''}
        jobInfo.fetchResultData("Return_Fields").then((data) => gpIngestReturn.Return_Fields = data.value)
        jobInfo.fetchResultData("Return_df_Json").then((data) => gpIngestReturn.Return_df_Json = data.value)
        jobInfo.fetchResultData("Return_Req_Fields").then((data) => gpIngestReturn.Return_Req_Fields = data.value)
        dataDispatch({ type: 'gpIngestReturn', payload: gpIngestReturn })
        appDispatch({ type: 'dataStatus', payload: LoadingStatus.SUCCESS })
      });
    });
  }

  const ETLgeoProcessingIngest = (gpParams: GeoprocessingParams, baseGPurl: string, gpUploadURL: string, gpToolURL: string, formData: HTMLFormElement) => {
    appDispatch({ type: 'dataStatus', payload: LoadingStatus.LOADING })
    appDispatch({ type: 'currentDataState', payload: DataStatus.DATASUBMITTED })
    const uploadSucceeded = (response: any) => {
      const itemID = response["data"]["item"].itemID;
      console.log("File upload successful, item ID: ", itemID);
      GeoprocessorSubmitJob(baseGPurl, gpToolURL, gpParams, itemID);
      return itemID;
    }
    const uploadFailed = (response: any) => console.log("Failed: ", response);
    esriRequest((`${baseGPurl}${gpUploadURL}`), {
      method: "post", 
      body: formData,
      authMode: "immediate",
    }).then(uploadSucceeded, uploadFailed)
      .catch((error) => {
        console.error('An error occured uploading the file: ' + error);
        return null;
      });
  }

  const ETLgeoProcessingPreprocess = (gpParams: GeoprocessingParams, baseGPurl: string, gpToolURL: string, fieldMap: object) => {
    gpParams = {...gpParams, df_json: dataContext.gpIngestReturn.Return_df_Json, Field_Map: fieldMap };
    geoprocessor.submitJob((`${baseGPurl}${gpToolURL}`), gpParams).then((jobInfo) => {
     console.log("ArcGIS Server job ID: ", jobInfo.jobId);
      const options = { interval: 1500, statusCallback: (j: any) => console.log("Job Status: ", j.jobStatus, j.messages)};
      jobInfo.waitForJobCompletion(options).then(() => {
        // const gpIngestReturn: GPingestReturn = {Return_Fields: [], Return_df_Json: {}, Fields: {}}
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
