import { useQuery, gql } from '@apollo/client'
import { IMedia } from '../../types/Media'
import { IWaterbody } from '../../types/Waterbody'

export const GET_MY_SAVED_WATERBODIES = gql`
query SavedWaterbodies($offset: Int) {
  me {
    id
    saved_waterbodies(offset: $offset) {
        id
        name
        classification
        country
        ccode
        subregion
        admin_one
        admin_two
        media {
            id
            url
        }
        distance
        rank
        total_catches
        total_locations
        average_rating
        is_saved
    }
  }
}
`

export interface GetMySavedWaterbodies {
    me: {
        id: number
        saved_waterbodies: (Omit<IWaterbody, 'weight' | 'oid'> & {
            media: Pick<IMedia, "url" | "id">[];
            total_catches: number;
            total_locations: number;
            average_rating: number | null;
            is_saved: boolean
        })[]
    }
}

interface Vars {
    offset?: number
    limit?: number
}

export const useGetMySavedWaterbodies = () => useQuery<GetMySavedWaterbodies, Vars>(GET_MY_SAVED_WATERBODIES)