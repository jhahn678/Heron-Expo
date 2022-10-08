import { gql, useQuery, useLazyQuery } from '@apollo/client'
import { useAuth } from '../../store/auth/useAuth'
import { IUser } from '../../types/User'
import { UserFollowsVars, MyFollowsVars } from './useGetUserFollowing'

export const GET_USER_FOLLOWERS = gql`
query User($id: Int!, $limit: Int, $offset: Int) {
    user(id: $id) {
        id
        followers(limit: $limit, offset: $offset) {
            id
            fullname
            username
            location
            avatar
            am_following
        }
    }
}
`

export interface GetUserFollowers {
    user: {
        followers: (Pick<
            IUser, 
            | 'id' 
            | 'avatar' 
            | 'fullname' 
            | 'username' 
            | 'location'
            > & {
                am_following: boolean
            })[]
    }
}

export const useGetUserFollowers = ({ id, limit=20, skip=false }: { id: number, limit?: number, skip?: boolean }) => {
    const notAuthenticated = useAuth(store => !store.isAuthenticated) 
    return useQuery<GetUserFollowers, UserFollowsVars>(GET_USER_FOLLOWERS, {
        variables: { id, limit }, 
        skip: notAuthenticated ? true : skip ? true : false
    })
}

export const useLazyGetUserFollowers = ({ id, limit=20 }: { id: number, limit?: number}) => {
    return useLazyQuery<GetUserFollowers, UserFollowsVars>(GET_USER_FOLLOWERS, { variables: { id, limit }})
}

export const GET_MY_FOLLOWERS = gql`
    query Me($limit: Int, $offset: Int) {
        me {
            id
            followers(limit: $limit, offset: $offset) {
                id
                fullname
                username
                location
                avatar
                am_following
            }
        }
    }
`

export interface GetMyFollowers {
    me: {
        followers: (Pick<
        IUser, 
        | 'id' 
        | 'avatar' 
        | 'fullname' 
        | 'username' 
        | 'location'
        > & { am_following: boolean })[]
    }
}

export const useGetMyFollowers = ({ limit=20, skip=false }: { limit?: number, skip?: boolean }) => {
    const notAuthenticated = useAuth(store => !store.isAuthenticated) 
    return useQuery<GetMyFollowers, MyFollowsVars>(GET_MY_FOLLOWERS, {
        variables: { limit }, 
        skip: notAuthenticated ? true : skip ? true : false
    })
}

export const useLazyGetMyFollowers = ({ limit=20 }: { limit?: number}) => {
    return useLazyQuery<GetMyFollowers, MyFollowsVars>(GET_MY_FOLLOWERS, { variables: { limit }})
}