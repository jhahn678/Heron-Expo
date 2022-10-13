import { gql, useMutation } from '@apollo/client'
import { GET_REVIEWS } from '../queries/useGetWaterbodyReviews';
import { GET_WATERBODY } from '../queries/useGetWaterbody';
import { GET_MY_PROFILE_TOTALS } from '../queries/useGetMyProfile';

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
    const result = useMutation<Res, Vars>(CREATE_REVIEW, {
        refetchQueries: ({ data }) => [
            { query: GET_MY_PROFILE_TOTALS },
            { query: GET_REVIEWS, variables: { id: data?.addWaterbodyReview.waterbody.id, limit: 3 } }
        ]
    })
    return result;
}