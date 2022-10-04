import create from 'zustand'
import uuid from 'react-native-uuid'
import { Privacy } from '../../types/Location'
import { Point, Polygon } from 'geojson'
import { LatLng } from 'react-native-maps'

export interface NewLocationStore {
    title: string | undefined
    description: string | undefined
    privacy: Privacy,
    waterbody: number | undefined,
    point: Point | undefined,
    polygon: Polygon | undefined,
    mapSnapshot: { uri: string, id: string } | undefined
    hexcolor: string | undefined
    setTitle: (value?: string) => void
    setDescription: (value?: string) => void
    setWaterbody: (value?: number) => void
    setHexcolor: (value?: string) => void
    setPoint: (value?: LatLng) => void
    setPolygon: (value?: LatLng[]) => void
    setMapSnapshot: (value?: string) => void
    reset: () => void
}

export const useNewLocationStore = create<NewLocationStore>((set) => ({
    title: undefined,
    description: undefined,
    privacy: Privacy.Public,
    waterbody: undefined,
    point: undefined,
    polygon: undefined,
    mapSnapshot: undefined,
    hexcolor: undefined,
    setTitle: title => set({ title }),
    setDescription: description => set({ description }),
    setWaterbody: waterbody => set({ waterbody }),
    setHexcolor: hexcolor => set({ hexcolor }),
    setPoint: coordinates => {
        if(!coordinates) return set({ point: undefined })
        const { latitude, longitude } = coordinates;
        set({ point: { type: 'Point', coordinates: [longitude, latitude] }})
    },
    setPolygon: coords => {
        if(!coords) return set({ polygon: undefined })
        const coordinates = coords.map(x => ([x.longitude, x.latitude]))
        set({ polygon: { type: 'Polygon', coordinates: [coordinates] }})
    },
    setMapSnapshot: mapSnapshot => {
        mapSnapshot ? 
        set({ mapSnapshot: { uri: mapSnapshot, id: uuid.v4().toString() }})
        : set({ mapSnapshot: undefined })
    },
    reset: () => set({ 
        title: undefined,
        description: undefined,
        privacy: Privacy.Public,
        waterbody: undefined,
        point: undefined,
        polygon: undefined,
        mapSnapshot: undefined,
        hexcolor: undefined,
    })
})) 