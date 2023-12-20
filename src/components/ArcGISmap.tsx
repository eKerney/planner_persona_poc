import { useContext, useEffect, useRef} from "react";
import WebScene from "@arcgis/core/WebScene";
import SceneView from "@arcgis/core/views/SceneView";
import Search from "@arcgis/core/widgets/Search";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import SceneLayer from "@arcgis/core/layers/SceneLayer";
import { MapContext } from "../contexts/MapStore";
import { AppContext2 } from "../contexts/AppStore2";
import { DataTable } from "../utilities/UtilityComponents";

export const ArcGISmap = ({ children }: {children: any}) => {
  // @ts-ignore
  const [appContext, appDispatch] = useContext(AppContext2);
  // @ts-ignore
  const [mapContext, mapDispatch] = useContext(MapContext);

    const mapDiv = useRef(null);
    useEffect(function createMap() {
    if (mapDiv.current) {
        const scene = new WebScene({ 
            basemap: appContext.basemap,
            ground: "world-elevation",
        });
        const view = new SceneView({
                map: scene,
                container: mapDiv.current,
                padding: {top: 40},
                camera: appContext.cameraLocation,
                spatialReference: { wkid: 4326 },
                qualityProfile: "high",
                environment: {
                    lighting: { directShadowsEnabled: true,  date: new Date("Sun Jun 4 2023 22:00:00 GMT+0100 (CET)") }
                }
        });

        view.popup.defaultPopupTemplateEnabled = true;
        const graphicsLayer = new GraphicsLayer({elevationInfo: 'on-the-ground' });
        scene.add(graphicsLayer);
          const OSM3Dbuildings = new SceneLayer({
          url: 'https://basemaps3d.arcgis.com/arcgis/rest/services/OpenStreetMap3D_Buildings_v1/SceneServer',
          popupEnabled: false,
          opacity: 0.05
        }); 
        scene.add(OSM3Dbuildings);
        // set scene and view context
        mapDispatch({ type: 'sceneViewGraphics', payload: {scene: scene, view: view, graphicsLayer: graphicsLayer }})
        
        const searchWidget = new Search({view: view, visible: true });
        view.ui.add(searchWidget, {position: "top-left", index: 0});

        return () => { view && view.destroy() };
        }
    }, []);
  return (
      <>
        <div className="mapDiv" ref={mapDiv} >
        </div>
        {children}
      </>
  );
}
export default ArcGISmap;

