import { gql, useMutation } from '@apollo/client'
import { makeFragmentId } from '../../utils/makeFragmentId'

const SAVE_WATERBODY = gql`
    mutation ToggleSaveWaterbody($id: Int!) {
        toggleSaveWaterbody(id: $id)
    }
`

interface Vars {
    id: number
}

interface Res {
    toggleSaveWaterbody: boolean
}

interface UseSaveWaterbodyArgs {
    onCompleted?: (data: Res) => void
    onError?: () => void
}

export const useSaveWaterbodyMutation = ({ onCompleted, onError }: UseSaveWaterbodyArgs) => {
    return useMutation<Res, Vars>(SAVE_WATERBODY, {
        onCompleted,
        onError,
        update: (cache, { data }, { variables }) => {
            if(data && variables?.id){
                cache.writeFragment({
                    id: `Waterbody:${variables.id}`,
                    data: { is_saved: data.toggleSaveWaterbody },
                    fragment: gql`
                        fragment Waterbody${makeFragmentId()} on Waterbody { 
                            is_saved
                        }
                    `
                })
            }
        }
    })
}