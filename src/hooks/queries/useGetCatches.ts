import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { useLocationStore } from '../../store/location/useLocationStore'
import { CatchQuery, CatchSort, ICatch } from '../../types/Catch'
import { IMedia } from '../../types/Media'
import { MapResource } from '../../types/navigation'
import { IUser } from '../../types/User'
import { IWaterbody } from '../../types/Waterbody'

const GET_CATCHES = gql`
  query Catches(
    $id: Int
    $type: CatchQuery!
    $offset: Int
    $limit: Int
    $sort: CatchSort
    $coordinates: Coordinates
    $mediaLimit: Int
  ) {
    catches(
      id: $id
      type: $type
      offset: $offset
      limit: $limit
      sort: $sort
      coordinates: $coordinates
    ) {
      id
      created_at
      species
      title
      waterbody {
        id
        name
      }
      user {
        id
        fullname
        avatar
      }
      media(limit: $mediaLimit) {
        id
        url
      }
      geom
      description
      length
      weight
      rig
      total_favorites
      is_favorited
    }
  }
`;

export interface GetCatchesRes {
  catches: (Omit<ICatch, "updated_at" | "user" | "waterbody"> & {
    waterbody: Pick<IWaterbody, "id" | "name">;
    user: Pick<IUser, "id" | "fullname" | "avatar">;
    media: Pick<IMedia, "url" | "id">[];
    total_favorites: number;
    is_favorited: boolean;
  })[];
}

export interface Vars {
    type: CatchQuery,
    id?: number
    offset?: number
    limit?: number
    sort?: CatchSort
    coordinates?: {
        latitude: number
        longitude: number
    }
    mediaLimit?: number
}

interface Args extends Omit<Vars, 'queryLocation'>{
    withinMeters?: number
}

export const useGetCatches = ({ coordinates, mediaLimit, ...args }: Args) => {

    const storedCoordinates = useLocationStore(({ latitude, longitude }) => {
      if (!latitude || !longitude) return null;
      return { latitude, longitude };
    });

    return useQuery<GetCatchesRes, Vars>(GET_CATCHES, {
      variables: {
        ...args,
        mediaLimit: mediaLimit ? mediaLimit : 1,
        coordinates: coordinates
          ? coordinates
          : storedCoordinates
          ? storedCoordinates
          : undefined,
      },
    });
}

export const catchMapResource = (resource: MapResource): CatchQuery => {
    switch(resource){
        case MapResource.UserCatches:
            return CatchQuery.User;
        case MapResource.WaterbodyCatches:
            return CatchQuery.Waterbody;
        case MapResource.CatchesNearby:
            return CatchQuery.Coordinates;
        default:
            return CatchQuery.Coordinates
    }
} 

export const useLazyGetCatches = ({ coordinates, mediaLimit, ...args }: Args) => {

  const storedCoordinates = useLocationStore(({ latitude, longitude }) => {
    if(!latitude || !longitude) return null;
    return { latitude, longitude };
  });

  return useLazyQuery<GetCatchesRes, Vars>(GET_CATCHES, {
    variables: {
      ...args,
      mediaLimit: mediaLimit ? mediaLimit : 1,
      coordinates: coordinates 
        ? coordinates 
        : storedCoordinates 
        ? storedCoordinates 
        : undefined
    }
  });
};