import { useMutation, gql, ApolloError } from "@apollo/client";

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

export const useRecommendLocation = (args?: Args) => {
    return useMutation<{ toggleFavoriteLocation: boolean }, Vars>(RECOMMEND_LOCATION, {
      onCompleted: (data) => {
        if (args && args.onCompleted) args.onCompleted(data);
      },
      onError: (err) => {
        if (args && args.onError) args.onError(err);
      },
      update: (cache, { data }, { variables }) => {
        if(data && variables?.id){
          cache.writeFragment({
            id: `Location:${variables.id}`,
            fragment: gql`
                fragment UpdatedLocation${variables.id} on Location {
                    is_favorited
                }
            `,
            data: {
                is_favorited: data.toggleFavoriteLocation
            }
          })
        }
      }
    });
}