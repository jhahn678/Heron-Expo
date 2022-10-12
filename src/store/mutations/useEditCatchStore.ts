import create from 'zustand'
import uuid from 'react-native-uuid'
import { Point } from 'geojson'
import { LatLng } from 'react-native-maps'

export interface EditCatchStore {
    title: string | undefined | null
    description: string | undefined | null
    waterbody: number | undefined | null
    point: Point | undefined | null
    mapSnapshot: { uri: string, id: string } | undefined | null
    weight: number | undefined | null
    length: number | undefined | null
    species: string | undefined | null
    rig: string | undefined | null
    deleteMedia: number[]
    setTitle: (value?: string | null | undefined) => void
    setDescription: (value?: string | null | undefined) => void
    setWaterbody: (value?: number | null | undefined) => void
    setPoint: (value: LatLng | null) => void
    setMapSnapshot: (value: string | null) => void
    setWeight: (value?: number | null | undefined) => void
    setLength: (value?: number | null | undefined) => void
    setSpecies: (value?: string | null | undefined) => void
    setRig: (value?: string | null | undefined) => void
    addDeleteMedia: (value: number) => void 
    reset: () => void
}

export const useEditCatchStore = create<EditCatchStore>((set, get) => ({
    title: undefined,
    description: undefined,
    waterbody: undefined,
    point: undefined,
    mapSnapshot: undefined,
    weight: undefined,
    length: undefined,
    rig: undefined,
    species: undefined,
    deleteMedia: [],
    setTitle: title => set({ title }),
    setDescription: description => set({ description }),
    setWaterbody: waterbody => set({ waterbody }),
    setPoint: coordinates => {
        if(coordinates === null) return set({ point: null })
        const { latitude, longitude } = coordinates;
        set({ point: { type: 'Point', coordinates: [longitude, latitude] }})
    },
    setMapSnapshot: mapSnapshot => set({ 
        mapSnapshot: mapSnapshot ? { 
            uri: mapSnapshot, 
            id: uuid.v4().toString() 
        } : null
    }),
    addDeleteMedia: id => {
        const images = get().deleteMedia
        set({ deleteMedia: [...images, id] })
    },
    setWeight: weight => set({ weight }),
    setLength: length => set({ length }),
    setSpecies: species => set({ species }),
    setRig: rig => set({ rig }),
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
        deleteMedia: []
    })
}))