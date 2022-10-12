import { useMutation, gql } from "@apollo/client";
import { MediaInput } from "../../types/Media";
import { Point } from "geojson";
import { GET_CATCH } from "../queries/useGetCatch";

const EDIT_CATCH = gql`
mutation Mutation($id: Int!, $details: CatchUpdate!) {
  updateCatch(id: $id, details: $details) {
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

interface EditCatchRes {
    updateCatch: {
        id: number
        waterbody: {
            id: number
        },
        user: {
            id: number
        }
    }
}

interface Vars {
    id: number,
    details: {
        deleteMedia: number[] | undefined
        map_image: MediaInput | undefined
        media: MediaInput[] | undefined
        title: string | undefined | null
        description: string | undefined | null
        waterbody: number | undefined | null
        point: Point | undefined | null
        weight: number | undefined | null
        length: number | undefined | null
        species: string | undefined | null
        rig: string | undefined | null
    }
}


export const useEditCatch = () => useMutation<EditCatchRes, Vars>(EDIT_CATCH, { 
    refetchQueries: ({ data }) => [
        { query: GET_CATCH, variables: { id: data?.updateCatch.id } },
        'MyCatches'
    ]
})