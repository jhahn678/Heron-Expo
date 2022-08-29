import Axios from 'axios'
import { API_BASE_URL } from '@env'

export const axios = Axios.create({
    baseURL: API_BASE_URL
})