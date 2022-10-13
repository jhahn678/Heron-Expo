import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
import { useEffect, useState } from 'react'

export const useSaveToGallery = () => {

    const [hasPermission, setHasPermission] = useState(false)

    const getPermission = async (): Promise<MediaLibrary.PermissionResponse> => {
        const res = await MediaLibrary.requestPermissionsAsync()
        setHasPermission(res.granted); return res;
    }

    useEffect(() => {
        (async () => {
            const hasPermission = await MediaLibrary.getPermissionsAsync()
            hasPermission ? setHasPermission(true) : getPermission()
        })()
    },[])

    const saveToGallery = async (url: string) => {
        if(!hasPermission) {
            const { granted } = await getPermission()
            if(!granted) return;
        }
        const fileName = url.split('/').pop() as string;
        const { uri } = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + fileName)
        const asset = await MediaLibrary.createAssetAsync(uri);
        const album = await MediaLibrary.getAlbumAsync('Heron')
        if(album) await MediaLibrary.addAssetsToAlbumAsync(asset, album, false)
        else await MediaLibrary.createAlbumAsync('Heron', asset, false)
    }

    return { saveToGallery }
}