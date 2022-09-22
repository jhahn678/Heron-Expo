import centroid from "@turf/centroid";
import { Point, Polygon, LineString, MultiLineString, MultiPoint, MultiPolygon } from 'geojson'

type Geometry = Point | Polygon | LineString | MultiLineString | MultiPoint | MultiPolygon

export const geomToCoordinates = (geom: Geometry | undefined) => {
    if(!geom) return undefined;
    if(geom.type === 'Point') return {
        latitude: geom.coordinates[1],
        longitude: geom.coordinates[0]
    }
    const center = centroid(geom).geometry.coordinates;
    return {
        latitude: center[1],
        longitude: center[0]
    }
}