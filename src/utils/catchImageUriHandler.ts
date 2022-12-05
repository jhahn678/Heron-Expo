interface Data {
    media?: {
        url: string
    }[],
    map_image?: {
        url: string
    }
}

export const catchImageUriHandler = <TData extends Data>(data: TData): string | undefined => {
    if(!data) return undefined;
    if(data.media && data.media.length) return data.media[0].url;
    if(data.map_image) return data.map_image.url;
    return undefined;
}