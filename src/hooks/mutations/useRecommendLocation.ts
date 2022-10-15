import { useMutation, gql, ApolloError, DocumentNode } from "@apollo/client";
import uuid from 'react-native-uuid'
import { makeFragmentId } from "../../utils/makeFragmentId";

const RECOMMEND_LOCATION = gql`
  mutation ToggleFavoriteLocation($id: Int!) {
    toggleFavoriteLocation(id: $id)
  }
`;

interface Vars {
    id: number
}

interface Args {
  onCompleted?: (data: { toggleFavoriteLocation: boolean }) => void;
  onError?: (err: ApolloError) => void;
}

interface CacheUpdate {
  is_favorited: boolean, 
  total_favorites?: number
}

export const useRecommendLocation = (args?: Args) => {
    return useMutation<{ toggleFavoriteLocation: boolean }, Vars>(RECOMMEND_LOCATION, {
      onCompleted: (data) => {
        if (args && args.onCompleted) args.onCompleted(data);
      },
      onError: (err) => {
        console.error(err)
        if (args && args.onError) args.onError(err);
      },
      update: (cache, { data }, { variables }) => {
        if(data && variables?.id){
          cache.writeFragment({
            id: `Location:${variables.id}`,
            data: { is_favorited: data.toggleFavoriteLocation },
            fragment: gql`
              fragment Location${makeFragmentId()} on Location { 
                is_favorited
              }
            `
          })
        }
      }
    });
}