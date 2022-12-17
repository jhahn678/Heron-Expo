import { axios } from "../../config/axios";
import { validateMimeType } from '../../utils/validation/validateUploadFiletype';
import { useAuth } from '../../store/auth/useAuth';
import { useModalStore } from '../../store/modal/useModalStore';
import { MediaInput } from "../../types/Media";
import { AxiosError } from "axios";
import * as SecureStore from 'expo-secure-store'
import * as Sentry from 'sentry-expo'
import { SecureStoreKeys } from "../../types/SecureStore";
import { RestError } from "../../types/errors";

interface GetSignedUrlRes {
    signedUrl: string | null
    error?: ErrorCause
    meta?: {
        mimetype: string
        issuedAt: Date
    }
}

enum ErrorCause {
    Authentication = "Authentication failed",
    UploadFailed = "Failed to upload to S3",
    FiletypeInvalid = "Filetype invalid",
    FetchUrlFailed = "Failed to obtain upload URL"
}

export const useUploadImages = () => {    

    const refreshAccessToken = useAuth(store => store.refreshAccessToken)
    const showReauthenticate = useModalStore(state => state.setReauthenticate)

    /**
     * Obtains signed upload url from API
     * @param mimetype mimetype from image
     * @returns Object with signedUrl and meta object ~ signedUrl will be null if request fails
     */
    const getSignedUrl = async (mimetype: string): Promise<GetSignedUrlRes> => {
        try{
            const accessToken = await SecureStore.getItemAsync(SecureStoreKeys.ACCESS_TOKEN)
            const res = await axios.get<string>(
                `/upload/signed-url?mimetype=${mimetype}`,
                { headers: { "Authorization": `Bearer ${accessToken}` } }
            );
            return { 
                signedUrl: res.data,
                meta: {
                    issuedAt: new Date(),
                    mimetype
                }
            }
        }catch(error){
            const err = error as AxiosError<RestError>;
            if(err?.response?.data?.code === "ACCESS_TOKEN_EXPIRED"){
                const token = await refreshAccessToken();
                if(!token) return { signedUrl: null, error: ErrorCause.Authentication };
                try{
                    const retry = await axios.get<string>(
                        `/upload/signed-url?mimetype=${mimetype}`,
                        { headers: { "Authorization": `Bearer ${token}` } }
                    );
                    return { 
                        signedUrl: retry.data,
                        meta: {
                            issuedAt: new Date(),
                            mimetype
                        }
                    }
                }catch(err){
                    return { signedUrl: null, error: ErrorCause.Authentication }
                }
            }
            Sentry.Native.captureException(error)
            return { signedUrl: null, error: ErrorCause.FetchUrlFailed }
        }
    }


    /** 
     * Handles the S3 portion of image upload only. If authentication 
     * is not present or is no longer valid, reauthentication prompt is
     * displayed
     * @IMPORTANT Compare return array length vs provided array length to evaluate successful uploads
     * @params Array of images from image picker
     * @returns Array of successful uploads
     * @TODO Handle notification of error types besides authentication
     * */
    const uploadToS3 = async (images: { id: string, uri: string }[]): Promise<MediaInput[]> => {

        const uploads: MediaInput[] = []
        
        for(let image of images){
            try{
                //Get image info from uri
                const res = await fetch(image.uri)
                const body = await res.blob()
                //Validate its mimetype
                const type = validateMimeType(body.type)
                if(!type) throw new Error(ErrorCause.FiletypeInvalid)
                //Obtain Upload Url from server
                const urlRes = await getSignedUrl(type)
                if(!urlRes.signedUrl) throw new Error(urlRes.error)
                //Upload to S3
                const upload = await fetch(urlRes.signedUrl, { method: 'PUT', body })
                if(upload.status !== 200) throw new Error(ErrorCause.UploadFailed)
                const url = upload.url.split('?')[0]
                const key = url.split('/').pop() as string
                uploads.push({ url, key })
            }catch(err){
                const error = err as Error;
                if(error?.message === ErrorCause.Authentication){
                    showReauthenticate(); break;
                }
            }
        }

        return uploads;
    }

    return { uploadToS3, getSignedUrl };
}
