import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { Coordinates, ILocation, LocationQuery, LocationSort } from '../../types/Location'
import { IMedia } from '../../types/Media'
import { IUser } from '../../types/User'
import { IWaterbody } from '../../types/Waterbody'
import { useLocationStore } from '../../store/location/useLocationStore'

const GET_LOCATIONS = gql`
    query Locations($type: LocationQuery!, $id: Int, $coordinates: Coordinates, $limit: Int, $offset: Int, $sort: LocationSort) {
        locations(type: $type, id: $id, coordinates: $coordinates, limit: $limit, offset: $offset, sort: $sort) {
            id
            privacy
            title
            description
            user {
                id
                fullname
                avatar
            }
            waterbody {
                id
                name
            }
            media {
                url
            }
            geom
            hexcolor
            created_at
            nearest_geoplace
        }
    }
`

export interface GetLocationsRes {
    locations: (
        Omit<ILocation, 'user' | 'waterbody'> & {
            user: Pick<IUser, 'id' | 'fullname' | 'avatar'>
            waterbody: Pick<IWaterbody, 'id' | 'name'>
            media: Pick<IMedia, 'url'>[]
            nearest_geoplace: string
        }
    )[]
}

interface Vars {
    type: LocationQuery,
    id?: number
    coordinates?: Coordinates,
    limit?: number
    offset?: number
    sort?: LocationSort
}

export const useGetLocationsQuery = (args: Omit<Vars, 'coordinates'>) => {

    const { latitude, longitude } = useLocationStore(store => ({
        latitude: store.latitude,
        longitude: store.longitude
    }))

    return useQuery<GetLocationsRes, Vars>(GET_LOCATIONS, { 
        variables: {
            ...args,
            coordinates: (latitude && longitude) ? { latitude, longitude } : undefined
        }
    })
}

export const useLazyGetLocation = (args: Omit<Vars, 'coordinates'>) => {
    const { latitude, longitude } = useLocationStore((store) => ({
      latitude: store.latitude,
      longitude: store.longitude,
    }));

    return useLazyQuery<GetLocationsRes, Vars>(GET_LOCATIONS, {
      variables: {
        ...args,
        coordinates:
          latitude && longitude ? { latitude, longitude } : undefined,
      },
    });
}