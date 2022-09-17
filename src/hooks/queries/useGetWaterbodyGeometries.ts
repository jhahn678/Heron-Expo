import { useLazyQuery, gql } from "@apollo/client";
import { Geometry, GeometryCollection } from "geojson";

const GET_WATERBODY_GEOMETRIES = gql`
  query Waterbody($id: Int!) {
    waterbody(id: $id) {
      id
      geometries
    }
  }
`;

interface GetWaterbodyGeometriesRes {
    waterbody: {
        id: number
        geometries: GeometryCollection<Geometry>
    }
}

interface Vars {
    id: number | undefined
}

export const useLazyGetWaterbodyGeometries = (variables: Vars) => {
    return useLazyQuery<GetWaterbodyGeometriesRes, Vars>(GET_WATERBODY_GEOMETRIES, { variables })
}