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
        url
      }
      geom
      hexcolor
      created_at
      nearest_geoplace
    }
  }
`;

interface GetLocationRes extends Omit<ILocation, 'user' | 'waterbody'>{
    waterbody: Pick<IWaterbody, 'id' | 'name'>
    user: Pick<IUser, 'id' | 'fullname' | 'avatar'>
    media: Pick<IMedia, 'url'>[]
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
        return client.readFragment<GetLocationRes>({
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
            }
            `,
        })
    }
}