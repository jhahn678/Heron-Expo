import { useMutation, gql, ApolloError } from "@apollo/client";
import { G } from "react-native-svg";
import { useAuth } from "../../store/auth/useAuth";
import { LocationQuery } from "../../types/Location";
import { makeFragmentId } from "../../utils/makeFragmentId";
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
            fragment Location${makeFragmentId()} on Location {
              is_saved
            }
          `,
          data: {
            is_saved: data.toggleSaveLocation
          }
        });
        cache.updateFragment({
          id: `User:${user}`,
          fragment: gql`
            fragment User${makeFragmentId()} on User{
              total_saved_locations
            }
          `
        }, res => ({
          ...res,
          total_saved_locations: data.toggleSaveLocation ?
            res.total_saved_locations + 1 :
            res.total_saved_locations - 1
        })
      )}
    },
    refetchQueries: [`${getLocationsQueryName(LocationQuery.UserSaved, user)}`]
  });
}