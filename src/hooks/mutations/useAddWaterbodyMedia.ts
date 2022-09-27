import { gql, useMutation } from '@apollo/client'
import { MediaInput, WaterbodyMedia } from '../../types/Media'

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

export const useAddWaterbodyMediaMutation = () => {
    const result = useMutation<Response, Variables>(ADD_WATERBODY_MEDIA)
    return result
}
