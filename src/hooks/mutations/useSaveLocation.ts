import { useMutation, gql, ApolloError } from "@apollo/client";
import { useAuth } from "../../store/auth/useAuth";
import { LocationQuery } from "../../types/Location";
import { getLocationsQueryName } from "../queries/useGetLocations";
import { GET_MY_PROFILE_TOTALS } from "../queries/useGetMyProfile";

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

  const user = useAuth(store => store.id)

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
              fragment updatedLocation${variables.id} on Location {
                is_saved
              }
            `,
            data: {
              is_saved: data.toggleSaveLocation
            }
          });
      }
    },
    refetchQueries: [
      { query: GET_MY_PROFILE_TOTALS },
      `${getLocationsQueryName(LocationQuery.UserSaved, user)}`
    ]
  });
}