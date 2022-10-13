import { useMutation, gql } from "@apollo/client";
import { GET_MY_PROFILE_TOTALS } from "../queries/useGetMyProfile";
import { GET_WATERBODY } from "../queries/useGetWaterbody";

const DELETE_REVIEW = gql`
mutation Mutation($id: Int!) {
    deleteWaterbodyReview(id: $id){
        id
        waterbody {
            id
        }
    }
}
`
interface Res {
    deleteWaterbodyReview: {
        id: number
        waterbody: {
            id: number
        }
    }
}

interface Vars {
    id: number
}

export const useDeleteReview = (id: number) => useMutation<Res, Vars>(DELETE_REVIEW, {
    variables: { id },
    refetchQueries: ({ data }) => ([
        { query: GET_MY_PROFILE_TOTALS },
        { query: GET_WATERBODY, variables: { id: data?.deleteWaterbodyReview.waterbody.id } },
    ])
})