import { gql, useQuery, useLazyQuery } from '@apollo/client'
import { IUser } from '../../types/User'
import { IWaterbodyReview } from '../../types/Waterbody'

export const GET_REVIEWS = gql`
    query Waterbody($id: Int!, $limit: Int, $offset: Int) {
        waterbody(id: $id) {
            id
            rating_counts{
                five
                four
                three
                two
                one
            }
            reviews(limit: $limit, offset: $offset) {
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

interface Args {
    id: number
    limit?: number
    offset?: number,
    sort?: ReviewSort
}

interface Vars extends Args {
    limit: number,
    sort?: ReviewSort
}

export const useGetWaterbodyReviews = ({ 
    id, 
    limit=5, 
    offset=0, 
    sort=ReviewSort.CreatedAtNewest
}: Args) => useQuery<GetWaterbodyReviews, Vars>(GET_REVIEWS, { 
        variables: { id, limit, offset, sort },
        skip: id === undefined
    })