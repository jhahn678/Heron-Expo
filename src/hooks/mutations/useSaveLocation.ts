import { useMutation, gql, ApolloError } from "@apollo/client";

const SAVE_LOCATION = gql`
  mutation ToggleSaveLocation($id: Int!) {
    toggleSaveLocation(id: $id)
  }
`;

interface Vars {
    id: number
}

interface Args {
  onCompleted?: (data: { toggleSaveLocation: boolean }) => void;
  onError?: (err: ApolloError) => void;
}

export const useSaveLocation = (args?: Args) => {
    return useMutation<{ toggleSaveLocation: boolean }, Vars>(SAVE_LOCATION, {
      onCompleted: data => {
        if(args?.onCompleted) args.onCompleted(data)
      },
      onError: err => {
        if(args?.onError) args.onError(err)
      },
      update: (cache, { data }, { variables }) => {
        if (data && variables){
            cache.writeFragment({
              id: `Location:${variables.id}`,
              fragment: gql`
                fragment updatedLocation on Location {
                  is_saved
                }
              `,
              data: {
                is_saved: data.toggleSaveLocation
              }
            });
        }
      },
    });
}