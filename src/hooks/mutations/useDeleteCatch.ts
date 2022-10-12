import { useMutation, gql } from "@apollo/client";
import { CatchQuery } from "../../types/Catch";
import { getCatchesQueryName } from "../queries/useGetCatches";
import { GET_MY_PROFILE_TOTALS } from "../queries/useGetMyProfile";
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

export const useDeleteCatch = (id: number) => useMutation<Res, Vars>(DELETE_CATCH, {
    variables: { id },
    refetchQueries: ({ data }) => [
        { query: GET_WATERBODY, variables: { id: data?.deleteCatch.waterbody.id } },
        { query: GET_MY_PROFILE_TOTALS },
        `${getCatchesQueryName(CatchQuery.Waterbody, data?.deleteCatch.waterbody.id)}`,
        'MyCatches'
    ]
})