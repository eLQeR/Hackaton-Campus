import axios from 'axios'

const baseURL = 'http://127.0.0.1:8000/api/campus'

export default axios.create({
    baseURL,
})

export const axiosPrivate = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})
