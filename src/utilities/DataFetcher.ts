import * as geoprocessor from "@arcgis/core/rest/geoprocessor.js";
import esriRequest from "@arcgis/core/request.js";
import { DataContextInterface, GeoprocessingParams } from "../types";

export const fetchGeoprocessData = (dataContext: DataContextInterface, formData: any) => {
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
        jobInfo.fetchResultData("Return_Fields").then((data) => console.log(data.value))
        // jobInfo.fetchResultData("Return_df_Json").then((data) => console.log(data.value))
        // jobInfo.fetchResultData("Preprocess_Return").then((data) => console.log(data.value))
      });
    });
  }

  const esriRequestUpload = (baseGPurl: string, gpUploadURL: string, formData: HTMLFormElement) => {
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
