import { gql, useMutation } from '@apollo/client'

const SAVE_WATERBODY = gql`
    mutation ToggleSaveWaterbody($id: Int!) {
        toggleSaveWaterbody(id: $id)
    }
`

interface UseSaveWaterbodyArgs {
    id: number | undefined
    onCompleted?: () => void
    onError?: () => void
}

export const useSaveWaterbodyMutation = ({ id, onCompleted, onError }: UseSaveWaterbodyArgs) => {
    const result = useMutation(SAVE_WATERBODY, {
        variables: { id },
        onCompleted,
        onError
    })
    return result;
}