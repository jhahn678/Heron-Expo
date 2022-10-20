import { useMutation, gql, InternalRefetchQueriesInclude } from "@apollo/client";
import { useAuth } from "../../store/auth/useAuth";
import { CatchQuery } from "../../types/Catch";
import { makeFragmentId } from "../../utils/makeFragmentId";
import { getCatchesQueryName } from "../queries/useGetCatches";
import { GET_MY_CATCH_STATISTICS } from "../queries/useGetUserCatchStatistics";
import { GET_WATERBODY } from "../queries/useGetWaterbody";

const DELETE_CATCH = gql`
mutation Mutation($id: Int!) {
  deleteCatch(id: $id) {
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
    deleteCatch: {
        id: number
        waterbody: {
            id: number
        }
    }
}

export const useDeleteCatch = (id: number) => {
  const auth = useAuth(store => store.id)
  return useMutation<Res, Vars>(DELETE_CATCH, {
    variables: { id },
    refetchQueries: ({ data }) => {
      const queries: InternalRefetchQueriesInclude = [{ query: GET_MY_CATCH_STATISTICS }, 'MyCatches'];
      if(data?.deleteCatch.waterbody) queries.push(
        { query: GET_WATERBODY, variables: { id: data?.deleteCatch.waterbody.id } },
        `${getCatchesQueryName(CatchQuery.Waterbody, data?.deleteCatch.waterbody.id)}`
      )
      return queries;
    },
    update: cache => {
      cache.updateFragment({
        id: `User:${auth}`,
        fragment: gql`
          fragment User${makeFragmentId()} on User{
            total_catches
          }
        `,
      }, data => ({
          ...data, 
          total_catches: data ? data.total_catches - 1 : 0
      }))
    }
  })
}