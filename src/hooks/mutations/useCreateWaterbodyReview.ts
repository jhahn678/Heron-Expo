import { gql, useMutation } from '@apollo/client'
import { IWaterbodyReview } from '../../types/Waterbody';

const CREATE_REVIEW = gql`
    mutation Mutation($input: NewReviewInput!) {
        addWaterbodyReview(input: $input) {
            id
            created_at
        }
    }
`

const REFETCH_REVIEWS = gql`
    query Waterbody($id: Int!) {
        waterbody(id: $id) {
            average_rating
            total_reviews
        }
    }
`

export interface NewReviewInput {
    waterbody: number
    rating: number
    text: string
}

interface Vars {
    input: NewReviewInput
}

export const useCreateWaterbodyReview = () => {
    const result = useMutation<
        Pick<IWaterbodyReview, 'id' | 'created_at'>, Vars
    >(CREATE_REVIEW)
    return result;
}