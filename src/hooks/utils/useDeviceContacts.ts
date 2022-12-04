import { useState, useEffect } from 'react'
import { 
    getPermissionsAsync, 
    requestPermissionsAsync, 
    getContactsAsync, 
    ContactResponse
} from 'expo-contacts'

type GetDeviceContacts = (pageOffset?: number, pageSize?: number) => Promise<ContactResponse | void>

export const useDeviceContacts = (): GetDeviceContacts => {

    const [hasPermission, setHasPermission] = useState(false)

    useEffect(() => {
        getPermissionsAsync()
            .then(res => setHasPermission(res.granted))
            .catch(err => { 
                console.error(err); 
                alert('Could not access permissions for device contacts')
            })
    },[])

    const getDeviceContacts = async (pageSize=0, pageOffset=0) => {
        if(!hasPermission){
            const res = await requestPermissionsAsync()
            setHasPermission(res.status === 'granted')
            try{
                const res = await requestPermissionsAsync()
                setHasPermission(res.granted);
                if(!res.granted) return;
            }catch(err){
                console.error(err)
                return alert('Could not access permissions for device contacts');
            }
        }

        return getContactsAsync({
            fields: ['name', 'phoneNumbers', 'image'],
            pageSize: pageSize,
            pageOffset: pageOffset
        })
    }


    return getDeviceContacts
}