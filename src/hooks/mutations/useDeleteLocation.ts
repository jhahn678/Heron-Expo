import { useMutation, gql } from "@apollo/client";
import { LocationQuery } from "../../types/Location";
import { getLocationsQueryName } from "../queries/useGetLocations";
import { GET_MY_PROFILE_TOTALS } from "../queries/useGetMyProfile";
import { GET_WATERBODY } from "../queries/useGetWaterbody";

const DELETE_LOCATION = gql`
mutation Mutation($id: Int!) {
  deleteLocation(id: $id) {
    id
    waterbody {
      id
    }
  }
}`

interface Vars {
    id: number
}

interface Res {
    deleteLocation: {
        id: number
        waterbody: {
            id: number
        }
    }
}

export const useDeleteLocation = (id: number) => useMutation<Res, Vars>(DELETE_LOCATION, {
    variables: { id },
    refetchQueries: ({ data }) => [
        { query: GET_WATERBODY, variables: { id: data?.deleteLocation.waterbody.id } },
        { query: GET_MY_PROFILE_TOTALS },
        `${getLocationsQueryName(LocationQuery.Waterbody, data?.deleteLocation.waterbody.id)}`,
        'MyLocations'
    ]
})