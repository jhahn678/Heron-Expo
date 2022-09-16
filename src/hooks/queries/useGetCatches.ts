import { gql, useQuery } from '@apollo/client'
import { useLocationStore } from '../../store/location/useLocationStore'
import { CatchQuery, CatchSort, ICatch } from '../../types/Catch'
import { IMedia } from '../../types/Media'
import { IUser } from '../../types/User'
import { IWaterbody } from '../../types/Waterbody'

const GET_CATCHES = gql`
    query Catches($id: Int!, $type: CatchQuery!, $offset: Int, $limit: Int, $sort: CatchSort, $queryLocation: QueryLocation, $mediaLimit: Int) {
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
    type: CatchQuery,
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
    withinMeters?: number
}

export const useGetCatchesQuery = ({ withinMeters=100000, ...args }: Args) => {

    const { latitude, longitude }= useLocationStore(store => ({ 
        latitude: store.latitude, longitude: store.longitude 
    }))

    return useQuery<GetCatchesRes, Vars>(GET_CATCHES, { 
        variables: {
            ...args,
            queryLocation: (latitude && longitude) ? { 
                latitude,
                longitude,
                withinMeters
            } : undefined
        } 
    })
}