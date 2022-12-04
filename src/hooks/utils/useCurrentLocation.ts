import { useEffect } from 'react'
import { 
    LocationObject,
    getCurrentPositionAsync, 
    getForegroundPermissionsAsync, 
    requestForegroundPermissionsAsync,
    // getLastKnownPositionAsync
} from 'expo-location'
import { useLocationStore } from '../../store/location/useLocationStore'
import * as Sentry from 'sentry-expo'

interface GetCurrentLocationResult {
    getCurrentLocation: () => Promise<LocationObject | void>
    hasPermission: boolean | undefined
}

export const useCurrentLocation = (): GetCurrentLocationResult => {

    const { 
        setCoordinates,
        setIsFetching,
        setHasPermission,
        hasPermission
    } = useLocationStore()

    useEffect(() => {
        getForegroundPermissionsAsync()
            .then(({ granted }) => setHasPermission(granted))
            .catch((err) => {
                console.error(err)
                Sentry.Native.captureException(err);
                setHasPermission(false)
            })
    },[])

    const getCurrentLocation = async () => {
        setIsFetching(true)
        if(!hasPermission){
            try{
                const res = await requestForegroundPermissionsAsync()
                setHasPermission(res.granted)
                if(!res.granted) return setIsFetching(false)
            }catch(err){
                Sentry.Native.captureException(err);
                alert('Error access device location permissions')
                setHasPermission(false)
            }
        }
        try{
            const result = await getCurrentPositionAsync()
            setIsFetching(false)
            setCoordinates(result.coords)
            return result;
        }catch(err){
            setIsFetching(false)
            alert('Error obtaining location from device')
            Sentry.Native.captureException(err);
        }
    }
    return {
        getCurrentLocation,
        hasPermission
    }
}