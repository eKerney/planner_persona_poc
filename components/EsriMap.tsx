'use client'
import WebScene from "@arcgis/core/WebScene";
import SceneView from "@arcgis/core/views/SceneView";
import { useEffect, useRef } from 'react';
    
export default function MapView() {
    const mapDiv = useRef(null); 
    const createMap = useEffect(() => {
        if (mapDiv.current) {
            const scene = new WebScene({ 
                basemap: 'streets-night-vector',
                ground: 'world-elevation',
            });
            const view = new SceneView({
                    map: scene,
                    container: mapDiv.current,
                    padding: {top: 40},
                    spatialReference: { wkid: 4326 },
                    qualityProfile: 'high',
            });
            view.popup.defaultPopupTemplateEnabled = true;
        return () => { view && view.destroy() };
        }
    }, []);

  return (
    <div>
       <div className="mapDiv" ref={mapDiv} ></div>
    </div>
  )
}
