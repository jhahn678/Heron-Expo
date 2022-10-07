import { gql, useQuery } from '@apollo/client'
import { useAuth } from '../../store/auth/useAuth'
import { ICatch } from '../../types/Catch'
import { IMedia } from '../../types/Media'
import { IUser } from '../../types/User'
import { IWaterbody } from '../../types/Waterbody'

export const GET_MY_CATCHES = gql`
    query MyCatches(
        $waterbody: [Int!], 
        $species: [String!], 
        $weight: Range, 
        $length: Range, 
        $date: DateRange
        $limit: Int, 
        $offset: Int, 
        $mediaLimit: Int
    ) {
        me {
            id
            catches(
                waterbody: $waterbody, 
                species: $species, 
                date: $date,
                weight: $weight, 
                length: $length, 
                offset: $offset, 
                limit: $limit, 
            ) {
                id
                user {
                    id
                    fullname
                    avatar
                }
                waterbody {
                    id
                    name
                }
                geom
                title
                description
                species
                length
                weight
                rig
                created_at
                total_favorites
                media(limit: $mediaLimit){
                    id
                    url
                }
            }
  }
}
`

export interface GetMyCatchesRes {
    me: {
        catches: (Omit<ICatch, 'updated_at'> & {
            user: Pick<IUser, 'id' | 'fullname' | 'avatar'>
            waterbody: Pick<IWaterbody, 'id' | 'name'>
            total_favorites: number
            media: Pick<IMedia, 'id' | 'url'>[]
        })[]
    }
}

interface Vars {
    waterbody?: number[]
    species?: string[]
    date?: {
        min?: Date
        max?: Date
    },
    weight: {
        min?: number
        max?: number
    },
    length: {
        min?: number
        max?: number
    },
    offset?: number
    limit?: number
    mediaLimit?: number
}

export interface UseGetMyCatchesArgs {
    waterbody?: number[]
    species?: string[]
    minDate?: Date
    maxDate?: Date
    minWeight?: number
    maxWeight?: number
    minLength?: number
    maxLength?: number
    offset?: number
    limit?: number
}

export const useGetMyCatches = ({ 
    minDate, 
    maxDate, 
    minLength, 
    maxLength, 
    minWeight, 
    maxWeight, 
    ...args
}: UseGetMyCatchesArgs) => {

    const isAuthenticated = useAuth(store => store.isAuthenticated)

    return useQuery<GetMyCatchesRes, Vars>(GET_MY_CATCHES, {
        variables: {
            ...args,
            mediaLimit: 1,
            date: {
                min: minDate,
                max: maxDate
            },
            length: {
                min: minLength,
                max: maxLength
            },
            weight: {
                min: minWeight,
                max: maxWeight
            }
        },
        skip: !isAuthenticated
    })
}