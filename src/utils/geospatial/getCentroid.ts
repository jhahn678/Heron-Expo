import centroid from "@turf/centroid";
import * as turf from '@turf/helpers'
import { LatLng } from "react-native-maps";

export const getCentroid = (points: LatLng | LatLng[]) => {
    if(Array.isArray(points)){
        return centroid(turf.polygon([points.map(x => [x.longitude, x.latitude])])).geometry.coordinates
    }else{
        const { latitude, longitude } = points;
        return centroid(turf.point([longitude, latitude])).geometry.coordinates
    }
}