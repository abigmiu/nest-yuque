import axios, { type AxiosRequestConfig } from 'axios'

const instance = axios.create({
    baseURL: '/api'
})

instance.interceptors.response.use((response) => {
    return response.data.data
})

class Request {
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return instance.get(url, config)
    }
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return instance.post(url, data, config)
    }
}
export default new Request()
