import { ApolloError, gql, useMutation } from '@apollo/client'
import { makeFragmentId } from '../../utils/makeFragmentId';

const FAVORITE_CATCH = gql`
  mutation ToggleSaveLocation($id: Int!) {
    toggleFavoriteCatch(id: $id)
  }
`;

interface Args {
  onCompleted?: (data: Res) => void;
  onError?: (err: ApolloError) => void;
}

interface Vars {
    id: number
}

interface Res {
  toggleFavoriteCatch: boolean;
}

export const useFavoriteCatch = (args?: Args) => {
    return useMutation<Res, Vars>(FAVORITE_CATCH, {
      onCompleted: (data) => {
        if (args && args.onCompleted) args.onCompleted(data);
      },
      onError: (err) => {
        if (args && args.onError) args.onError(err);
      },
      update: (cache, { data }, { variables }) => {
        if(data && variables?.id){
          cache.writeFragment({
            id: `Catch:${variables.id}`,
            fragment: gql`
              fragment Catch${makeFragmentId()} on Catch{
                is_favorited
              }
            `,
            data: {
              is_favorited: data.toggleFavoriteCatch
            }
          })
        }
      }
    });
}