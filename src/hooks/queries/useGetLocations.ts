import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { Coordinates, ILocation, LocationQuery, LocationSort } from '../../types/Location'
import { IMedia } from '../../types/Media'
import { IUser } from '../../types/User'
import { IWaterbody } from '../../types/Waterbody'
import { useLocationStore } from '../../store/location/useLocationStore'
import { MapResource } from '../../types/navigation'

export const getLocationsQueryName = (type: LocationQuery, id?: number | undefined | null) => `Locations${type}${id}`

const GET_LOCATIONS = (type: LocationQuery, id?: number | undefined) => gql`
    query ${getLocationsQueryName(type, id)}(
        $type: LocationQuery!, 
        $id: Int, 
        $coordinates: Coordinates, 
        $limit: Int, 
        $offset: Int, 
        $sort: LocationSort
    ) {
        locations(
            type: $type, 
            id: $id, 
            coordinates: $coordinates, 
            limit: $limit, 
            offset: $offset, 
            sort: $sort
        ) {
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
                id
                url
            }
            map_image {
                id
                url
            }
            geom
            hexcolor
            created_at
            nearest_place
            total_favorites
            is_favorited
            is_saved
        }
    }
`;

export interface GetLocationsRes {
  locations: (Omit<ILocation, "user" | "waterbody"> & {
    user: Pick<IUser, "id" | "fullname" | "avatar">;
    waterbody: Pick<IWaterbody, "id" | "name">;
    media: Pick<IMedia, "url" | "id">[];
    map_image: Pick<IMedia, "url" | "id">
    total_favorites: number;
    is_favorited: boolean;
    is_saved: boolean
  })[];
}

interface Vars {
    type: LocationQuery,
    id?: number
    coordinates?: Coordinates,
    limit?: number
    offset?: number
    sort?: LocationSort
}
export const useGetLocations = ({ coordinates, ...args }: Vars) => {

    const storedCoordinates = useLocationStore(({ latitude, longitude }) => {
      if (!latitude || !longitude) return null;
      return { latitude, longitude };
    });

    return useQuery<GetLocationsRes, Vars>(GET_LOCATIONS(args.type, args.id), { 
        variables: {
            ...args,
            coordinates: coordinates ?
            coordinates : storedCoordinates ?
            storedCoordinates : undefined
        }
    })
}

export const locationMapResource = (type: MapResource) => {
    switch(type){
        case MapResource.UserLocations:
            return LocationQuery.User;
        case MapResource.WaterbodyLocations:
            return LocationQuery.Waterbody;
        case MapResource.UserSavedLocations:
            return LocationQuery.UserSaved;
        default:
            return LocationQuery.Waterbody;
    }
}

export const useLazyGetLocations = ({ coordinates, ...args}: Vars) => {

    const storedCoordinates = useLocationStore(({ latitude, longitude }) => {
      if (!latitude || !longitude) return null;
      return { latitude, longitude };
    });

    return useLazyQuery<GetLocationsRes, Vars>(GET_LOCATIONS(args.type, args.id), {
      variables: {
        ...args,
        coordinates: coordinates
          ? coordinates
          : storedCoordinates
          ? storedCoordinates
          : undefined,
      },
    });
}