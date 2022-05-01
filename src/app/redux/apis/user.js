import axios from 'axios.js'
import { API_URL } from './constant'

export const fetchUserProfile = () => {
    return axios.get(`${API_URL}/api/auth/profile`)
        .then((res) => res.data.user)
        .catch(error => { throw error })
}

export const postUpdateUserProfile = (payload) => {
    return axios.post(`${API_URL}/api/update-profile`, payload)
        .then((res) => res.data)
        .catch(error => { throw error })
}