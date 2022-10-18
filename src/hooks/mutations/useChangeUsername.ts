import { axios } from '../../config/axios'

interface Args {
    token: string
    username: string
}

export const useChangeUsername = () => {
    return async (args: Args): Promise<{ id: number, username: string } | void> => {
        try{
            const res = await axios.post('/auth/change-username', args)
            return res.data;
        }catch(err){
            alert('Request failed')
        }
    }
}