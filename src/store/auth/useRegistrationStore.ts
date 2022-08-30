import create from 'zustand'

interface RegistrationStore {
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    username: string,
    setFirstName: (firstName: string) => void,
    setLastName: (lastName: string) => void,
    setPassword: (password: string) => void,
    setEmail: (email: string) => void,
    setUsername: (username: string) => void,
    reset: () => void
}

export const useRegistrationStore = create<RegistrationStore>((set) => ({
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    username: '',
    setFirstName: firstName => set({ firstName }),
    setLastName: lastName => set({ lastName }),
    setPassword: password => set({ password }),
    setEmail: email => set({ email }),
    setUsername: username => set({ username }),
    reset: () => set({
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        username: ''
    })
}))