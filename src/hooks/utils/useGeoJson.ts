import { FeatureCollection, Geometry } from "geojson";
import { geojsonToMapBounds } from "../../utils/conversions/geojsonToMapBounds";
import { geojsonToFeatureCollection } from "../../utils/conversions/geojsonToFeatureCollection";
import { Camera } from "react-native-maps";
import { greaterNum } from "../../utils/greaterNumber";

export const useGeoJson = () => {

    const makeFeatureCollection = (geojson: Geometry) => {
        return geojsonToFeatureCollection(geojson);
    }

    const makeBoundingBox = (geojson: Geometry | FeatureCollection) => {
        return geojsonToMapBounds(geojson);
    }

    const handleGeoJson = (geojson: Geometry | Geometry[]) => {
      const featureCollection = geojsonToFeatureCollection(geojson);
      const bounds = geojsonToMapBounds(featureCollection);
      const [max, min] = bounds;
      const lngDelta = max.longitude - min.longitude;
      const latDelta = max.latitude - min.latitude;
      const delta = greaterNum(lngDelta, latDelta);
      const camera: Partial<Camera> = {
        center: {
          latitude: (max.latitude + min.latitude) / 2,
          longitude: (max.longitude + min.longitude) / 2,
        },
        zoom: delta ? Math.log(360 / delta) / Math.LN2 : 16
      };
      return { camera, featureCollection };
    };

    return { handleGeoJson, makeBoundingBox, makeFeatureCollection }
}