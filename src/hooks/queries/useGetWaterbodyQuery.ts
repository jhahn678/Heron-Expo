import { gql, useQuery, useLazyQuery } from '@apollo/client'
import { GetWaterbodyCatch } from '../../types/Catch'
import { IMedia } from '../../types/Media'
import { IWaterbody } from '../../types/Waterbody'

const GET_WATERBODY = gql`
query Waterbody($id: Int!, $mediaLimit: Int, $catchesLimit: Int) {
    waterbody(id: $id) {
        id
        name
        classification
        country
        admin_one
        admin_two
        ccode
        subregion
        total_catches
        total_locations
        total_media
        media(limit: $mediaLimit) {
            url
        }
        catches(limit: $catchesLimit) {
            id
            user {
                fullname
                id
                avatar
            }
            species
            created_at
            media {
                url
            }
        }
    }
}`

export interface GetWaterbody extends Omit<IWaterbody, 'oid' | 'weight'>{
    total_catches: number
    total_locations: number
    total_media: number
    media: Pick<IMedia, 'url'>[]
    catches: GetWaterbodyCatch[]
}

export interface GetWaterbodyRes {
    waterbody: GetWaterbody
}

export interface GetWaterbodyVars {
    id: number,
    mediaLimit?: number
    catchesLimit?: number
}

export const useGetWaterbodyQuery = (id: number) => {
    const result = useQuery<GetWaterbodyRes>(GET_WATERBODY, {
        variables: { id, mediaLimit: 1, catchesLimit: 1 },
        skip: !Boolean(id)
    })
    return result;
}

export const useLazyGetWaterbodyQuery = () => {
    const result = useLazyQuery<GetWaterbodyRes, GetWaterbodyVars>(GET_WATERBODY)
    return result;
}