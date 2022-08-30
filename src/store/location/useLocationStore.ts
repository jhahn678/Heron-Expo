import { LocationObjectCoords } from 'expo-location'
import create from 'zustand'

interface LocationStore {
    hasPermission: boolean
    hasCoordinates: boolean,
    isFetchingLocation: boolean,
    longitude: number | null,
    latitude: number | null,
    setHasPermission: (hasPermission: boolean) => void,
    setCoordinates: (coords: LocationObjectCoords) => void,
    setIsFetching: (isFetchingLocation: boolean) => void,
}

export const useLocationStore = create<LocationStore>((set) => ({
    hasPermission: false,
    hasCoordinates: false,
    isFetchingLocation: false,
    longitude: null,
    latitude: null,
    setCoordinates: coords => set({
        latitude: coords.latitude,
        longitude: coords.longitude,
        hasCoordinates: true,
        isFetchingLocation: false
    }),
    clearCoordinates: () => set({
        latitude: null,
        longitude: null,
        hasCoordinates: false
    }),
    setIsFetching: isFetchingLocation  => set({ isFetchingLocation }),
    setHasPermission: hasPermission => set({ hasPermission })
}))