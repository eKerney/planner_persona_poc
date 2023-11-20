import { AppContextInterface, DataContextInterface } from "../types";
import { DataType, GeometryType, LoadingStatus } from "../types/enums";

export const fileLoader = (rawData: any, appContext: AppContextInterface, appDispatch: any, dataContext: DataContextInterface, dataDispatch: any) => {
  console.log('fileLoader');
  appDispatch({ type: 'uploadStatus', payload: LoadingStatus.LOADING });
  switch (dataContext.dataType) {
    case DataType.GEOJSON:
      const parsedGeoJSON = JSON.parse(rawData)
      // console.log(parsedGeoJSON);
      dataDispatch({ type: 'geoJSONfeatureCollection', payload: parsedGeoJSON })

      const blobData = new Blob([JSON.stringify(parsedGeoJSON)], { type: "application/json" });
      dataDispatch({ type: 'blob', payload: URL.createObjectURL(blobData) })
      
      appDispatch({ type: 'uploadStatus', payload: LoadingStatus.SUCCESS })
      appDispatch({ type: 'dataStatus', payload: LoadingStatus.UNPROCESSED })
      // fileValidator(dataContext, dataDispatch);
      break;
    case DataType.KML:
      const parsedKML = JSON.parse(rawData)
      dataDispatch({ type: 'geoJSONfeatureCollection', payload: parsedKML })
      appDispatch({ type: 'dataStatus', payload: LoadingStatus.UNPROCESSED })
      appDispatch({ type: 'uploadStatus', payload: LoadingStatus.SUCCESS })
      break;
    default:
        return LoadingStatus.ERROR 
    }
    return LoadingStatus.UNPROCESSED
}

export const fileValidator = (dataContext: DataContextInterface, dataDispatch: any) => {
  // TODO: iterate through all features and test geometry 
  // Currently only utilizes geometry from first feature
  const geometry = dataContext.GeoJSONfeatureCollection.features[0].geometry.type 
  Object.values(GeometryType).includes(geometry) 
    ? dataDispatch({ type: 'geometryType', payload: geometry  })
    : console.log('invalid GeoJSON geometry');
}
