import Axios from 'axios'
import { API_BASE_URL } from '@env'

export const axios = Axios.create({
    baseURL: API_BASE_URL,
})

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.patch['Content-Type'] = 'application/json'
