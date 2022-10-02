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
            }
        }
    }
`

export interface GetUserFollowing {
    user: {
        following: Pick<
        IUser, 
        | 'id' 
        | 'avatar' 
        | 'fullname' 
        | 'username' 
        | 'location'
        >[]
    }
}

interface Vars {
    limit?: number
    offset?: number
}

export const useGetUserFollowing = ({ limit=20, skip=false }: { limit?: number, skip?: boolean }) => {
    const notAuthenticated = useAuth(store => !store.isAuthenticated) 
    return useQuery<GetUserFollowing, Vars>(GET_USER_FOLLOWING, { 
        variables: { limit }, 
        skip: notAuthenticated ? true : skip ? true : false
    })
}

export const useLazyGetUserFollowing = ({ limit=20 }: { limit?: number}) => {
    return useLazyQuery<GetUserFollowing, Vars>(GET_USER_FOLLOWING, { variables: { limit }})
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

interface Vars {
    limit?: number
    offset?: number
}

export const useGetMyFollowing = ({ limit=20, skip=false }: { limit?: number, skip?: boolean }) => {
    const notAuthenticated = useAuth(store => !store.isAuthenticated) 
    return useQuery<GetMyFollowing, Vars>(GET_MY_FOLLOWING, { 
        variables: { limit }, 
        skip: notAuthenticated ? true : skip ? true : false
    })
}

export const useLazyGetMyFollowing = ({ limit=20 }: { limit?: number}) => {
    const result = useLazyQuery<GetMyFollowing, Vars>(GET_MY_FOLLOWING, { variables: { limit }})
    return result
}
