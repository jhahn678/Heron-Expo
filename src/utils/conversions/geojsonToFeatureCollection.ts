import { FeatureCollection, Geometry } from "geojson";

export const geojsonToFeatureCollection = (geojson: Geometry | Geometry[]): FeatureCollection => {

    const coll: FeatureCollection = { type: 'FeatureCollection', features: [] }

    let input: Geometry[];

    if(Array.isArray(geojson)) input = geojson;
    else input = [geojson];

    for(let geometry of input){
        if (geometry.type === "GeometryCollection") {
            coll.features = geometry.geometries.map((x) => ({
                type: "Feature",
                properties: {},
                geometry: x,
            }));
        } else {
            coll.features.push({
                type: "Feature",
                properties: {},
                geometry,
            });
        }
    }

    return coll;
};
