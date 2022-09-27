import { axios as API } from "../../config/axios";
import { Images as PendingImage } from '../../store/image/useImageStore';
import { validateMimeType } from '../../utils/validateUploadFiletype';
import { useAuth } from '../../store/auth/useAuth';
import { useModalStore } from '../../store/modal/useModalStore';
import { MediaInput } from "../../types/Media";
import { AxiosError } from "axios";

export interface UploadResult {
    uploads: { key: string, url: string }[]
    errors: Pick<PendingImage, 'id' | 'uri'>[] | null
}

interface GetSignedUrlRes {
    /** The number of attempts that were made to get url -- more than one indicated authentication failure */
    attempts: number
    cause: 'AUTHENTICATION' | 'UNKNOWN' | null,
    signedUrl: string | null
}

export const useUploadImages = () => {    

    const showReauthenticate = useModalStore(state => state.setReauthenticate)

    const { getAccessToken, refreshAccessToken } = useAuth(state => ({
        getAccessToken: state.getAccessToken,
        refreshAccessToken: state.refreshAccessToken
    }))
   
    /**
     * #### Multiple attempts and no signed url means there was an error with authentication
     * @param mimetype mimetype from image
     * @param token access token
     * @returns Object with number of attempts and signed url if one was made
     */
    const getSignedUrl = async (mimetype: string, token: string): Promise<GetSignedUrlRes> => {
        try{
            const res = await API.get<string>(`/upload/signed-url?mimetype=${mimetype}`, {
                headers: { authorization: `Bearer ${token}` }
            })
            return {
                attempts: 1,
                cause: null,
                signedUrl: res.data
            }
        }catch(error){
            const err = error as AxiosError;
            if(err.response && err.response.status && err.response.status === 401){
                const newToken = await refreshAccessToken()
                if(!newToken) return { attempts: 1, cause: 'AUTHENTICATION', signedUrl: null }
                try{
                    const reattempt = await API.get<string>(`/upload/signed-url?mimetype=${mimetype}`, {
                        headers: { authorization: `Bearer ${newToken}` }
                    })
                    return { attempts: 2, cause: null, signedUrl: reattempt.data }
                }catch(err){
                   return { attempts: 2, cause: 'UNKNOWN', signedUrl: null }
                }
            }
            return { attempts: 1, cause: 'UNKNOWN', signedUrl: null }
        }
    }


    /** 
     * ### S3 Upload Function 
     * #### Handles the S3 portion of image upload only
     * If authentication is not present or is no longer valid,
     * it will automatically display the reauthentication prompt, and returns VOID
     * @TODO need to clean up images if uploads are aborted before completion
     * @params Array of images from image picker
     * @returns Object containing successful uploads and failed uploads
     * */
    const uploadImages = async (images: Pick<PendingImage, 'id' | 'uri'>[]): Promise<UploadResult | void> => {

        const errors: Pick<PendingImage, 'id' | 'uri'>[] = [];
        const uploads: MediaInput[] = [];

        const token = await getAccessToken()
        if(!token) return showReauthenticate()
        
        for(let image of images){
            try{
                const res = await fetch(image.uri)
                const body = await res.blob()
                const type = validateMimeType(body.type)
                if(!type) throw new Error('File type not accepted')
                const { signedUrl, cause } = await getSignedUrl(type, token)
                if(!signedUrl && cause === 'AUTHENTICATION'){
                    showReauthenticate(); return;
                }
                if(!signedUrl) throw new Error('Could not obtain upload url')
                const upload = await fetch(signedUrl, { method: 'PUT', body })
                if(upload.status !== 200) throw new Error('Image upload failed')
                const url = upload.url.split('?')[0]
                const key = url.split('/').pop() as string
                uploads.push({ url, key })
            }catch(err){
                console.log(err)
                errors.push(image)
            }
        }
        return { uploads, errors: errors.length > 0 ? errors : null }
    }

    return uploadImages;
}