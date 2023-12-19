import { AppContextInterface2, DataContextInterface } from "../types";
import { DataStatus, DataType, GeometryType, LoadingStatus } from "../types/enums";

export const fileLoader = (rawData: any, appContext: AppContextInterface2, appDispatch: any, dataContext: DataContextInterface, dataDispatch: any) => {
  appDispatch({ type: 'dataStatus', payload: LoadingStatus.LOADING });
      console.log('DataLoader', dataContext.dataLayerAttributes);

  switch (dataContext.dataLayerAttributes.dataType) {
    case DataType.GEOJSON:
      console.log('inGEOJSON');
      const parsedGeoJSON = JSON.parse(rawData)
      const blobData = new Blob([JSON.stringify(parsedGeoJSON)], { type: "application/json" });
      dataDispatch({ type: 'multiple', payload: {GeoJSONfeatureCollection: parsedGeoJSON, blob: URL.createObjectURL(blobData)} })
      appDispatch({ type: 'multiple', payload: {
        dataStatus: LoadingStatus.SUCCESS, 
        currentDataState: DataStatus.DATASUBMITTED,
        geoprocessingMessages: { type: 'jobStatus', 
          currentDataState: appContext.currentDataState, 
          message: 'Data Imported'
        }
      }})
      break;
    case DataType.KMZ:
      console.log('inKMZ');
      // const parsedKML = JSON.parse(rawData)
      // dataDispatch({ type: 'geoJSONfeatureCollection', payload: parsedKML })
      appDispatch({ type: 'multiple', payload: {
        dataStatus: LoadingStatus.SUCCESS, 
        currentDataState: DataStatus.DATASUBMITTED,
        geoprocessingMessages: { type: 'jobStatus', 
          currentDataState: appContext.currentDataState, 
          message: 'Data Imported'
        }
      }})
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
