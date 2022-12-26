import { gql, useMutation } from '@apollo/client'
import { IMedia, MediaInput } from '../../types/Media'

const UPLOAD_MEDIA = gql`
    mutation CatchMedia ($id: Int!, $media: [MediaInput!]!) {
        addCatchMedia(id: $id, media: $media) {
            id
            url
        }
    }
`

interface Variables {
    id: number,
    media: MediaInput[]
}

interface CatchMediaRes {
    addCatchMedia: Pick<IMedia, 'id' | 'url'>[]
}

export const useAddCatchMedia = () => useMutation<CatchMediaRes, Variables>(UPLOAD_MEDIA)