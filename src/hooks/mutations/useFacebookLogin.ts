import { axios } from '../../config/axios'
import { SocialLoginRes } from '../../types/User'

interface FacebookLoginBody {
    accessToken: string
}


export const useFacebookLogin = () => {
    return async (args: FacebookLoginBody): Promise<SocialLoginRes | void> => {
        try{
            const res = await axios.post('/auth/login/facebook', args)
            return res.data;
        }catch(err){
            console.error(err)
            alert('Sign in failed')
        }
    }
}