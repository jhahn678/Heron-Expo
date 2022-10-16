import { gql, useQuery } from '@apollo/client'
import { IUser } from '../../types/User'

export const GET_USER_PROFILE = gql`
    query User($id: Int!) {
        user(id: $id) {
            id
            firstname
            fullname
            username
            bio
            avatar
            city
            state
            location
            created_at
            total_followers
            total_following
            total_locations
            total_saved_locations
            total_saved_waterbodies
            total_catches
            total_reviews
            total_media
            am_following
        }
    }
`

export interface GetUserProfileRes {
    user: Pick<IUser, 
        | 'id' 
        | 'firstname' 
        | 'fullname' 
        | 'username'
        | 'bio' 
        | 'avatar' 
        | 'city' 
        | 'state' 
        | 'location' 
        | 'created_at'
    > & {
        total_following: number
        total_followers: number
        total_locations: number
        total_saved_locations: number
        total_saved_waterbodies: number
        total_catches: number
        total_reviews: number
        total_media: number
        am_following: boolean
    }
}

export interface Vars {
    id: number
}

export const useGetUserProfile = (variables: Vars) => useQuery<GetUserProfileRes, Vars>(GET_USER_PROFILE, { variables })