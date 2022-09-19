import { useApolloClient, useQuery, gql } from "@apollo/client";
import { ILocation } from "../../types/Location";
import { IMedia } from "../../types/Media";
import { IUser } from "../../types/User";
import { IWaterbody } from "../../types/Waterbody";

const GET_LOCATION = gql`
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
      geom
      hexcolor
      created_at
      nearest_geoplace
      total_favorites
      is_favorited
      is_saved
    }
  }
`;

export interface GetLocationRes {
  location: Omit<ILocation, "user" | "waterbody"> & {
    waterbody: Pick<IWaterbody, "id" | "name">;
    user: Pick<IUser, "id" | "fullname" | "avatar">;
    media: Pick<IMedia, "url" | "id">[]
    total_favorites: number;
    is_favorited: boolean;
    is_saved: boolean
  };
}

interface Vars {
    id: number
}

export const useGetLocation = (variables: Vars) => {
    return useQuery<GetLocationRes, Vars>(GET_LOCATION, { variables })
}

export const useLazyGetLocation = (variables: Vars) => {
    return useQuery<GetLocationRes, Vars>(GET_LOCATION, { variables })
}

export const useGetLocationFragment = () => {
    const client = useApolloClient()

    return  (id: number | undefined) => {
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
                url
              }
              geom
              hexcolor
              created_at
              nearest_geoplace
              total_favorites
              is_favorited
              is_saved
            }
          `,
        });
    }
}