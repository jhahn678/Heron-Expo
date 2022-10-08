import { gql, useQuery, useLazyQuery } from '@apollo/client'
import { useAuth } from '../../store/auth/useAuth'
import { IUser } from '../../types/User'

export const GET_USER_FOLLOWING = gql`
    query User($id: Int!, $limit: Int, $offset: Int) {
        user(id: $id) {
            id
            following(limit: $limit, offset: $offset) {
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

export interface GetUserFollowing {
    user: {
        following: (Pick<
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

export interface UserFollowsVars {
    id: number,
    limit?: number
    offset?: number
}

export const useGetUserFollowing = ({ id, limit=20, skip=false }: { id: number, limit?: number, skip?: boolean }) => {
    const notAuthenticated = useAuth(store => !store.isAuthenticated) 
    return useQuery<GetUserFollowing, UserFollowsVars>(GET_USER_FOLLOWING, { 
        variables: { id, limit }, 
        skip: notAuthenticated ? true : skip ? true : false
    })
}

export const useLazyGetUserFollowing = ({ id, limit=20 }: { id: number, limit?: number}) => {
    return useLazyQuery<GetUserFollowing, UserFollowsVars>(GET_USER_FOLLOWING, { variables: { id, limit }})
}


export const GET_MY_FOLLOWING = gql`
    query Me($limit: Int, $offset: Int) {
        me {
            id
            following(limit: $limit, offset: $offset) {
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

export interface GetMyFollowing {
    me: {
        following: (Pick<
        IUser, 
        | 'id' 
        | 'avatar' 
        | 'fullname' 
        | 'username' 
        | 'location'
        > & { am_following: boolean })[]
    }
}

export interface MyFollowsVars {
    limit?: number
    offset?: number
}

export const useGetMyFollowing = ({ limit=20, skip=false }: { limit?: number, skip?: boolean }) => {
    const notAuthenticated = useAuth(store => !store.isAuthenticated) 
    return useQuery<GetMyFollowing, MyFollowsVars>(GET_MY_FOLLOWING, { 
        variables: { limit }, 
        skip: notAuthenticated ? true : skip ? true : false
    })
}

export const useLazyGetMyFollowing = ({ limit=20 }: { limit?: number}) => {
    const result = useLazyQuery<GetMyFollowing, MyFollowsVars>(GET_MY_FOLLOWING, { variables: { limit }})
    return result
}
