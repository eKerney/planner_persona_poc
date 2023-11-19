import * as geoprocessor from "@arcgis/core/rest/geoprocessor.js";
import esriRequest from "@arcgis/core/request.js";
import { DataContextInterface } from "../types";

export const fetchGeoprocessData = (dataContext: DataContextInterface, formData: any) => {
  const gpUrl = "https://gis-dev.airspacelink.com/server/rest/services/ETLUpload/GPServer/etl_upload";
  const params = {
    // FIle: { url: "https://raw.githubusercontent.com/eKerney/dataStore2/main/detroit_obstacles.geojson" },
    FIle: { itemID: "i1b2a0cad-be1e-4776-9269-a8de9755aa96" },
    Data_Type: 'obstacles',
    Ingest_Trigger: true,
    Preprocess_Trigger: false,
    Upload_Trigger: false,
    Field_Map: false,
  };

// geoprocessor.submitJob(gpUrl, params).then((jobInfo) => {
//   console.log("ArcGIS Server job ID: ", jobInfo.jobId);
//   const options = { interval: 1500, statusCallback: (j: any) => console.log("Job Status: ", j.jobStatus)};
//   jobInfo.waitForJobCompletion(options).then(() => {
//     jobInfo.fetchResultData("Return_df_Json").then((data) => console.log(data.value))
//     // jobInfo.fetchResultData("Return_Fields").then((data) => console.log(data))
//     // jobInfo.fetchResultData("Preprocess_Return").then((data) => console.log(data.value))
//   });
// });
console.log(document.getElementById("uploadForm"));

  const gpServiceUpload = "https://gis-dev.airspacelink.com/server/rest/services/ETLUpload/GPServer/uploads/upload";
  const uploadSucceeded = (response: any) => {
      var itemID = response["data"]["item"].itemID;
      console.log("File upload successful, item ID: ", itemID);
      return itemID;
  }
  const uploadFailed = (response: any) => {
      console.log("Failed: ", response);
      return null;
  }

  console.log(document.getElementById("uploadForm"));

  const form = document.getElementById("uploadForm");
  let dataForm = new FormData();
  dataForm.append("file", JSON.stringify(dataContext.GeoJSONfeatureCollection));
  dataForm.append("f", "html");
  dataForm.append("method", "post"); 
  // dataForm.append("encType", "multipart/form-data");

  esriRequest(gpServiceUpload, {
      method: "post", 
      body: dataForm,
      // body: document.getElementById("uploadForm"),
      authMode: "immediate",
      headers: {"Content-Type": "multipart/form-data"},
  }).then(uploadSucceeded, uploadFailed)
      .catch((error) => {
          console.error('An error occured uploading the file: ' + error);
          return null;
      });

 
  // console.log('made request');
  // esriRequest(gpServiceUpload, {
  //   // body: document.getElementById("uploadForm"),
  //   // body: JSON.stringify(dataContext.GeoJSONfeatureCollection),
  //   body:  form,
  //   authMode: "immediate",
  //   withCredentials: true,
  //   // headers: {"Content-Type": "application/json"},
  //   // headers: {"Content-Type": "application/json"},
  //   // headers: {"Content-Type": "multipart/form-data"},
  //   method: "post",
  //   responseType: "json"
  // }).then(function(response){
  //   console.log(response.data);
  // });

}
// dataForm.append("attachment", dataContext.GeoJSONfeatureCollection, "obstacles.geojson")
// dataForm.append("attachment", JSON.stringify(dataContext.GeoJSONfeatureCollection))
// console.log(dataForm);
// let form = new FormData();
// form.append('file', JSON.stringify(dataContext.GeoJSONfeatureCollection));
// form.append("f", "json");
// form.append("title", "title");
// form.append("name", "detroit_obstacles.geojson");
// form.append("type", "json");
// form.append("token", this.token);
// form.append("filename", "detroit_obstacles.geojson");

