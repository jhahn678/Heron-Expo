import { gql, useMutation } from '@apollo/client'
import { MediaInput, WaterbodyMedia } from '../../types/Media'
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
    return useMutation<Response, Variables>(ADD_WATERBODY_MEDIA, {
        refetchQueries: [
            { query: GET_WATERBODY, variables: { id, mediaLimit: WATERBODY_MEDIA_LIMIT } }
        ]
    })
}
