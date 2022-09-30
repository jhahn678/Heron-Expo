import { gql, useMutation } from '@apollo/client'
import { useAuth } from '../../store/auth/useAuth'
import { IUser } from '../../types/User'
import { GET_MY_PROFILE, GET_MY_PROFILE_TOTALS } from '../queries/useGetMyProfile'

const EDIT_PROFILE = gql`
mutation Mutation($details: UserDetails!) {
  updateUserDetails(details: $details) {
    id
    firstname
    lastname
    fullname
    bio
    city
    state
    location
  }
}
`

export type EditProfileRes = { updateUserDetails: Pick<
    IUser, 
    | 'id' 
    | 'firstname' 
    | 'lastname'
    | 'fullname'
    | 'bio'
    | 'city'
    | 'state'
    | 'location'
> }

export interface EditProfileVars {
    details: {
        firstname?: string | undefined | null
        lastname?: string | undefined | null
        city?: string | undefined | null
        state?: string | undefined | null
        bio?: string | undefined | null
    }
}

export const useEditProfile = () => {

    const { setDetails } = useAuth()

    return useMutation<EditProfileRes, EditProfileVars>(EDIT_PROFILE, {
        refetchQueries: [{ query: GET_MY_PROFILE }, { query: GET_MY_PROFILE_TOTALS }],
        onCompleted: ({ updateUserDetails: { firstname }}) => {
            setDetails({ firstname })
        }
    })
}