import axios from 'axios'
import { useState } from 'react';
import { useAuth } from '../../store/auth/useAuth'
const { AWS_LAMBDA_REPORT_PROBLEM } = process.env;

interface Args {
    onSuccess: () => void
    onError: () => void
}

interface Params {
    category: string
    email: string
    message: string
}

interface Res {}

export const useReportProblem = ({ onSuccess, onError }: Args) => {
    const [loading, setLoading] = useState(false)
    const id = useAuth(store => store.id)
    const submitReport = async (params: Params) => {
        try{
            setLoading(true)
            await axios.post<Params, Res>(AWS_LAMBDA_REPORT_PROBLEM!, { id, ...params})
            onSuccess()
            setLoading(false)
        }catch(err){
            console.error(err)
            setLoading(false)
            onError()
        }
    }
    return {
        submitReport,
        loading
    }
}