import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import { MapContext } from "../contexts/MapStore";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { DataContext } from "../contexts/DataStore";

export const MapLayer = () => {
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
      elevationInfo: 'on-the-ground',
      popupTemplate: popup,
    });
    dataContext.blob && mapContext.scene.add(geoJSONlayer);
    setSurfaceMapReference(geoJSONlayer);
  }

  const point3Drenderer = {
    type: "simple", 
    symbol: {
      type: "point-3d", 
      symbolLayers: [{ 
          type: "object",
          width: 40,
          depth: 40,
          opacity: 0.7,
          resource: { primitive: "cylinder" },
          material: { color: "#3E238B" },
          outline: { color: "#0E7DE8", size: 2 },
      }] 
    },
    visualVariables: [
      {
        type: "size",
        field: "AGL", 
        axis: "height",
        valueUnit: "meters",
        stops: [
          { value: dataContext.info.min, size: dataContext.info.min },
          { value: dataContext.info.max, size: (dataContext.info.max*2) }
        ],
      },
      {
        type: "size",
        axis: "width-and-depth",
        useSymbolValue: true // uses the width value defined in the symbol layer (50,000)
      },
      { type: "color", 
        field: "AGL", 
        stops: [{ value: 151, color: "rgba(68, 1, 84, 0.3)"},
                { value: 175, color: "rgba(49, 104, 142, 0.3)" },
                { value: 200, color: "rgba(53, 183, 121, 0.3)" },
                { value: 222, color: "rgba(253, 231, 37, 0.3)" }],
      }
    ]
  };

  const obstaclesPopup = { 
      title: "OBSTACLE {Notes}",
      content: [{ 
        type: "fields", 
        fieldInfos: dataContext.info.fields
      }]
  }

  const removeLayer = () => mapContext.scene.remove(surfaceMapReference);
  const zoomToLayer = (geoJSONlayer: any) => {
      if (geoJSONlayer) {
      geoJSONlayer
          .when(() => geoJSONlayer.queryExtent())
          .then((response: any) => mapContext.view.goTo(response.extent));
      }
  }
  useEffect(() => zoomToLayer(surfaceMapReference),[surfaceMapReference])
  useLayoutEffect(() => {
    addLayerToMap(point3Drenderer, obstaclesPopup)
  }, [dataContext.info]);

  return (<></>)

}

export default MapLayer;
