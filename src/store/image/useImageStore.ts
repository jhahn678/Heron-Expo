import create from 'zustand'
import { ImageInfo } from 'expo-image-picker'
import uuid from 'react-native-uuid'
import { CameraCapturedPicture } from 'expo-camera'

export interface Images extends Pick<ImageInfo, 'uri' | 'height' | 'width'>{
    id: string
}

export interface ImageStore {
    images: Images[]
    getImages: () => Images[]
    setImages: (data: ImageInfo | ImageInfo[]) => void
    appendImages: (data: ImageInfo | ImageInfo[] | CameraCapturedPicture) => void 
    removeImages: (id: string | string[]) => void
    clearImages: () => void
}

export const useImageStore = create<ImageStore>((set, get) => ({
    images: [],
    setImages: data => {
        if(Array.isArray(data)) {
            set({ 
                images: data.map(img => ({
                    id: uuid.v4().toString(),   
                    uri: img.uri,
                    height: img.height,
                    width: img.width
                }))
            })
        }else{
            const { uri, height, width } = data;
            set({ images: [{ id: uuid.v4().toString(), uri, height, width }] })
        }
    },
    appendImages: data => {
        const images = get().images;
        if(Array.isArray(data)){
            const newImages = data.map(x => ({
                uri: x.uri,
                height: x.height,
                width: x.width,
                id: uuid.v4().toString()
            }))
            set({ images: [ ...images, ...newImages ]})
        }else{
            const { uri, height, width } = data;
            set({ images: [ ...images, { 
                uri, height, width, id: uuid.v4().toString()
            }]})
        }
    },
    removeImages: args => {
        const images = get().images;
        if(Array.isArray(args)){
            const filtered = images.filter(x => !args.includes(x.id))
            set({ images: filtered })
        }else{
            const filtered = images.filter(x => x.id !== args)
            set({ images: filtered })
        }
    },
    clearImages: () => {
        set({ images: [] })
    },
    getImages: () => get().images
}))