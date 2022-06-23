import axios from 'axios'

const instance = axios.create({
    baseURL: '/api',
})
instance.interceptors.request.use((config) => {
    console.log(config)
    return config
})

export default instance
