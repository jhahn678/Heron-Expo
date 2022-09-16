import { FeatureCollection, Geometry } from "geojson";

export const geojsonToFeatureCollection = (geometry: Geometry): FeatureCollection => {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry
      },
    ],
  };
};
