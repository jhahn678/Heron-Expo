import { gql, useQuery } from '@apollo/client'
import { NearbyWaterbody, WaterbodyClassification } from '../../types/Waterbody'

const GET_WATERBODIES = gql`
query Waterbodies($classifications: [ClassificationEnum!], $queryLocation: QueryLocation, $offset: Int, $limit: Int, $sort: Sort) {
    waterbodies(classifications: $classifications, queryLocation: $queryLocation, offset: $offset, limit: $limit, sort: $sort) {
        id
        name
        classification
        country
        ccode
        subregion
        admin_one
        admin_two
        media {
            url
        }
        distance
        rank
        total_catches
        total_locations
    }
}`



interface GetNearbyWaterbodiesArgs {
    longitude: number | null,
    latitude: number | null,
    classification?: WaterbodyClassification
    sort?: 'distance' | 'rank'
    limit?: number
}

type GetNearbyWaterbodies= { waterbodies: NearbyWaterbody[] }

export const useGetNearbyWaterbodiesQuery = ({
    longitude, latitude, classification, sort='distance', limit=5
}: GetNearbyWaterbodiesArgs) => {

    const result = useQuery<GetNearbyWaterbodies>(GET_WATERBODIES, {
        fetchPolicy: 'cache-first',
        skip: !Boolean(latitude && longitude),
        variables: { 
            queryLocation: { 
                longitude, 
                latitude, 
                withinMeters: 100000 
            },
            classifications: classification ? [classification] : null,
            limit, 
            sort
        }
    })
    
    return result;
}

