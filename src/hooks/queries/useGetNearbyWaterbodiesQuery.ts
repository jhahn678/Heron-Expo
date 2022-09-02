import { gql, useQuery } from '@apollo/client'
import { NearbyWaterbody } from '../../types/Waterbody'

const GET_WATERBODIES = gql`
    query GetWaterbodies($queryLocation: QueryLocation, $limit: Int, $sort: Sort) {
        getWaterbodies(queryLocation: $queryLocation, limit: $limit, sort: $sort) {
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
    }
`

interface GetNearbyWaterbodiesArgs {
    longitude: number | null,
    latitude: number | null
}

export const useGetNearbyWaterbodiesQuery = ({
    longitude, latitude
}: GetNearbyWaterbodiesArgs) => {

    const result = useQuery<NearbyWaterbody[]>(GET_WATERBODIES, {
        fetchPolicy: 'cache-first',
        skip: !Boolean(latitude && longitude),
        variables: { 
            queryLocation: { 
                longitude, 
                latitude, 
                withinMeters: 100000 
            },
            limit: 5, 
            sort: 'distance'
        }
    })
    
    return result;
}

