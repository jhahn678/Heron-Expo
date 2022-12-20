import { FeatureCollection, Geometry } from "geojson";
import { geojsonToMapBounds } from "../../utils/conversions/geojsonToMapBounds";
import { geojsonToFeatureCollection, Properties } from "../../utils/conversions/geojsonToFeatureCollection";
import { Camera } from "react-native-maps";
import { greaterNum } from "../../utils/conversions/greaterNumber";
import { Feature } from "../../utils/conversions/geojsonToFeatureCollection";

export interface MapPressResponse {
  coordinates: {
    latitude: number
    longitude: number
  },
  type: string,
  feature: {
    type: "Feature"
    geometry: Geometry
    properties: Properties
  }
}

export const useGeoJson = () => {

    const makeFeatureCollection = (features: Feature | Feature[]) => {
      return geojsonToFeatureCollection(features);
    }

    const makeBoundingBox = (geojson: Geometry | FeatureCollection) => {
      return geojsonToMapBounds(geojson);
    }

    const handleGeoJson = (features: Feature | Feature[]) => {
      const featureCollection = geojsonToFeatureCollection(features);
      const bounds = geojsonToMapBounds(featureCollection);
      const [max, min] = bounds;
      const lngDelta = max.longitude - min.longitude;
      const latDelta = max.latitude - min.latitude;
      const delta = greaterNum(lngDelta, latDelta);
      const zoom = delta ? Math.log(360 / delta) / Math.LN2 : 16
      const camera: Partial<Camera> = {
        center: {
          latitude: (max.latitude + min.latitude) / 2,
          longitude: (max.longitude + min.longitude) / 2,
        },
        altitude: 204800000 * Math.pow(.5, zoom),
        zoom,
      };
      return { camera, featureCollection };
    };

    return { handleGeoJson, makeBoundingBox, makeFeatureCollection }
}