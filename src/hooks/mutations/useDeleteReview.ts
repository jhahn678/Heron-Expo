import { useMutation, gql } from "@apollo/client";
import { useAuth } from "../../store/auth/useAuth";
import { makeFragmentId } from "../../utils/makeFragmentId";
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

export const useDeleteReview = (id: number) => {
    const auth = useAuth(store => store.id)
    return useMutation<Res, Vars>(DELETE_REVIEW, {
        variables: { id },
        refetchQueries: ({ data }) => ([
            { query: GET_WATERBODY, variables: { id: data?.deleteWaterbodyReview.waterbody.id } },
        ]),
        update: (cache) => {
            cache.updateFragment({
                id: `User:${auth}`,
                fragment: gql`
                    fragment User${makeFragmentId()} on User{
                        total_reviews
                    }
                `
            }, data => ({ 
                ...data, 
                total_reviews: data ? data.total_reviews - 1 : 0
            }))
        }
    })
}