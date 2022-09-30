import create from 'zustand'
import { mapErrorTypeToDetails, ErrorType } from '../../utils/mapErrorTypeToDetails'
import { mapSuccessTypeToDetails, SuccessType } from '../../utils/mapSuccessTypeToDetails'

export interface Details {
    message: string | null
    title: string | null
}


export interface ModalStore {
    auth: boolean
    setAuth: (value?: boolean) => void
    reauthenticate: boolean
    setReauthenticate: (value?: boolean) => void
    confirmUpload: boolean
    confirmUploadWaterbody: number | null
    setConfirmUpload: (waterbody: number | null, value?: boolean) => void
    success: boolean,
    successTitle: string | null
    successMessage: string | null
    setSuccess: (value?: boolean, type?: SuccessType) => void
    error: boolean,
    errorMessage: string | null
    errorTitle: string | null
    setError: (value?: boolean, type?: ErrorType) => void
    review: boolean,
    reviewWaterbody: number | null
    setReview: (waterbody: number | null, value?: boolean) => void
    snack: boolean,
    snackText: string | null,
    setSnack: (value: string | false) => void
    logout: boolean,
    onLogoutGoBack: boolean
    setLogout: (args: { visible: boolean, onLogoutGoBack?: boolean }) => void
    dismiss: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
    auth: false,
    setAuth: (value=true) => set({ auth: value }),
    reauthenticate: false,
    setReauthenticate: (value=true) => set({ reauthenticate: value }),
    confirmUpload: false,
    confirmUploadWaterbody: null,
    setConfirmUpload: (waterbody, value=true) => set({ 
        confirmUpload: value,
        confirmUploadWaterbody: waterbody
    }),
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
    review: false,
    reviewWaterbody: null,
    setReview: (waterbody, value=true) => set({ 
        review: value, 
        reviewWaterbody: waterbody 
    }),
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
    dismiss: () => {
        set({
            auth: false,
            error: false,
            review: false,
            logout: false,
            success: false,
            confirmUpload: false,
            reauthenticate: false,
        })
        set({
            errorTitle: null,
            successTitle: null,
            errorMessage: null,
            successMessage: null,
            reviewWaterbody: null,
            onLogoutGoBack: false,
            confirmUploadWaterbody: null,
        })
    }
}))