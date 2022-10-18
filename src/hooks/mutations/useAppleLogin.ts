import { axios } from '../../config/axios'
import { SocialLoginRes } from '../../types/User'

interface AppleLoginBody {
    apple_id: string
    firstname?: string | null | undefined
    lastname?: string | null | undefined
}


export const useAppleLogin = () => {
    return async (args: AppleLoginBody): Promise<SocialLoginRes | void> => {
        try{
            const res = await axios.post('/auth/login/apple', args)
            return res.data;
        }catch(err){
            alert('Sign in failed')
        }
    }
}

