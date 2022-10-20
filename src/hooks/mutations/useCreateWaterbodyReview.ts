import { gql, useMutation } from '@apollo/client'
import { GET_REVIEWS } from '../queries/useGetWaterbodyReviews';
import { useAuth } from '../../store/auth/useAuth';
import { makeFragmentId } from '../../utils/makeFragmentId';

const CREATE_REVIEW = gql`
    mutation Mutation($input: NewReviewInput!) {
        addWaterbodyReview(input: $input) {
            id
            waterbody {
                id
            }
        }
    }
`

export interface NewReviewInput {
    waterbody: number
    rating: number
    text: string
}

interface Res {
    addWaterbodyReview: {
        id: number
        waterbody: {
            id: number
        }
    }
}

interface Vars {
    input: NewReviewInput
}

export const useCreateWaterbodyReview = () => {
    const auth = useAuth(store => store.id)
    const result = useMutation<Res, Vars>(CREATE_REVIEW, {
        refetchQueries: ({ data }) => [
            { query: GET_REVIEWS, variables: { id: data?.addWaterbodyReview.waterbody.id, limit: 3 } }
        ],
        update: (cache) => {
            cache.updateFragment({
               id: `User:${auth}`,
               fragment: gql`
                fragment User${makeFragmentId()} on User{
                    total_reviews
                }
               `,
            }, data => ({ 
                ...data, 
                total_reviews: data ? data.total_reviews + 1 : 1 
            }))
        }
    })
    return result;
}