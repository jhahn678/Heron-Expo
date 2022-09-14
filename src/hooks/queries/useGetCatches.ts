import { gql, useQuery } from '@apollo/client'
import { CatchQueryType, CatchSort, ICatch } from '../../types/Catch'
import { IMedia } from '../../types/Media'
import { IUser } from '../../types/User'
import { IWaterbody } from '../../types/Waterbody'

const GET_CATCHES = gql`
    query Catches($id: Int!, $type: CatchQueryType!, $offset: Int, $limit: Int, $sort: CatchSort, $queryLocation: QueryLocation, $mediaLimit: Int) {
        catches(id: $id, type: $type, offset: $offset, limit: $limit, sort: $sort, queryLocation: $queryLocation) {
            id
            created_at
            species
            title
            waterbody {
                id
                name
            }
            user {
                id
                fullname
                avatar
            }
            media(limit: $mediaLimit) {
                url
            }
            geom
            description
            length
            weight
            rig
        }
    }
`

export interface GetCatchesRes{
    catches: (Omit<ICatch, 'updated_at' | 'user' | 'waterbody'> & {
        waterbody: Pick<IWaterbody, 'id' | 'name'>
        user: Pick<IUser, 'id' | 'fullname' | 'avatar'>
        media: Pick<IMedia, 'url'>[]
    })[]
}

export interface Vars {
    type: CatchQueryType,
    id?: number
    offset?: number
    limit?: number
    sort?: CatchSort
    queryLocation?: {
        latitude: number
        longitude: number
        withinMeters?: number
    }
    mediaLimit?: number
}

interface Args extends Omit<Vars, 'queryLocation'>{
    coordinates?: {
        latitude: number,
        longitude: number
    },
    withinMeters?: number
}

export const useGetCatchesQuery = ({ withinMeters=100000, coordinates, ...args }: Args) => {
    return useQuery<GetCatchesRes, Vars>(GET_CATCHES, { 
        variables: {
            type: args.type,
            id: args.id,
            offset: args.offset,
            limit: args.limit,
            mediaLimit: args.mediaLimit,
            sort: args.sort,
            queryLocation: coordinates ? { 
                ...coordinates,
                withinMeters
            } : undefined
        } 
    })
}