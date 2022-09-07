const ACCEPTED_FILE_TYPES = ['png', 'jpg', 'jpeg', 'gif', 'bmp']

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