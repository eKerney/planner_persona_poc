import { createContext, useReducer } from "react";
import { AppAction, AppContextInterface, CameraPosition, DataStatus } from "../types";

const appActionType: AppAction = {
  UPLOADSTATUS: 'uploadStatus',
  SUBMITSTATUS: 'submitStatus',
  APPROVESTATUS: 'approveStatus',
  DENYSTATUS: 'denyStatus',
  BASEMAP: 'basemap',
  CAMERALOCATION: 'cameraLocation',
}

const locations: {[key: string]: CameraPosition} = {
    'Los Angeles': { position: {x: -118.255, y: 34.010, z: 1380}, heading: 0, tilt: 76},
    'Ontario': { position: {x: -117.685, y: 33.935, z: 2546}, heading: 6.873, tilt: 76.762 },
    'Detroit': { position: {x: -83.113, y: 42.268, z: 4754}, heading: 33.511, tilt: 65.004 },
    'Arlington, TX': {position: {x: -97.110, y: 32.704, z: 3122}, heading: 3.431, tilt: 46.679 },
    'The Villages': {position: {x: -81.941, y: 28.812, z: 3245}, heading: 339, tilt: 69},
    'Phoenix': {position: {x: -112.026, y: 33.356, z: 2659 }, heading: 335, tilt: 75},
    'Holland, MI': {position: {x: -86.034, y: 42.749, z: 2181 }, heading: 298, tilt: 71.86},
}

export const initialAppState: AppContextInterface = {
  uploadStatus: DataStatus.EMPTY,
  submitStatus: DataStatus.EMPTY,
  approveStatus: DataStatus.EMPTY,
  denyStatus: DataStatus.EMPTY,
  basemap: DataStatus.EMPTY,
  cameraLocation: locations['Detroit'],
}

export const AppContext = createContext(initialAppState) 

export const AppStore = ({ children }) => {
  const [state, dispatch] = useReducer((state: AppContextInterface, action: Action) => {
    switch (action.type) {
      case appActionType.UPLOADSTATUS:
        return {...state, uploadStatus: action.payload}
      case appActionType.SUBMITSTATUS:
          return {...state, submitStatus: action.payload}
      case appActionType.APPROVESTATUS:
        return {...state, approveStatus: action.payload}
      case appActionType.DENYSTATUS:
        return {...state, denyStatus: action.payload}
      case appActionType.BASEMAP:
        return {...state, basemap: action.payload}
      case appActionType.CAMERALOCATION:
        return {...state, cameraLocation: action.payload}
      default:
        return state
    }
  }, initialAppState);

   return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  )
}
