import { AppImportType, Basemaps, DataStatus, DataType, GeometryType, LoadingStatus } from "./enums";

export type Action = {
    type: string
    payload?: any
}

export interface CameraPosition {
    position?: Position;
    heading?: number;
    tilt?: number;
}

export interface AppContextInterface {
  dataStatus: LoadingStatus; 
  uploadStatus: LoadingStatus;
  submitStatus: LoadingStatus;
  approveStatus: LoadingStatus;
  denyStatus: LoadingStatus;
  basemap: Basemaps;
  cameraLocation: CameraPosition;
}

export interface AppAction {
  DATASTATUS: string;
  UPLOADSTATUS: string;
  SUBMITSTATUS: string;
  APPROVESTATUS: string;
  DENYSTATUS: string;
  BASEMAP: string;
  CAMERALOCATION: string;
}

export interface AppContextInterface2 {
  appImportType: AppImportType; 
  dataStatus: LoadingStatus;
  currentDataState: DataStatus;
  basemap: Basemaps;
  cameraLocation: CameraPosition;
}

export interface AppAction2 {
  APPIMPORTTYPE: string;
  DATASTATUS: string;
  CURRENTDATASTATE: string;
  BASEMAP: string;
  CAMERALOCATION: string;
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

export interface DataContextInterface {
  dataType: DataType; 
  dataSource: DataSource;
  geometryType: GeometryType;
  GeoJSONfeatureCollection: GeoJSONfeatureCollection;
  fields: string[];
  blob: Blob;
  url: string;
  crs: string;
  info: dataAnalysis;
}

export interface DataAction {
  DATATYPE: string; 
  DATASOURCE: string;
  GEOMETRYTYPE: string;
  GEOJSONFEATURECOLLECTION: string;
  FIELDS: string;
  BLOB: string;
  URL: string;
  CRS: string;
  INFO: string;
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
}

export interface ButtonProps {
  text: string;
  color: string;
  textColor: string;
  alertProps: AlertProps;
  handleClick?: MouseEventHandler;
  modal?: string;
}

export interface AlertProps {
  id: string;
  text: string;
  alertType: string;
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
  Field_Map: Boolean;
}
