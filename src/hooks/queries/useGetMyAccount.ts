import { axios } from "../../config/axios";
import { useQuery } from '@tanstack/react-query'
import { useAuth } from "../../store/auth/useAuth";

interface Res {
    email: string
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

    return useQuery<Res>({ queryFn: fetchAccount })
}