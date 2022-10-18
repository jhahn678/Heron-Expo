import { useQuery, gql } from "@apollo/client";
import { IUser } from "../../types/User";

export const GET_MY_PROFILE = gql`
    query Me {
        me {
            id
            firstname
            lastname
            fullname
            username
            bio
            avatar
            city
            state
            location
            created_at
        }
    }
`

export const GET_MY_PROFILE_TOTALS = gql`
    query Me {
        me {
            id
            bio
            created_at
            username
            total_followers
            total_following
            total_locations
            total_saved_locations
            total_saved_waterbodies
            total_catches
            total_reviews
            total_media
        }
    }
`

export interface GetMyProfileRes {
    me: Pick<IUser, 
        | 'id' 
        | 'firstname' 
        | 'lastname' 
        | 'fullname' 
        | 'username'
        | 'bio' 
        | 'avatar' 
        | 'city' 
        | 'state' 
        | 'location' 
        | 'created_at'
    >
}

export interface GetMyProfileTotalsRes {
    me: Pick<IUser, 'id' | 'created_at' | 'bio' | 'username'> & {
        total_following: number
        total_followers: number
        total_locations: number
        total_saved_locations: number
        total_saved_waterbodies: number
        total_catches: number
        total_reviews: number
        total_media: number
    }
}

export const useGetMyProfile = () => useQuery<GetMyProfileRes>(GET_MY_PROFILE)

export const useGetMyProfileTotals = () => useQuery<GetMyProfileTotalsRes>(GET_MY_PROFILE_TOTALS)
