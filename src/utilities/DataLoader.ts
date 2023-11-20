import { AppContextInterface2, DataContextInterface } from "../types";
import { DataStatus, DataType, GeometryType, LoadingStatus } from "../types/enums";

export const fileLoader = (rawData: any, appContext: AppContextInterface2, appDispatch: any, dataContext: DataContextInterface, dataDispatch: any) => {
  appDispatch({ type: 'dataStatus', payload: LoadingStatus.LOADING });

  switch (dataContext.dataType) {
    case DataType.GEOJSON:
      const parsedGeoJSON = JSON.parse(rawData)
      dataDispatch({ type: 'geoJSONfeatureCollection', payload: parsedGeoJSON })

      const blobData = new Blob([JSON.stringify(parsedGeoJSON)], { type: "application/json" });
      dataDispatch({ type: 'blob', payload: URL.createObjectURL(blobData) })
      
      appDispatch({ type: 'currentDataState', payload: DataStatus.DATAIMPORTED })
      appDispatch({ type: 'dataStatus', payload: LoadingStatus.SUCCESS })
      // fileValidator(dataContext, dataDispatch);
      break;
    case DataType.KML:
      const parsedKML = JSON.parse(rawData)
      dataDispatch({ type: 'geoJSONfeatureCollection', payload: parsedKML })
      appDispatch({ type: 'currentDataState', payload: DataStatus.DATAIMPORTED })
      appDispatch({ type: 'dataStatus', payload: LoadingStatus.SUCCESS })
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
