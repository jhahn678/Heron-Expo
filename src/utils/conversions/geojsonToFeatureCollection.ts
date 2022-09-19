import { FeatureCollection, Geometry } from "geojson";

export interface Properties extends Object {
    id: number,
    resource: GeoJsonResource
}

export enum GeoJsonResource {
    Waterbody,
    Catch,
    Location
}

export interface Feature {
  geometry: Geometry;
  properties?: Properties
}

export const geojsonToFeatureCollection = (features: Feature | Feature[]): FeatureCollection => {

    const coll: FeatureCollection = { type: 'FeatureCollection', features: [] }

    let input: Feature[];

    if(Array.isArray(features)) input = features;
    else input = [features];

    for(let feat of input){
        if (feat.geometry.type === "GeometryCollection") {
            coll.features = feat.geometry.geometries
                .map(geometry => ({
                    type: "Feature",
                    properties: { ...feat.properties },
                    geometry
                }))
        } else {
            coll.features.push({
                type: "Feature",
                properties: { ...feat.properties },
                geometry: feat.geometry,
            });
        }
    }

    return coll;
};
