import { AppContextInterface2, DataContextInterface } from "../types";
import { DataStatus, DataType, GeometryType, LoadingStatus } from "../types/enums";

export const fileLoader = (rawData: any, appContext: AppContextInterface2, appDispatch: any, dataContext: DataContextInterface, dataDispatch: any) => {
  appDispatch({ type: 'dataStatus', payload: LoadingStatus.LOADING });
      console.log('DataLoader');

  switch (dataContext.dataType) {
    case DataType.GEOJSON:
      const parsedGeoJSON = JSON.parse(rawData)
      const blobData = new Blob([JSON.stringify(parsedGeoJSON)], { type: "application/json" });
      // dataDispatch({ type: 'geoJSONfeatureCollection', payload: parsedGeoJSON })
      // dataDispatch({ type: 'blob', payload: URL.createObjectURL(blobData) })
      dataDispatch({ type: 'multiple', payload: {GeoJSONfeatureCollection: parsedGeoJSON, blob: URL.createObjectURL(blobData)} })
      // appDispatch({ type: 'dataStatus', payload: LoadingStatus.SUCCESS })
      // appDispatch({ type: 'currentDataState', payload: DataStatus.DATASUBMITTED })
      appDispatch({ type: 'multiple', payload: {dataStatus: LoadingStatus.SUCCESS, currentDataState: DataStatus.DATASUBMITTED}})
      break;
    case DataType.KML:
      const parsedKML = JSON.parse(rawData)
      dataDispatch({ type: 'geoJSONfeatureCollection', payload: parsedKML })
      appDispatch({ type: 'dataStatus', payload: LoadingStatus.SUCCESS })
      appDispatch({ type: 'currentDataState', payload: DataStatus.DATASUBMITTED })
      break;
    default:
        return LoadingStatus.ERROR 
    }

    return LoadingStatus.SUCCESS
}

export const fileValidator = (dataContext: DataContextInterface, dataDispatch: any) => {
  // TODO: iterate through all features and test geometry 
  // Currently only utilizes geometry from first feature
  const geometry = dataContext.GeoJSONfeatureCollection.features[0].geometry.type 
  Object.values(GeometryType).includes(geometry) 
    ? dataDispatch({ type: 'geometryType', payload: geometry  })
    : console.log('invalid GeoJSON geometry');
}
