import { createContext, useReducer } from "react";
import { Action, MapAction, MapContextInterface } from "../types";
import WebScene from "@arcgis/core/WebScene";
import SceneView from "@arcgis/core/views/SceneView";
import Sketch from "@arcgis/core/widgets/Sketch";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

const mapActionType: MapAction = {
    SCENE: 'scene',
    VIEW: 'view',
    SKETCH: 'sketch',
    GRAPHICSLAYER: 'graphicsLayer',
    SCENEVIEWGRAPHICS: 'sceneViewGraphics'
}

export const initialMapState: MapContextInterface = {
    scene: new WebScene(),
    view: new SceneView(),
    sketch: new Sketch(),
    graphicsLayer: new GraphicsLayer(),
}

export const MapContext = createContext(initialMapState) 

export const MapStore = ({ children }) => {
  const [state, dispatch] = useReducer((state: MapContextInterface, action: Action) => {
    switch (action.type) {
        case mapActionType.SCENE:
            return {...state, scene: action.payload}
        case mapActionType.VIEW:
            return {...state, view: action.payload}
        case mapActionType.SKETCH:
            return {...state, sketch: action.payload}
        case mapActionType.GRAPHICSLAYER:
            return {...state, graphicsLayer: action.payload}
        case mapActionType.SCENEVIEWGRAPHICS:
            return {...state, scene: action.payload.scene, view: action.payload.view, graphicsLayer: action.payload.graphicsLayer}
        default:
            return state
    }
  }, initialMapState);

  return (
    <MapContext.Provider value={[state, dispatch]}>
      {children}
    </MapContext.Provider>
  )
}
