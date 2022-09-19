import { gql, useQuery } from '@apollo/client'
import { AdminOneName } from '../../types/AdminOne'
import { WaterbodyClassification, WaterbodyListItem } from '../../types/Waterbody'

const SEARCH_WATERBODIES = gql`
query Waterbodies($classifications: [ClassificationEnum!], $queryLocation: QueryLocation, $offset: Int, $limit: Int, $sort: Sort, $adminOne: [AdminOneEnum!], $value: String) {
    waterbodies(classifications: $classifications, queryLocation: $queryLocation, offset: $offset, limit: $limit, sort: $sort, adminOne: $adminOne, value: $value) {
      id
      name
      classification
      admin_one
      admin_two
      country
      ccode
      subregion
      media {
        id
        url
      }
      distance
      rank
      total_catches
      total_locations
      total_media
    }
  }
`

interface UseSearchWaterbodiesArgs {
    value?: string | null
    longitude?: number | null
    latitude?: number | null 
    adminOne?: AdminOneName[] | null
    classifications?: WaterbodyClassification[] | null
    /** @default 0 */
    offset?: number
    /**@default 20 */
    limit?: number
    /**@default 'rank' */
    sort?: 'rank' | 'distance'
}


export interface WaterbodyResult extends WaterbodyListItem{
    total_media: number
}

interface UseSearchWaterbodies {
    waterbodies: WaterbodyResult[]
}

export const useSearchWaterbodiesQuery = ({
    value=null, longitude, latitude, adminOne, 
    classifications, offset=0, limit=20, sort='rank'
}: UseSearchWaterbodiesArgs) => {
    const result = useQuery<UseSearchWaterbodies>(SEARCH_WATERBODIES, {
        variables: { 
            value,
            queryLocation: (longitude && latitude) && { 
                longitude, 
                latitude, 
                withinMeters: 200000 
            },
            adminOne: adminOne || null,
            classifications: classifications || null,
            offset,
            limit,
            sort,
        }
    })
    return result;
}