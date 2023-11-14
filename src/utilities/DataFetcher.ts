import * as geoprocessor from "@arcgis/core/rest/geoprocessor.js";
import { DataContextInterface } from "../types";

export const fetchGeoprocessData = (dataContext: DataContextInterface) => {
  const gpUrl = "https://gis-dev.airspacelink.com/server/rest/services/ETLUpload/GPServer/etl_upload";
  const params = {
    FIle: {
      url: "https://raw.githubusercontent.com/eKerney/dataStore2/main/detroit_obstacles.geojson"
    },
    Data_Type: 'obstacles',
    Ingest_Trigger: true,
    Preprocess_Trigger: false,
    Upload_Trigger: false,
    Field_Map: false,
    Return_Fields: false,
    Return_df_Json: false,
    Preprocess_Return: false,
  };
  // console.log('sending request')
  // // const options = {returnZ: false, returnM: false, outSpatialReference: null, processExtent: null, processSpatialReference: null};
  // function logResults(result: any) {
  //   console.log(result)
  // }
  // geoprocessor.execute(gpUrl, params).then(logResults);

  // function progTest(value) { value.jobStatus};
  // // function errBack(error) { message.innerText = "" };
  //  function drawResultData(result) {
  //         result.fetchResultData("Return_Fields").then(data => {
  //           console.log("Return_Fields", JSON.parse(data))
  //         })
  //  }
  // geoprocessor.submitJob(gpUrl, params).then((jobInfo) => {
  //     const options = {
  //       statusCallback: (jobInfo1) => {
  //         progTest(jobInfo1);
  //       }
  //     };
  //     jobInfo.waitForJobCompletion(options).then((jobInfo2) => {
  //       drawResultData(jobInfo2);
  //       // console.log(jobInfo2)
  //       // drawResultData(jobInfo2);
  //     });
  // });

  // geoprocessor.submitJob(gpUrl, params).then((jobInfo)) => {
  //       jobInfo.waitForJobCompletion().then(() => {
  //           jobInfo.fetchResultData("pointFC")
  //               .then(function (result) {
  //                   if (result.dataType == "feature-record-set-layer") {
  //                       let featureSet = result.value;
  //                       console.log(`Points: ${featureSet.features.length}`);// gives "0"
  //                   }
  //                });
  //            });
  //        });

  geoprocessor.submitJob(gpUrl, params).then((jobInfo) => {
    console.log('jobInfo', jobInfo)
      jobInfo.waitForJobCompletion().then((jobInfo2) => {
        console.log('jobInfo', jobInfo)
        console.log('jobInfo2', jobInfo2)
        jobInfo.fetchResultData("Return_Fields") //.then(data => {
          // console.log(jobInfo)
          // console.log('data', data.value);
          // })
      });
  });

    // FIle: dataContext.GeoJSONfeatureCollection,
  // console.log('ran tool')
  // // geoprocessor.execute(gpUrl, params).then(logResults);
  //
  // const runAsyncGeoprocessTool = async () => {
  //   // const results = await geoprocessor.submitJob(gpUrl, params).then(jobInfo => console.log(jobInfo.jobStatus))
  //   // Return_Fields
  //   // Return_df_Json
  //   // Preprocess_Return
  //
  //   const runGeoTool = await geoprocessor.submitJob(gpUrl, params)
  //   runGeoTool.jobStatus === 'job-succeeded' 
  //     ? console.log(await runGeoTool.fetchResultData("Return_Fields"))
  //     : console.log('nothing');
  //   // return results.messages;
  // }
  //
  // (async () => {
  //   // console.log(await runAsyncGeoprocessTool());
  //   runAsyncGeoprocessTool()
  // })();

}

