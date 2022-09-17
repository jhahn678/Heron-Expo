import bbox from "@turf/bbox";
import { FeatureCollection, Geometry } from "geojson";
import { LatLng } from "react-native-maps";

export const geojsonToMapBounds = (geojson: Geometry | FeatureCollection): [northeast: LatLng, southwest: LatLng] => {
    const [minX, minY, maxX, maxY] = bbox(geojson);
    return [
        { latitude: maxY, longitude: maxX },
        { latitude: minY, longitude: minX }
    ]
}