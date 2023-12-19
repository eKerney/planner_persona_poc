import { createContext, useReducer } from "react";
import { Action, DataAction, DataContextInterface } from "../types"; 
import { DataSource, DataType, GeometryType, LayerType } from "../types/enums";

const dataActionType: DataAction = {
  DATAFORM: 'dataForm',
  DATALAYERATTRIBUTES: 'dataLayerAttributes',
  DATASOURCE: 'dataSource',
  GEOMETRYTYPE: 'geometryType',
  GEOJSONFEATURECOLLECTION: 'geoJSONfeatureCollection',
  FIELDS: 'fields',
  BLOB: 'blob',
  URL: 'url',
  CRS: 'crs',
  INFO: 'info',
  GPINGESTRETURN: 'gpIngestReturn',
  GPPREPROCESSRETURN: 'gpPreprocessReturn', 
  GPUPLOADRETURN: 'GPuploadReturn',
  MULTIPLE: 'multiple',
  FIELDMAP: 'fieldMap'
}

export const initialDataState: DataContextInterface = {
  dataForm: document.createElement("form"),
  dataLayerAttributes: { dataType: DataType.GEOJSON, layerType: LayerType.OBSTACLES },
  dataSource: DataSource.FILE,
  geometryType: GeometryType.EMPTY,
  GeoJSONfeatureCollection: { type: '', features: [] },
  fields: [],
  blob: new Blob([]),
  url: '',
  crs: '',
  info: {fields: [], analysisField: '', count: 0, avg: 0, min: 0, max: 0},
  gpIngestReturn: { Return_Fields: [], Return_df_Json: {}, Return_Req_Fields: [] },
  gpPreprocessReturn: { Return_Fields: [], Return_df_Json: {}, Return_Req_Fields: [] },
  gpUploadReturn: { Return_Fields: [], Return_df_Json: {}, Return_Req_Fields: [] },
  fieldMap: {}
}


export const DataContext = createContext(initialDataState) 

export const DataStore = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer((state: DataContextInterface, action: Action): DataContextInterface => {
    switch (action.type) {
      case dataActionType.DATAFORM:
        return {...state, dataForm: action.payload}
      case dataActionType.DATALAYERATTRIBUTES:
        return {...state, dataLayerAttributes: action.payload}
      case dataActionType.DATASOURCE:
        return {...state, dataSource: action.payload}
      case dataActionType.GEOMETRYTYPE:
        return {...state, geometryType: action.payload}
      case dataActionType.GEOJSONFEATURECOLLECTION:
        return {...state, GeoJSONfeatureCollection: action.payload}
      case dataActionType.FIELDS:
        return {...state, fields: action.payload}
      case dataActionType.BLOB:
        return {...state, blob: action.payload}
      case dataActionType.URL:
        return {...state, url: action.payload}
      case dataActionType.CRS:
        return {...state, crs: action.payload}
      case dataActionType.INFO:
        return {...state, info: action.payload}
      case dataActionType.GPINGESTRETURN:
        return {...state, gpIngestReturn: action.payload}
      case dataActionType.GPPREPROCESSRETURN:
        return {...state, gpPreprocessReturn: action.payload}
      case dataActionType.GPUPLOADRETURN:
        return {...state, gpUploadReturn: action.payload}
      case dataActionType.FIELDMAP:
        return {...state, fieldMap: action.payload}
      case dataActionType.MULTIPLE:
        return {...state, ...action.payload}
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
