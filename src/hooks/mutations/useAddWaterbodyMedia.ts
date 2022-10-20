import { gql, useMutation } from '@apollo/client'
import { useAuth } from '../../store/auth/useAuth'
import { MediaInput, WaterbodyMedia } from '../../types/Media'
import { makeFragmentId } from '../../utils/makeFragmentId'
import { GET_WATERBODY, WATERBODY_MEDIA_LIMIT } from '../queries/useGetWaterbody'

const ADD_WATERBODY_MEDIA = gql`
    mutation WaterbodyMedia($id: Int!, $media: [MediaInput!]!) {
        addWaterbodyMedia(id: $id, media: $media) {
            id
            url
        }
    }
`

interface Variables {
    id: number,
    media: MediaInput[]
}

interface Response {
    addWaterbodyMedia: Pick<WaterbodyMedia, 'id' | 'url'>[]
}

export const useAddWaterbodyMediaMutation = (id: number | undefined | null) => {
    const auth = useAuth(store => store.id)
    return useMutation<Response, Variables>(ADD_WATERBODY_MEDIA, {
        refetchQueries: [
            { query: GET_WATERBODY, variables: { id, mediaLimit: WATERBODY_MEDIA_LIMIT } }
        ],
        update: (cache) => {
            cache.updateFragment({
               id: `User:${auth}`,
               fragment: gql`
                fragment User${makeFragmentId()} on User{
                    total_media
                }
               `,
            }, data => {
                return { 
                    ...data, 
                    total_media: data ? data.total_media + 1 : 1
                }
            })
        }
    })
}
