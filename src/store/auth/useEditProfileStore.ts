import create from 'zustand'

interface EditProfileStore {
    firstName: string | undefined
    lastName: string | undefined
    city: string | undefined
    state: string | undefined
    bio: string | undefined
    setFirstName: (value?: string) => void
    setLastName: (value?: string) => void
    setState: (value?: string) => void
    setCity: (value?: string) => void
    setBio: (value?: string) => void
    reset: () => void
}

export const useEditProfileStore = create<EditProfileStore>((set) => ({
    firstName: undefined,
    lastName: undefined,
    state: undefined,
    city: undefined,
    bio: undefined,
    setFirstName: firstName => set({ firstName }),
    setLastName: lastName => set({ lastName }),
    setCity: city => set({ city }),
    setState: state => set({ state }),
    setBio: bio => set({ bio }),
    reset: () => set({
        firstName: undefined,
        lastName: undefined,
        state: undefined,
        city: undefined,
        bio: undefined
    })
}))