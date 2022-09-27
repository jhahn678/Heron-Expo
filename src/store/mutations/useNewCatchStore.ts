import create from 'zustand'
import uuid from 'react-native-uuid'

export interface NewCatchStore {
    title: string | undefined
    description: string | undefined
    waterbody: number | undefined
    coordinates: [number, number] | undefined
    mapSnapshot: { uri: string, id: string } | undefined
    weight: number | undefined
    length: number | undefined
    species: string | undefined
    rig: string | undefined
    media: { url: string, key: string }[] | undefined
    setTitle: (value?: string) => void
    setDescription: (value?: string) => void
    setWaterbody: (value?: number) => void
    setCoordinates: (value?: [number, number]) => void
    setMapSnapshot: (value?: string) => void
    setWeight: (value?: number) => void
    setLength: (value?: number) => void
    setSpecies: (value?: string) => void
    setRig: (value?: string) => void
    setMedia: (value?: { url: string, key: string }[]) => void
    reset: () => void
}

export const useNewCatchStore = create<NewCatchStore>((set) => ({
    title: undefined,
    description: undefined,
    waterbody: undefined,
    coordinates: undefined,
    mapSnapshot: undefined,
    weight: undefined,
    length: undefined,
    rig: undefined,
    species: undefined,
    media: undefined,
    setTitle: title => set({ title }),
    setDescription: description => set({ description }),
    setWaterbody: waterbody => set({ waterbody }),
    setCoordinates: coordinates => set({ coordinates }),
    setMapSnapshot: mapSnapshot => {
        mapSnapshot ? 
        set({ mapSnapshot: { uri: mapSnapshot, id: uuid.v4().toString() }})
        : set({ mapSnapshot: undefined })
    },
    setWeight: weight => set({ weight }),
    setLength: length => set({ length }),
    setSpecies: species => set({ species }),
    setMedia: media => set({ media }),
    setRig: rig => set({ rig }),
    reset: () => set({
        title: undefined,
        description: undefined,
        waterbody: undefined,
        coordinates: undefined,
        mapSnapshot: undefined,
        weight: undefined,
        length: undefined,
        rig: undefined,
        species: undefined,
        media: undefined,
    })
}))