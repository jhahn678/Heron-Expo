import { useEffect } from 'react'
import { 
    LocationObject,
    getCurrentPositionAsync, 
    getForegroundPermissionsAsync, 
    requestForegroundPermissionsAsync
} from 'expo-location'
import { useLocationStore } from '../../store/location/useLocationStore'

interface GetCurrentLocationResult {
    getCurrentLocation: () => Promise<LocationObject>
    hasPermission: boolean
}

export const useCurrentLocation = (): GetCurrentLocationResult => {

    const { 
        setCoordinates,
        setIsFetching,
        setHasPermission,
        hasPermission
    } = useLocationStore()

    useEffect(() => {
        (async () => {
            const res = await getForegroundPermissionsAsync()
            setHasPermission(res.status === 'granted')
        })()
    },[])

    const getCurrentLocation = async () => {
        setIsFetching(true)
        if(!hasPermission){
            const res = await requestForegroundPermissionsAsync()
            setHasPermission(res.status === 'granted')
        }
        const result = await getCurrentPositionAsync()
        setIsFetching(false)
        setCoordinates(result.coords)
        return result;
    }
    return {
        getCurrentLocation,
        hasPermission
    }
}