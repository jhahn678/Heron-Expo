import create from 'zustand'

interface RegistrationStore {
    firstname: string,
    lastname: string,
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
    firstname: '',
    lastname: '',
    password: '',
    email: '',
    username: '',
    setFirstName: firstname => set({ firstname }),
    setLastName: lastname => set({ lastname }),
    setPassword: password => set({ password }),
    setEmail: email => set({ email }),
    setUsername: username => set({ username }),
    reset: () => set({
        firstname: '',
        lastname: '',
        password: '',
        email: '',
        username: ''
    })
}))