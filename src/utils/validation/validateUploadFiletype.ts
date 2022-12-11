const ACCEPTED_FILE_TYPES = ['image/png', 'jpg', 'jpeg', 'gif', 'bmp']

export const validateUploadFiletype = (value: string | undefined): string | null => {
    if(!value) return null;
    if(ACCEPTED_FILE_TYPES.includes(value)){
        if(value === 'png') return 'image/png'
        if(value === 'gif') return 'image/gif'
        if(value === 'bmp') return 'image/bmp'
        return 'image/jpeg'
    }else{
        return null
    }
}

const ACCEPTED_MIME_TYPE = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp']

export const validateMimeType = (value: string | undefined | null): string | null => {
    if(!value) return null;
    const accepted = ACCEPTED_MIME_TYPE.includes(value)
    if(accepted) return value;
    return null;
}