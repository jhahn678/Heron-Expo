import { axios } from "../../config/axios";
import { useQuery } from '@tanstack/react-query'
import { useAuth } from "../../store/auth/useAuth";

export interface AccountRes {
    email: string | null
    google_id: string | null
    facebook_id: string | null
    apple_id: string | null
}

export const useGetMyAccount = () => {
    
    const { getAccessToken } = useAuth()

    const fetchAccount = async () => {
        const token = await getAccessToken() 
        if(!token) throw new Error('Not authenticated')
        const res = await axios.get('/auth/my-account', {
            headers: { authorization: `Bearer ${token}` }
        })
        return res.data;
    }

    return useQuery<AccountRes>({ queryFn: fetchAccount, refetchOnMount: true })
}