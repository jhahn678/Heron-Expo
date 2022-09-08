import create from 'zustand'

export interface ModalStore {
    auth: boolean
    setAuth: (value?: boolean) => void
    reauthenticate: boolean
    setReauthenticate: (value?: boolean) => void
    confirmUpload: boolean
    setConfirmUpload: (value?: boolean) => void
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
    setConfirmUpload: (value=true) => set({ confirmUpload: value }),
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
        uploadPartialSuccess: false,
        uploadSuccess: false,
        error: false
    })
}))