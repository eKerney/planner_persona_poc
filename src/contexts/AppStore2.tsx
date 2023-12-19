import { createContext, useReducer } from "react";
import { Action, AppAction2, AppContextInterface2, CameraPosition } from "../types";
import { Basemaps, DataStatus, LoadingStatus, RequestType } from '../types/enums'

const appActionType: AppAction2 = {
  REQUESTTYPE: 'requestType',
  DATASTATUS: 'dataStatus',
  CURRENTDATASTATE: 'currentDataStatus',
  BASEMAP: 'basemap',
  CAMERALOCATION: 'cameraLocation',
  MULTIPLE: 'multiple',
  GEOPROCESSINGPARAMS: 'geoprocessingParams',
  GEOPROCESSINGMESSAGES: 'geoprocessingMessages'
}

const locations: {[key: string]: CameraPosition} = {
    'Los Angeles': { position: {x: -118.255, y: 34.010, z: 1380}, heading: 0, tilt: 76},
    'Ontario': { position: {x: -117.685, y: 33.935, z: 2546}, heading: 6.873, tilt: 76.762 },
    'Detroit': { position: {x: -83.080, y: 42.310, z: 2554}, heading: 45.511, tilt: 65.004 },
    'Arlington, TX': {position: {x: -97.110, y: 32.704, z: 3122}, heading: 3.431, tilt: 46.679 },
    'The Villages': {position: {x: -81.941, y: 28.812, z: 3245}, heading: 339, tilt: 69},
    'Phoenix': {position: {x: -112.026, y: 33.356, z: 2659 }, heading: 335, tilt: 75},
    'Holland, MI': {position: {x: -86.034, y: 42.749, z: 2181 }, heading: 298, tilt: 71.86},
}

export const initialAppState: AppContextInterface2 = {
  requestType: RequestType.INGEST,
  dataStatus: LoadingStatus.EMPTY,
  currentDataState: DataStatus.DATAIMPORTED,
  basemap: Basemaps.DARK_GRAY,
  cameraLocation: locations['Detroit'],
  geoprocessingParams: { FIle: {itemID: ''}, Data_Type: '', Ingest_Trigger: false, Preprocess_Trigger: false, Upload_Trigger: false, Field_Map: {}, JSON_data: {} },
  geoprocessingMessages: { type: '', currentDataState: DataStatus.DATAIMPORTED, message: 'DATA STATUS MESSAGE' }
}

export const AppContext2 = createContext(initialAppState) 

export const AppStore2 = ({ children }) => {
  const [state, dispatch] = useReducer((state: AppContextInterface2, action: Action): AppContextInterface2 => {
    switch (action.type) {
      case appActionType.REQUESTTYPE:
        return {...state, requestType: action.payload}
      case appActionType.DATASTATUS:
        return {...state, dataStatus: action.payload}
      case appActionType.CURRENTDATASTATE:
        return {...state, currentDataState: action.payload}
      case appActionType.BASEMAP:
        return {...state, basemap: action.payload}
      case appActionType.CAMERALOCATION:
        return {...state, cameraLocation: action.payload}
      case appActionType.GEOPROCESSINGPARAMS:
        return {...state, geoprocessingParams: action.payload}
      case appActionType.GEOPROCESSINGMESSAGES:
        return {...state, geoprocessingMessages: action.payload}
      case appActionType.MULTIPLE:
        return {...state, ...action.payload}
      default:
        return state
    }
  }, initialAppState);

   return (
    <AppContext2.Provider value={[state, dispatch]}>
      {children}
    </AppContext2.Provider>
  )
}
