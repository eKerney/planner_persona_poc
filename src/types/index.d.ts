import { FC } from "react";

export enum DataStatus {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
  EMPTY = "empty",
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

export type GeoJSONprops = {
    SCORE?: string;
    id?: string;
}

export type Feature = {
    type: string;
    geometry: Object
    id?: string;
    properties?: GeoJSONprops;
}

export interface GeoJSONinterface {
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
