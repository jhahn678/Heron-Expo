import { gql, useMutation } from '@apollo/client'
import { useAuth } from '../../store/auth/useAuth'
import { MediaType } from '../../types/Media'
import { makeFragmentId } from '../../utils/makeFragmentId'

const DELETE_IMAGE = gql`
mutation DeleteMedia($id: Int!, $type: MediaType!) {
  deleteMedia(id: $id, type: $type) {
    ... on CatchMedia {
        id
        user {
            id
        }
    }
    ... on WaterbodyMedia {
        id
        user {
            id
        }
    }
    ... on LocationMedia {
        id
        user {
            id
        }
    }
    ... on AnyMedia {
        id
        user {
            id
        }
    }
  }
}
`

interface Res {
    deleteMedia: {
        id: number
        user: {
            id: number
        }
    }
}

interface Vars {
    id: number
    type: MediaType
}

export const useDeleteImage = () => {
    const auth = useAuth(store => store.id)
    return useMutation<Res, Vars>(DELETE_IMAGE, {
        update: (cache) => {
            cache.updateFragment({
               id: `User:${auth}`,
               fragment: gql`
                fragment User${makeFragmentId()} on User{
                    total_media
                }
               `,
            }, data => ({ 
                ...data, 
                total_media: data ? data.total_media - 1 : 0
            }))
        }
    })
}