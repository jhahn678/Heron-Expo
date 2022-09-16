import { gql, useQuery, useLazyQuery } from '@apollo/client'
import { CatchSort, GetWaterbodyCatch } from '../../types/Catch'
import { IMedia } from '../../types/Media'
import { IWaterbody } from '../../types/Waterbody'

const GET_WATERBODY = gql`
query Waterbody($id: Int!, $mediaLimit: Int, $sort: CatchSort) {
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
        total_species
        total_locations
        total_media
        total_reviews
        average_rating
        media(limit: $mediaLimit) {
            url
        }
    }
}`

export interface GetWaterbody extends Omit<IWaterbody, 'oid' | 'weight'>{
    total_catches: number
    total_species: number
    total_locations: number
    total_media: number,
    total_reviews: number,
    average_rating: number | null,
    media: Pick<IMedia, 'url'>[]
}

export interface GetWaterbodyRes {
    waterbody: GetWaterbody
}

export interface GetWaterbodyVars {
    id: number,
    mediaLimit?: number
    sort?: CatchSort
}

export const useGetWaterbodyQuery = (id: number) => {
    const result = useQuery<GetWaterbodyRes>(GET_WATERBODY, {
        variables: { id, mediaLimit: 1, sort: CatchSort.CreatedAtNewest },
        skip: !Boolean(id)
    })
    return result;
}

export const useLazyGetWaterbodyQuery = () => {
    const result = useLazyQuery<GetWaterbodyRes, GetWaterbodyVars>(GET_WATERBODY)
    return result;
}