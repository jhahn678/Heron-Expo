import { gql, useApolloClient, useQuery } from '@apollo/client'
import { IUser } from '../../types/User'
import { IWaterbodyReview } from '../../types/Waterbody'

export const GET_REVIEWS = gql`
    query Waterbody($id: Int!, $limit: Int, $offset: Int, $sort: ReviewSort) {
        waterbody(id: $id) {
            id
            name
            rating_counts{
                five
                four
                three
                two
                one
            }
            reviews(limit: $limit, offset: $offset, sort: $sort) {
                id
                rating
                text
                created_at
                user {
                    id
                    fullname
                    avatar
                }
            }
        }
    }
`

export interface GetWaterbodyReview extends Omit<IWaterbodyReview, 'user' | 'waterbody'>{
    user: Pick<IUser, 'id' | 'fullname' | 'avatar'>,
}

export interface GetWaterbodyReviews {
    waterbody: {
        id: number,
        name: string
        rating_counts: {
            five: number
            four: number
            three: number
            two: number
            one: number
        }
        reviews: GetWaterbodyReview[]
    }
}

export enum ReviewSort {
    CreatedAtNewest = 'CREATED_AT_NEWEST',
    CreatedAtOldest = 'CREATED_AT_OLDEST',
    RatingHighest = 'RATING_HIGHEST',
    RatingLowest = 'RATING_LOWEST'
}

interface Vars {
    id: number
    limit?: number
    offset?: number,
    sort?: ReviewSort
}

interface Args extends Omit<Vars, 'offset'> {
    skip?: boolean
}

export const useGetWaterbodyReviews = ({ 
    id, 
    limit=5,
    sort=ReviewSort.CreatedAtNewest,
    skip=false
}: Args) => useQuery<GetWaterbodyReviews, Vars>(GET_REVIEWS, { 
    variables: { id, limit, sort }, skip
})