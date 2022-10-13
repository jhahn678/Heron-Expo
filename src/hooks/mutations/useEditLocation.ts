import { useMutation, gql } from "@apollo/client";
import { MediaInput } from "../../types/Media";
import { Point, Polygon } from "geojson";
import { GET_LOCATION } from "../queries/useGetLocation";
import { Privacy } from "../../types/Location";

const EDIT_LOCATION = gql`
mutation Mutation($id: Int!, $update: LocationUpdate!) {
  updateLocation(id: $id, location: $update) {
    id
    waterbody {
      id
    }
    user {
      id
    }
  }
}
`

interface Res {
    updateLocation: {
        id: number
        waterbody: {
            id: number
        }
        user: {
            id: number
        }
    }
}

interface Vars {
    id: number
    update: {
        title: string | null | undefined
        description: string | null | undefined
        privacy: Privacy | undefined
        point: Point | undefined | null
        polygon: Polygon | undefined | null
        map_image: MediaInput | undefined
        media: MediaInput[] | undefined
        deleteMedia: number[] | undefined
    }
}

export const useEditLocation = () => useMutation<Res, Vars>(EDIT_LOCATION, { 
    refetchQueries: ({ data }) => [
        { query: GET_LOCATION, variables: { id: data?.updateLocation.id } },
        'MyLocations'
    ]
})