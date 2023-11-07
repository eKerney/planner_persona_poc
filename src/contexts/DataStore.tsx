// DataStore.tsx 
//
// Component that holds context of loaded <data></data>
// Data can be load from file, url, or AGOL
// In case of file load, data will be stored <directly></directly>
// For other cases only references to data may be held 
import { createContext, useReducer } from "react";
import { Action, DataAction, DataSource, DataType } from "../types";

interface DataStoreInterface {
  dataType: DataType; 
  dataSource: DataSource;
  GeoJSONfeatureCollection: GeoJSONfeatureCollection;
  fields: string[];
  blob: Blob;
  url: string;
  info: string;
}

const dataActionType: DataAction = {
  DATATYPE: 'dataType', 
  DATASOURCE: 'dataSource',
  GEOJSONFEATURECOLLECTION: 'geoJSONfeatureCollection',
  FIELDS: 'fields',
  BLOB: 'blob',
  URL: 'url',
  INFO: 'info',
}

export const initialDataState: DataStoreInterface = {
  dataType: DataType.EMPTY,
  dataSource: DataSource.EMPTY,
  GeoJSONfeatureCollection: { type: '', features: [] },
  fields: [],
  blob: new Blob([]),
  url: '',
  info: '',
}

export const DataContext = createContext(initialDataState) 

export const DataStore = ({ children }) => {
  const [state, dispatch] = useReducer((state: DataStoreInterface, action: Action) => {
    switch (action.type) {
      case dataActionType.DATATYPE:
        return {...state, dataType: action.payload}
      case dataActionType.DATASOURCE:
        return {...state, dataSource: action.payload}
      case dataActionType.GEOJSONFEATURECOLLECTION:
        return {...state, geoJSONfeatureCollection: action.payload}
      case dataActionType.FIELDS:
        return {...state, fields: action.payload}
      case dataActionType.BLOB:
        return {...state, blob: action.payload}
      case dataActionType.URL:
        return {...state, url: action.payload}
      case dataActionType.INFO:
        return {...state, info: action.payload}
      default:
        return state
    }
  }, initialDataState);

   return (
    <DataContext.Provider value={[state, dispatch]}>
      {children}
    </DataContext.Provider>
  )
}
