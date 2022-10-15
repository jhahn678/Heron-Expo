import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useLocationStore } from '../../store/location/useLocationStore'
import { CatchQuery, CatchSort, ICatch } from '../../types/Catch'
import { IMedia } from '../../types/Media'
import { MapResource } from '../../types/navigation'
import { IUser } from '../../types/User'
import { IWaterbody } from '../../types/Waterbody'

export const getCatchesQueryName = (type: CatchQuery, id?: number | undefined) => `Catches${type}${id}`

export const GET_CATCHES = (type: CatchQuery, id?: number | undefined) => gql`
    query ${getCatchesQueryName(type, id)}(
      $id: Int
      $type: CatchQuery!
      $offset: Int
      $limit: Int
      $sort: CatchSort
      $coordinates: Coordinates
      $within: Int
    ) {
      catches(
        id: $id
        type: $type
        offset: $offset
        limit: $limit
        sort: $sort
        within: $within
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
        media{
          id
          url
        }
        map_image {
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
    }`
export interface GetCatchesRes {
  catches: (Omit<ICatch, "updated_at" | "user" | "waterbody"> & {
    waterbody: Pick<IWaterbody, "id" | "name">;
    user: Pick<IUser, "id" | "fullname" | "avatar">;
    media: Pick<IMedia, "url" | "id">[];
    map_image?: Pick<IMedia, "url" | "id">
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
    },
    within?: number
}

export const useGetCatches = ({ coordinates, ...args }: Vars) => {

    const [skip, setSkip] = useState(true)

    const storedCoordinates = useLocationStore(({ latitude, longitude }) => {
      if (!latitude || !longitude) return null;
      return { latitude, longitude };
    });

    useEffect(() => {
      switch(args.type){
        case CatchQuery.User:
          return setSkip(!Boolean(args.id)) //If no ID, skip query
        case CatchQuery.Waterbody:
          return setSkip(!Boolean(args.id)) //If no ID, skip query
        case CatchQuery.Coordinates:
          return setSkip(!Boolean(storedCoordinates || coordinates)) //If no coords available, skip query
        case CatchQuery.Following:
          return setSkip(false)
      }
    }, [args.type, args.id]);
    

    return useQuery<GetCatchesRes, Vars>(GET_CATCHES(args.type, args.id), {
      skip,
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

export const useLazyGetCatches = ({ coordinates, ...args }: Vars) => {

  const storedCoordinates = useLocationStore(({ latitude, longitude }) => {
    if(!latitude || !longitude) return null;
    return { latitude, longitude };
  });

  return useLazyQuery<GetCatchesRes, Vars>(GET_CATCHES(args.type, args.id), {
    variables: {
      ...args,
      coordinates: coordinates 
        ? coordinates 
        : storedCoordinates 
        ? storedCoordinates 
        : undefined
    }
  });
};