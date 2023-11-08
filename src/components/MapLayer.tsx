import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import { AppContext } from "../contexts/AppStore";
import { MapContext } from "../contexts/MapStore";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { DataContext } from "../contexts/DataStore";

export const MapLayer = () => {
  // @ts-ignore
  const [appContext, appDispatch] = useContext(AppContext);
  // @ts-ignore
  const [dataContext, dataDispatch] = useContext(DataContext)
  // @ts-ignore
  const [mapContext, mapDispatch] = useContext(MapContext);
  const [surfaceMapReference, setSurfaceMapReference] = useState(null);

    const addLayerToMap = (renderer: any, popup: any) => {
        const geoJSONlayer = new GeoJSONLayer({ 
            id: 'mapLayer',
            url: dataContext.blob,
            renderer: renderer, 
            popupEnabled: true,
            elevationInfo: 'relative-to-ground',
            // fields: surface.fields,
            // popupTemplate: popup,
        });
        dataContext.blob && mapContext.scene.add(geoJSONlayer);
        setSurfaceMapReference(geoJSONlayer);
    }

    const renderPointLayer = () => {
        const renderer = {
          type: "simple", 
          symbol: {
            type: "point-3d", 
            symbolLayers: [{ 
                type: "icon",
                size: 100,
                resource: { primitive: "circle" },
                material: { color: "red" }
            }] 
          },
          // visualVariables: [
          //   { 
          //     type: "size", 
          //     field: "AGL" 
          //   }
          // ]
        };
        // const popup = { 
        //     title: "SCORE {SCORE}",
        //     content: [{ type: "fields", fieldInfos: surface.fieldInfos}]
        // }
        const popup = {}
        addLayerToMap(renderer, popup)
    }

    const removeLayer = () => {
        mapContext.scene.remove(surfaceMapReference);
    }

    const zoomToLayer = (geoJSONlayer: any) => {
        if (geoJSONlayer) {
        geoJSONlayer
            .when(() => geoJSONlayer.queryExtent())
            .then((response: any) => mapContext.view.goTo(response.extent));
        }
    }

    useEffect(() => zoomToLayer(surfaceMapReference),[surfaceMapReference])

    useLayoutEffect(() => {
      renderPointLayer()
    }, [dataContext.blob]);

    return (<></>)

}

export default MapLayer;
