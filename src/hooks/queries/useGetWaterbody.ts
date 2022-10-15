import { gql, useQuery, useLazyQuery, useApolloClient } from '@apollo/client'
import { CatchSort } from '../../types/Catch'
import { IMedia } from '../../types/Media'
import { IWaterbody } from '../../types/Waterbody'

export const WATERBODY_MEDIA_LIMIT = 6

export const GET_WATERBODY = gql`
  query Waterbody($id: Int!, $mediaLimit: Int) {
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
        is_saved
        media(limit: $mediaLimit) {
            id
            url
        }
    }
  }
`

export interface GetWaterbody extends Omit<IWaterbody, "oid" | "weight"> {
  total_catches: number;
  total_species: number;
  total_locations: number;
  total_media: number;
  total_reviews: number;
  average_rating: number | null;
  is_saved: boolean;
  media: Pick<IMedia, "url" | "id">[];
}

export interface GetWaterbodyRes {
    waterbody: GetWaterbody
}

export interface GetWaterbodyVars {
    id: number,
    mediaLimit?: number
    sort?: CatchSort
}

export const useGetWaterbody = (id: number) => {
    const result = useQuery<GetWaterbodyRes>(GET_WATERBODY, {
      variables: { id, mediaLimit: WATERBODY_MEDIA_LIMIT },
      skip: !Boolean(id)
    })
    return result;
}

export const useLazyGetWaterbody = () => {
    const result = useLazyQuery<GetWaterbodyRes, GetWaterbodyVars>(GET_WATERBODY)
    return result;
}

export const useGetWaterbodyFragment = () => {
    const client = useApolloClient();
    return (id: number | undefined | null) => {
        if(!id) return null;
        return client.readFragment<GetWaterbodyRes["waterbody"]>({
          id: `Waterbody:${id}`,
          fragment: gql`
            fragment CachedWaterbody on Waterbody {
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
              is_saved
              media {
                id
                url
              }
            }
          `,
        });
    }
}

export type WaterbodyLocation = Pick<
  IWaterbody, 
  | 'id' 
  | 'name'
  | 'ccode'
  | 'country'
  | 'subregion'
  | "admin_one"
  | "admin_two"
>

export const useGetWaterbodyLocationFragment = () => {
    const client = useApolloClient();
    return (id: number | undefined | null) => {
      if(!id) return null;
      return client.readFragment<WaterbodyLocation>({
        id: `Waterbody:${id}`,
        fragment: gql`
          fragment WaterbodyLocation${id} on Waterbody {
            id
            name
            country
            admin_one
            admin_two
            ccode
            subregion
          }
        `,
      });
    }
}