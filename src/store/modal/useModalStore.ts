import create from 'zustand'
import { mapErrorTypeToDetails, ErrorType } from '../../utils/mapErrorTypeToDetails'
import { mapSuccessTypeToDetails, SuccessType } from '../../utils/mapSuccessTypeToDetails'

export interface Details {
    message: string | null
    title: string | null
}

interface ManageContactsArgs {
    user: number, 
    name: string | null, 
    username: string
}


export interface ModalStore {
    auth: boolean
    setAuth: (value?: boolean) => void
    reauthenticate: boolean
    setReauthenticate: (value?: boolean) => void
    success: boolean,
    successTitle: string | null
    successMessage: string | null
    setSuccess: (value?: boolean, type?: SuccessType) => void
    error: boolean,
    errorMessage: string | null
    errorTitle: string | null
    setError: (value?: boolean, type?: ErrorType) => void
    loading: boolean
    setLoading: (value?: boolean) => void
    snack: boolean,
    snackText: string | null,
    setSnack: (value: string | false) => void
    logout: boolean,
    onLogoutGoBack: boolean
    setLogout: (args: { visible: boolean, onLogoutGoBack?: boolean }) => void
    manageContact: boolean
    manageContactUser: number | null,
    manageContactName: string | null,
    manageContactUsername: string | null,
    setManageContact: (args: ManageContactsArgs | false) => void
    dismiss: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
    auth: false,
    setAuth: (value=true) => set({ auth: value }),
    reauthenticate: false,
    setReauthenticate: (value=true) => set({ reauthenticate: value }),
    success: false,
    successMessage: null,
    successTitle: null,
    setSuccess: (value=true, type) => {
        const { message, title } = mapSuccessTypeToDetails(type)
        set({ success: value, successMessage: message, successTitle: title})
    },
    error: false,
    errorMessage: null,
    errorTitle: null,
    setError:  (value=true, type) => {
        const { message, title } = mapErrorTypeToDetails(type);
        set({ error: value, errorMessage: message, errorTitle: title })
    },
    loading: false,
    setLoading: loading => set({ loading }), 
    snack: false,
    snackText: null,
    setSnack: value => set({
        snack: value ? true: false, 
        snackText: value ? value : null  
    }),
    logout: false,
    onLogoutGoBack: false,
    setLogout: ({ visible, onLogoutGoBack }) => set({ 
        logout: visible,
        onLogoutGoBack: Boolean(onLogoutGoBack)
    }),
    manageContact: false,
    manageContactUser: null,
    manageContactName: null,
    manageContactUsername: null,
    setManageContact: (args) => set({
        manageContact: args ? true : false,
        manageContactName: args ? args.name : null,
        manageContactUser: args ? args.user : null,
        manageContactUsername: args ? args.username: null,
    }),
    dismiss: () => {
        set({
            auth: false,
            error: false,
            logout: false,
            success: false,
            reauthenticate: false,
            manageContact: false
        })
        set({
            errorTitle: null,
            successTitle: null,
            errorMessage: null,
            successMessage: null,
            onLogoutGoBack: false,
            manageContactName: null,
            manageContactUser: null,
            manageContactUsername: null,
        })
    }
}))