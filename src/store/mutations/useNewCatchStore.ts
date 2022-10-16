import create from 'zustand'
import uuid from 'react-native-uuid'
import { Point } from 'geojson'
import { LatLng } from 'react-native-maps'

export interface NewCatchStore {
    title: string | undefined
    description: string | undefined
    waterbody: number | undefined
    point: Point | undefined
    mapSnapshot: { uri: string, id: string } | undefined
    weight: number | undefined
    length: number | undefined
    species: string | undefined
    rig: string | undefined
    createdAt: Date | undefined
    setTitle: (value?: string) => void
    setDescription: (value?: string) => void
    setWaterbody: (value?: number) => void
    setPoint: (value?: LatLng) => void
    setMapSnapshot: (value?: string) => void
    setWeight: (value?: number) => void
    setLength: (value?: number) => void
    setSpecies: (value?: string) => void
    setRig: (value?: string) => void
    setCreatedAt: (value?: Date) => void
    reset: () => void
}

export const useNewCatchStore = create<NewCatchStore>((set) => ({
    title: undefined,
    description: undefined,
    waterbody: undefined,
    point: undefined,
    mapSnapshot: undefined,
    weight: undefined,
    length: undefined,
    rig: undefined,
    species: undefined,
    createdAt: undefined,
    setTitle: title => set({ title }),
    setDescription: description => set({ description }),
    setWaterbody: waterbody => set({ waterbody }),
    setPoint: coordinates => {
        if(!coordinates) return set({ point: undefined })
        const { latitude, longitude } = coordinates;
        set({ point: { type: 'Point', coordinates: [longitude, latitude] }})
    },
    setMapSnapshot: mapSnapshot => {
        mapSnapshot ? 
        set({ mapSnapshot: { uri: mapSnapshot, id: uuid.v4().toString() }})
        : set({ mapSnapshot: undefined })
    },
    setWeight: weight => set({ weight }),
    setLength: length => set({ length }),
    setSpecies: species => set({ species }),
    setRig: rig => set({ rig }),
    setCreatedAt: createdAt => set({ createdAt }),
    reset: () => set({
        title: undefined,
        description: undefined,
        waterbody: undefined,
        point: undefined,
        mapSnapshot: undefined,
        weight: undefined,
        length: undefined,
        rig: undefined,
        species: undefined,
        createdAt: undefined
    })
}))