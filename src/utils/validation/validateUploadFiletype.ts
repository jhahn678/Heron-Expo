const ACCEPTED_FILE_TYPES = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp']
const ACCEPTED_MIME_TYPE = ['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml', 'image/webp']

export const validateMimeType = (value: string | undefined | null): string | null => {
    if(!value) return null;
    if(ACCEPTED_MIME_TYPE.includes(value)) return value;
    return null;
} 