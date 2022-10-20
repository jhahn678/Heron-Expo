import { useMutation, gql, InternalRefetchQueriesInclude } from "@apollo/client";
import { useAuth } from "../../store/auth/useAuth";
import { LocationQuery } from "../../types/Location";
import { makeFragmentId } from "../../utils/makeFragmentId";
import { getLocationsQueryName } from "../queries/useGetLocations";
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

export const useDeleteLocation = (id: number) => {
  const auth = useAuth(store => store.id)
  return useMutation<Res, Vars>(DELETE_LOCATION, {
    variables: { id },
    refetchQueries: ({ data }) => {
      const queries: InternalRefetchQueriesInclude = ['MyLocations']
      if(data?.deleteLocation.waterbody) queries.push(
        { query: GET_WATERBODY, variables: { id: data?.deleteLocation.waterbody.id } },
        `${getLocationsQueryName(LocationQuery.Waterbody, data?.deleteLocation.waterbody.id)}`,
      )
      return queries;
    },
    update: cache => {
      cache.updateFragment({
        id: `User:${auth}`,
        fragment: gql`
          fragment User${makeFragmentId()} on User{
            total_locations
          }
        `,
      }, data => ({
          ...data, 
          total_locations: data ? data.total_locations - 1 : 0
      }))
  }
  })
}