import create from 'zustand'

export interface ModalStore {
    authVisible: boolean
    setAuthVisible: () => void
    dismiss: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
    authVisible: false,
    setAuthVisible: () => set({ authVisible: true }),
    dismiss: () => set({
        authVisible: false
    })
}))