import create from 'zustand'

export interface ModalStore {
    auth: boolean
    setAuth: (value?: boolean) => void
    reauthenticate: boolean
    setReauthenticate: (value?: boolean) => void
    confirmUpload: boolean
    confirmUploadWaterbody: number | null
    setConfirmUpload: (waterbody: number | null, value?: boolean) => void
    uploadPartialSuccess: boolean,
    setUploadPartialSuccess: (value?: boolean) => void
    uploadSuccess: boolean,
    setUploadSuccess: (value?: boolean) => void
    error: boolean,
    setError: (value?: boolean) => void
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
    uploadPartialSuccess: false,
    setUploadPartialSuccess: (value=true) => set({ uploadPartialSuccess: value }),
    uploadSuccess: false,
    setUploadSuccess: (value=true) => set({ uploadSuccess: value }),
    error: false,
    setError:  (value=true) => set({ error: value }),
    dismiss: () => set({
        auth: false,
        reauthenticate: false,
        confirmUpload: false,
        confirmUploadWaterbody: null,
        uploadPartialSuccess: false,
        uploadSuccess: false,
        error: false
    })
}))