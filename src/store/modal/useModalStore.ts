import create from 'zustand'

export interface ModalStore {
    authVisible: boolean
    setAuthVisible: () => void
    reauthenticate: boolean
    setReauthenticate: () => void
    dismiss: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
    authVisible: false,
    setAuthVisible: () => set({ authVisible: true }),
    reauthenticate: false,
    setReauthenticate: () => set({ reauthenticate: true }),
    dismiss: () => set({
        authVisible: false,
        reauthenticate: false
    })
}))