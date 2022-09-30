import { gql, useMutation } from '@apollo/client'
import { useAuth } from '../../store/auth/useAuth'

const CHANGE_AVATAR = gql`
mutation Mutation($avatar: MediaInput!) {
  updateUserAvatar(avatar: $avatar)
}
`

export interface UseChangeAvatarRes {
    updateUserAvatar: string | null
}

interface Vars {
    avatar: {
        url: string
        key: string
    }
}

export const useChangeAvatar = () => {
    const { setDetails } = useAuth()
    return useMutation<UseChangeAvatarRes, Vars>(CHANGE_AVATAR, {
        onCompleted: ({ updateUserAvatar }) => setDetails({ 
            avatar: updateUserAvatar || undefined
        })
    })
}