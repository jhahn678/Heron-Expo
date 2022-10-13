import create from 'zustand'
import { Privacy } from '../../types/Location'
import { Point, Polygon } from 'geojson'
import { LatLng } from 'react-native-maps'
import uuid from 'react-native-uuid'

interface EditLocationStore {
    title: string | null | undefined
    description: string | null | undefined
    privacy: Privacy | undefined
    privacyVisible: boolean
    point: Point | undefined | null
    polygon: Polygon | undefined | null
    mapSnapshot: { uri: string, id: string } | undefined
    deleteMedia: number[]
    setTitle: (value: string | null | undefined) => void
    setDescription: (value: string | null | undefined) => void
    setPrivacy: (value: Privacy | undefined) => void
    setPrivacyVisible: (value: boolean) => void
    setPoint: (value: LatLng | null) => void
    setPolygon: (value: LatLng[] | null) => void
    setMapSnapshot: (value: string | null) => void
    addDeleteMedia: (value: number) => void 
    reset: () => void
}

export const useEditLocationStore = create<EditLocationStore>((set, get) => ({
    title: undefined,
    description: undefined,
    privacy: undefined,
    privacyVisible: false,
    point: undefined,
    polygon: undefined,
    mapSnapshot: undefined,
    deleteMedia: [],
    setTitle: title => set({ title }),
    setDescription: description => set({ description }),
    setPrivacy: privacy => set({ privacy }), 
    setPrivacyVisible: privacyVisible => set({ privacyVisible }),
    setPoint: coords => {
        if(coords === null) return set({ point: null })
        const { latitude, longitude } = coords;
        set({ point: { type: 'Point', coordinates: [longitude, latitude] }})
    },
    setPolygon: coords => {
        if(!coords) return set({ polygon: undefined })
        const coordinates = coords.map(x => ([x.longitude, x.latitude]))
        set({ polygon: { type: 'Polygon', coordinates: [coordinates] }})
    },
    setMapSnapshot: mapSnapshot => set({ 
        mapSnapshot: mapSnapshot ? { 
            uri: mapSnapshot, 
            id: uuid.v4().toString() 
        } : undefined
    }),
    addDeleteMedia: id => {
        const images = get().deleteMedia
        set({ deleteMedia: [...images, id] })
    },
    reset: () => set({
        title: undefined,
        description: undefined,
        privacy: undefined,
        point: undefined,
        polygon: undefined,
        mapSnapshot: undefined,
        deleteMedia: [],
    })
}))