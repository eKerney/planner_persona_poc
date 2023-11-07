import { FC } from "react";

export enum DataStatus {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
  EMPTY = "empty",
}

export enum DataSource {
  FILE = "file",
  URL = "url",
  AGOL = "agol",
  OTHER = "other",
}

export enum DataType {
  GEOJSON = "geojson",
  GEODATAFRAME = "geodataframe",
  SHAPEFILE = "shapefile",
  KML = "kml",
  GEODATABASE = "geodatabase",
  GEOPARQUET = "geoparquet"
} 

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
  uploadStatus: DataStatus;
  submitStatus: DataStatus;
  approveStatus: DataStatus;
  denyStatus: DataStatus;
  basemap: DataStatus;
  cameraLocation: CameraPosition;
}

export interface AppAction {
  UPLOADSTATUS: string;
  SUBMITSTATUS: string;
  APPROVESTATUS: string;
  DENYSTATUS: string;
  BASEMAP: string;
  CAMERALOCATION: string;
}

export interface MapContextInterface {
    scene?: __esri.WebScene;
    view?: __esri.View;
    sketch?: __esri.Sketch;
    graphicsLayer?: __esri.GraphicsLayer;
}

export interface DataStoreInterface {
  dataType: DataType; 
  dataSource: DataSource;
  GeoJSONfeatureCollection: GeoJSONfeatureCollection;
  fields: string[];
  blob: Blob;
  url: string;
  info: string;
}

export interface DataAction {
  DATATYPE: string; 
  DATASOURCE: string;
  GEOJSONFEATURECOLLECTION: string;
  FIELDS: string;
  BLOB: string;
  URL: string;
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
}

export interface AlertProps {
  id: string;
  text: string;
  alertType: string;
}
