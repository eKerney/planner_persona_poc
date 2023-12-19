import { Basemaps, DataStatus, DataType, GeometryType, LayerType, LoadingStatus, RequestType } from "./enums";

export type Action = {
    type: string
    payload?: any
}

export type GeoprocessingMessages = {
  type: string;
  currentDataState: DataStatus;
  message: string;
}

export interface CameraPosition {
    position?: Position;
    heading?: number;
    tilt?: number;
}

export interface AppContextInterface2 {
  requestType: RequestType;
  dataStatus: LoadingStatus;
  currentDataState: DataStatus;
  basemap: Basemaps;
  cameraLocation: CameraPosition;
  geoprocessingParams: GeoprocessingParams;
  geoprocessingMessages: GeoprocessingMessages;
}

export interface AppAction2 {
  REQUESTTYPE: string;
  DATASTATUS: string;
  CURRENTDATASTATE: string;
  BASEMAP: string;
  CAMERALOCATION: string;
  GEOPROCESSINGPARAMS: string;
  GEOPROCESSINGMESSAGES: string;
  MULTIPLE: string;
}

export interface fieldInfos {
  fieldName: string;
  label: string;
}

export interface dataAnalysis {
  fields: fieldInfos[];
  analysisField: string;
  count: number;
  avg: number;
  min: number;
  max: number;
}

export type GPreturnData = {
  Return_Fields: string[];
  Return_df_Json: object;
  Return_Req_Fields: string[]; 
}

export interface DataContextInterface {
  dataForm: HTMLFormElement;
  dataLayerAttributes: DataLayerAttributes;
  dataSource: DataSource;
  geometryType: GeometryType;
  GeoJSONfeatureCollection: GeoJSONfeatureCollection;
  fields: string[];
  blob: Blob;
  url: string;
  crs: string;
  info: dataAnalysis;
  gpIngestReturn: GPreturnData;
  gpPreprocessReturn: GPreturnData;
  gpUploadReturn: GPreturnData;
  fieldMap: object;
}

export interface DataLayerAttributes {
  dataType: DataType;
  layerType: LayerType;
}

export interface DataAction {
  DATAFORM: string;
  DATATYPE: string; 
  DATASOURCE: string;
  GEOMETRYTYPE: string;
  GEOJSONFEATURECOLLECTION: string;
  FIELDS: string;
  BLOB: string;
  URL: string;
  CRS: string;
  INFO: string;
  GPINGESTRETURN: string;
  GPPREPROCESSRETURN: string;
  GPUPLOADRETURN: string;
  MULTIPLE: string;
  FIELDMAP: string;
}

export type GeoJSONprops = {
    SCORE?: string;
    id?: string;
}

export type GeoJSONfeature = {
    type: string;
    geometry: Object
    id?: string;
    properties?: GeoJSONprops;
}

export type GeoJSONfeatureCollection = {
    type: string;
    features: Feature[];
}

export interface LayoutProps {
  ArcMap: JSX.Element;
  ToolPanel: JSX.Element;
  TopInfoBar: JSX.Element;
}


export interface MapContextInterface {
    scene?: __esri.WebScene;
    view?: __esri.View;
    sketch?: __esri.Sketch;
    graphicsLayer?: __esri.GraphicsLayer;
}

export type MapAction = {
    SCENE: string;
    VIEW: string;
    SKETCH: string;
    GRAPHICSLAYER: string;
    SCENEVIEWGRAPHICS: string;
}

export type GeoprocessingParams = {
  FIle: Object;
  Data_Type: string;
  Ingest_Trigger: Boolean;
  Preprocess_Trigger: Boolean;
  Upload_Trigger: Boolen;
  Field_Map: Object;
  JSON_data: Object;
}

export interface BaseComponentProps {
  text?: string;
  color?: string;
  textColor?: string;
  dataStatus?: DataStatus;
}

export interface ButtonProps extends BaseComponentProps {
  alertProps?: AlertProps;
  onClickFunction?: MouseEventHandler;
}

export interface AlertProps {
  id: string;
  alertType: string;
  text: string;
}

