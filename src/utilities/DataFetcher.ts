import * as geoprocessor from "@arcgis/core/rest/geoprocessor.js";
import esriRequest from "@arcgis/core/request.js";
import { DataContextInterface } from "../types";

export const fetchGeoprocessData = (dataContext: DataContextInterface, formData: any) => {

const runGeoprocessingTool = (itemID: string) => {
  const gpUrl = "https://gis-dev.airspacelink.com/server/rest/services/ETLUpload/GPServer/etl_upload";
  const params = {
    FIle: { itemID: itemID},
    Data_Type: 'obstacles',
    Ingest_Trigger: true,
    Preprocess_Trigger: false,
    Upload_Trigger: false,
    Field_Map: false,
  };
  geoprocessor.submitJob(gpUrl, params).then((jobInfo) => {
    console.log("ArcGIS Server job ID: ", jobInfo.jobId);
    const options = { interval: 1500, statusCallback: (j: any) => console.log("Job Status: ", j.jobStatus)};
    jobInfo.waitForJobCompletion(options).then(() => {
      // jobInfo.fetchResultData("Return_df_Json").then((data) => console.log(data.value))
      jobInfo.fetchResultData("Return_Fields").then((data) => console.log(data.value))
      // jobInfo.fetchResultData("Preprocess_Return").then((data) => console.log(data.value))
    });
  });
}

  const gpServiceUpload = "https://gis-dev.airspacelink.com/server/rest/services/ETLUpload/GPServer/uploads/upload";
  const uploadSucceeded = (response: any) => {
      const itemID = response["data"]["item"].itemID;
      console.log("File upload successful, item ID: ", itemID);
      runGeoprocessingTool(itemID);
      return itemID;
  }
  const uploadFailed = (response: any) => {
      console.log("Failed: ", response);
      return null;
  }
  esriRequest(gpServiceUpload, {
      method: "post", 
      body: formData,
      // body: document.getElementById("uploadForm"),
      authMode: "immediate",
      // headers: {"Content-Type": "multipart/form-data"},
  }).then(uploadSucceeded, uploadFailed)
      .catch((error) => {
          console.error('An error occured uploading the file: ' + error);
          return null;
      });


}
