import { useState, useEffect } from 'react'
import { 
    LocationObject,
    getCurrentPositionAsync, 
    getForegroundPermissionsAsync, 
    requestForegroundPermissionsAsync 
} from 'expo-location'
    
type GetCurrentLocationFunction = () => Promise<LocationObject>

export const useCurrentLocation = (): GetCurrentLocationFunction => {

    const [hasPermission, setHasPermission] = useState(false)
    
    useEffect(() => {
        (async () => {
            const res = await getForegroundPermissionsAsync()
            setHasPermission(res.status === 'granted')
        })()
    },[])

    const getCurrentLocation = async () => {
        if(!hasPermission){
            const res = await requestForegroundPermissionsAsync()
            setHasPermission(res.status === 'granted')
        }
        return (await getCurrentPositionAsync())
    }
    
    return getCurrentLocation;
}