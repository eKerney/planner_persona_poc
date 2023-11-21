import * as geoprocessor from "@arcgis/core/rest/geoprocessor.js";
import esriRequest from "@arcgis/core/request.js";
import { AppContextInterface2, DataContextInterface, GPingestReturn, GeoprocessingParams, PreprocessReturn } from "../types";
import { DataStatus, LoadingStatus } from "../types/enums";

export const fetchGeoprocessData = (dataContext: DataContextInterface, dataDispatch: any, appContext: AppContextInterface2, appDispatch: any, formData: any) => {
  // TODO: Parameterize these routes 
  const baseGPurl = "https://gis-dev.airspacelink.com/server/rest/services/ETLUpload/GPServer";
  const gpToolURL = "/etl_upload";
  const gpUploadURL = "/uploads/upload";

  const gpParams: GeoprocessingParams = {
      FIle: { itemID: ''},
      Data_Type: 'obstacles',
      Ingest_Trigger: true,
      Preprocess_Trigger: false,
      Upload_Trigger: false,
      Field_Map: false,
    };

  const runGeoprocessingUpload = (baseGPurl: string, gpToolURL: string, gpParams: GeoprocessingParams, itemID: string,) => {
    gpParams.FIle = { itemID: itemID };

    geoprocessor.submitJob((`${baseGPurl}${gpToolURL}`), gpParams).then((jobInfo) => {

     console.log("ArcGIS Server job ID: ", jobInfo.jobId);
      const options = { interval: 1500, statusCallback: (j: any) => console.log("Job Status: ", j.jobStatus, j)};

      jobInfo.waitForJobCompletion(options).then(() => {
        const gpIngestReturn: GPingestReturn = {Return_Fields: [], Return_df_Json: {}}

        jobInfo.fetchResultData("Return_Fields").then((data) => gpIngestReturn.Return_Fields = data.value)
        jobInfo.fetchResultData("Return_df_Json").then((data) => gpIngestReturn.Return_df_Json = data.value)

        dataDispatch({ type: 'gpIngestReturn', payload: gpIngestReturn })
        appDispatch({ type: 'dataStatus', payload: LoadingStatus.SUCCESS })
      });
    });
  }

  const esriRequestUpload = (baseGPurl: string, gpUploadURL: string, formData: HTMLFormElement) => {
    console.log('esriRequest')
    appDispatch({ type: 'dataStatus', payload: LoadingStatus.LOADING })
    appDispatch({ type: 'currentDataState', payload: DataStatus.DATASUBMITTED })
    const uploadSucceeded = (response: any) => {
      const itemID = response["data"]["item"].itemID;
      console.log("File upload successful, item ID: ", itemID);
      runGeoprocessingUpload(baseGPurl, gpToolURL, gpParams, itemID);
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

  // primary app workflow
  esriRequestUpload(baseGPurl, gpUploadURL, formData)


}
