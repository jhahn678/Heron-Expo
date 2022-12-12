import { Image } from 'react-native'
const DEFAULT_IMAGE = Image.resolveAssetSource(require('../../../assets/default-background.png')).uri

interface WaterbodyData{
    media?: {
        url: string
    }[]
}

export const imageUriHandler = <TData extends WaterbodyData>(data: TData): string => {
    if(data && data.media && data.media.length){
        return data.media[0].url;
    }else{
        return DEFAULT_IMAGE;
    }
}