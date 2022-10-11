import { gql, useLazyQuery, useQuery, WatchQueryFetchPolicy } from '@apollo/client'
import { IMedia } from '../../types/Media'

const GET_WATERBODY_MEDIA = gql`
    query Waterbody($id: Int!, $limit: Int, $offset: Int) {
        waterbody(id: $id) {
            id
            media(limit: $limit, offset: $offset) {
                id
                url
                created_at
            }
        }
    }
`

export interface GetWaterbodyMedia {
    waterbody: {
        id: number,
        media: Pick<IMedia, 'id' | 'url' | 'created_at'>[]
    }
}

interface Vars {
    id: number
    offset?: number
    limit?: number,
}

interface Args extends Vars {
    skip?: boolean
    initialFetchPolicy?: WatchQueryFetchPolicy
}

export const useGetWaterbodyMedia = ({ 
    id, 
    offset=0, 
    limit=24, 
    skip=false, 
    initialFetchPolicy='cache-first'
}: Args) => {
    return useQuery<GetWaterbodyMedia, Vars>(GET_WATERBODY_MEDIA, {
        skip, initialFetchPolicy,
        variables: { id, limit, offset }
    })
}

export const useLazyGetWaterbodyMedia = ({ id, limit=24, offset=0 }: Vars) => {
    return useLazyQuery<GetWaterbodyMedia, Vars>(GET_WATERBODY_MEDIA, {
        variables: { id, limit, offset }
    })
}