import { gql, useQuery } from '@apollo/client'

export const GET_MY_TOTAL_FOLLOWS = gql`
    query Me {
        me {
            id
            total_following
            total_followers
        }
    }
`

export interface GetMyTotalFollows {
    me: {
        id: number,
        total_following: number
        total_followers: number
    }
}

export const useGetMyTotalFollows = () => useQuery<GetMyTotalFollows>(
    GET_MY_TOTAL_FOLLOWS, { fetchPolicy: 'cache-first' })


export const GET_USER_TOTAL_FOLLOWS = gql`
    query User($id: Int!) {
        user(id: $id) {
            id
            total_following
            total_followers
        }
    }
`

export interface GetUserTotalFollows {
    user: {
        id: number,
        total_following: number
        total_followers: number
    }
}

interface Vars {
    id: number
}

export const useGetUserTotalFollows = ({ id }: Vars) => useQuery<GetUserTotalFollows, Vars>(
    GET_USER_TOTAL_FOLLOWS, { variables: { id }, fetchPolicy: 'cache-first' })
