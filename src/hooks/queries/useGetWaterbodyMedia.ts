import { gql, useQuery } from '@apollo/client'
import { Faker } from '@faker-js/faker'
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

export const useGetWaterbodyMedia = ({ id, offset=0, limit=24 }: Vars) => {
    return useQuery<GetWaterbodyMedia, Vars>(GET_WATERBODY_MEDIA, {
        variables: { id, offset }
    })
}