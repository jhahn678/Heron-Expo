import { useQuery, gql, useApolloClient, useLazyQuery } from '@apollo/client'
import { ICatch } from '../../types/Catch';
import { IMedia } from '../../types/Media';
import { IUser } from '../../types/User';
import { IWaterbody } from '../../types/Waterbody';

const GET_CATCH = gql`
    query Catch($id: Int!) {
        catch(id: $id) {
            id
            geom
            title
            description
            species
            length
            weight
            rig
            created_at
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
        }
    }
`;


export const useGetCatchFragment = () => (id: number | undefined) => {
  if (!id) return null;
  return useApolloClient().readFragment<GetCatchRes>({
    id: `Catch:${id}`,
    fragment: gql`
      fragment CachedCatch on Catch {
        id
        geom
        title
        description
        species
        length
        weight
        rig
        created_at
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
      }
    `,
  });
} 

interface GetCatchRes extends Omit<ICatch, 'user' | 'waterbody'> {
    user: Pick<IUser, 'id' | 'fullname' | 'avatar'>
    waterbody: Pick<IWaterbody, 'id' | 'name'>
    media: Pick<IMedia, 'url'>[]
}

interface Vars {
    id: number
}

export const useGetCatchQuery = (variables: Vars) => {
    return useQuery<GetCatchRes, Vars>(GET_CATCH, { variables })
}

export const useLazyGetCatch = (variables: Vars) => {
  return useLazyQuery<GetCatchRes, Vars>(GET_CATCH, { variables });
};
