import { axios } from '../../config/axios'
import { SocialLoginRes } from '../../types/User'

interface GoogleLoginBody {
    accessToken: string
}


export const useGoogleLogin = () => {
    return async (args: GoogleLoginBody): Promise<SocialLoginRes | void> => {
        try{
            const res = await axios.post('/auth/login/google', args)
            return res.data;
        }catch(err){
            console.error(err)
            alert('Sign in failed')
        }
    }
}

