import { useEffect, useRef} from "react";
import WebScene from "@arcgis/core/WebScene";
import SceneView from "@arcgis/core/views/SceneView";

export const ArcGISmap = ({ children }: {children: any}) => {
    const mapDiv = useRef(null);
    useEffect(function createMap() {
    if (mapDiv.current) {
        const scene = new WebScene({ 
            basemap: "streets-night-vector",
            ground: "world-elevation",
        });
        const view = new SceneView({
                map: scene,
                container: mapDiv.current,
                padding: {top: 40},
                camera: { position: {x: -83.113, y: 42.268, z: 4754}, heading: 33.511, tilt: 65.004 },
                spatialReference: { wkid: 4326 },
                qualityProfile: "high",
                environment: {
                    lighting: { directShadowsEnabled: true,  date: new Date("Sun Jun 4 2023 22:00:00 GMT+0100 (CET)") }
                }
        });
        return () => { view && view.destroy() };
        }
    }, []);
  return (
      <>
        <div className="mapDiv" ref={mapDiv} ></div>
        {children}
      </>
  );
}
export default ArcGISmap;

