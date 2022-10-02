import { gql, useQuery } from '@apollo/client'
import { IUser } from '../../types/User'
import { IWaterbody } from '../../types/Waterbody'
import { ReviewSort } from './useGetWaterbodyReviews'

export const GET_USER_REVIEWS = gql`
query User($id: Int!, $limit: Int, $offset: Int, $sort: ReviewSort) {
  user(id: $id) {
    id
    waterbody_reviews(limit: $limit, offset: $offset, sort: $sort) {
      id
      waterbody {
        id
        name
      }
      user {
        id
        fullname
        avatar
      }
      rating
      text
      created_at
    }
  }
}
`

export interface GetUserReviewsRes {
  user: {
      id: number,
      waterbody_reviews: {
          id: number
          waterbody: Pick<IWaterbody, 'id' | 'name'>
          user: Pick<IUser, 'id' | 'avatar' | 'fullname'>
          rating: number
          text: string
          created_at: Date
      }[]
  }
}

interface Vars {
  id: number
  limit?: number
  offset?: number
  sort?: ReviewSort
}

interface Args extends Omit<Vars, 'offset'>{
  skip?: boolean
}

export const useGetUserReviews = ({ 
  skip=false, ...variables 
}: Args) => useQuery<GetUserReviewsRes, Vars>(GET_USER_REVIEWS, { variables, skip })

