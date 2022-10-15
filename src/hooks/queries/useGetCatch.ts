import { useQuery, gql, useApolloClient, useLazyQuery } from '@apollo/client'
import { ICatch } from '../../types/Catch';
import { IMedia } from '../../types/Media';
import { IUser } from '../../types/User';
import { IWaterbody } from '../../types/Waterbody';

export const GET_CATCH = gql`
  query Catch($id: Int!) {
    catch(id: $id) {
      id
      user {
        id
        fullname
        avatar
      }
      waterbody {
        id
        name
      }
      geom
      title
      description
      species
      length
      media {
        id
        url
      }
      map_image {
        id
        url
      }
      created_at
      total_favorites
      is_favorited
      weight
      rig
    }
  }
`;


export interface GetCatchRes {
  catch: Omit<ICatch, "user" | "waterbody"> & {
    user: Pick<IUser, "id" | "fullname" | "avatar">;
    waterbody: Pick<IWaterbody, "id" | "name">;
    media: Pick<IMedia, "url" | 'id'>[];
    map_image?: Pick<IMedia, "url" | 'id'>
    total_favorites: number
    is_favorited: boolean
  };
}

interface Vars {
    id: number
}

export const useGetCatchQuery = (variables: Vars) => {
    return useQuery<GetCatchRes, Vars>(GET_CATCH, { variables })
}

export const useLazyGetCatch = () => {
  return useLazyQuery<GetCatchRes, Vars>(GET_CATCH);
};

export const useGetCatchFragment = () => {
  const client = useApolloClient();
  return (id: number | undefined | null) => {
    if (!id) return null;
    return client.readFragment<GetCatchRes["catch"]>({
      id: `Catch:${id}`,
      fragment: gql`
        fragment CachedCatch${id} on Catch {
          id
          geom
          title
          description
          species
          length
          weight
          rig
          created_at
          total_favorites
          is_favorited
          user {
            id
            fullname
            avatar
          }
          waterbody {
            id
            name
          }
          media{
            id
            url
          }
          map_image {
            id
            url
          }
        }
      `
    });
  }
}; 