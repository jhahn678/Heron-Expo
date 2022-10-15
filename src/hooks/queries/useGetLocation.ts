import { useApolloClient, useQuery, gql, useLazyQuery } from "@apollo/client";
import { ILocation } from "../../types/Location";
import { IMedia } from "../../types/Media";
import { IUser } from "../../types/User";
import { IWaterbody } from "../../types/Waterbody";

export const GET_LOCATION = gql`
  query Location($id: Int!) {
    location(id: $id) {
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

export interface GetLocationRes {
  location: Omit<ILocation, "user" | "waterbody" | 'map_image'> & {
    waterbody: Pick<IWaterbody, "id" | "name">;
    user: Pick<IUser, "id" | "fullname" | "avatar">;
    media: Pick<IMedia, "url" | "id">[]
    map_image: Pick<IMedia, "url" | "id">
    nearest_place: string
    total_favorites: number;
    is_favorited: boolean;
    is_saved: boolean
  };
}

interface Vars {
    id: number
}

export const useGetLocation = (variables: Vars) => useQuery<GetLocationRes, Vars>(GET_LOCATION, { variables })

export const useLazyGetLocation = () => useLazyQuery<GetLocationRes, Vars>(GET_LOCATION)

export const useGetLocationFragment = () => {
    const client = useApolloClient()

    return (id: number | undefined) => {
        if(!id) return null;
        return client.readFragment<GetLocationRes["location"]>({
          id: `Location:${id}`,
          fragment: gql`
            fragment CachedLocation on Location {
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
          `,
        });
    }
}