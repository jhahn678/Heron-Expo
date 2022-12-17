import { LinkedAccount } from "../../../types/User"

export type UnlinkAccountAction = 
| { type: "SHOW", values: Omit<UnlinkAccountState, "visible"> }
| { type: "DISMISS" }

export interface UnlinkAccountState {
    visible: boolean
    accountType: LinkedAccount | null
    refetchCallback: (() => void) | null
}

export const initialState: UnlinkAccountState = {
    visible: false,
    accountType: null,
    refetchCallback: null
}

export const reducer = (state: UnlinkAccountState, action: UnlinkAccountAction): UnlinkAccountState => {
    if(action.type === 'SHOW'){
        const { accountType, refetchCallback } = action.values;
        return {
            visible: true,
            accountType,
            refetchCallback
        }
    }else if(action.type === 'DISMISS'){
        return {
            visible: false,
            accountType: null,
            refetchCallback: null
        }   
    }
    return { ...state }
}