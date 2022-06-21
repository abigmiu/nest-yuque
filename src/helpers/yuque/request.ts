import { HttpException } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IYuequeData } from 'src/models/yuque';
const baseUrl = 'https://www.yuque.com/api/v2';

const headers = {
    'Content-Type': 'application/json',
    'User-Agent': 'miu-novel',
};

const instance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: headers,
});

instance.interceptors.response.use((response: AxiosResponse<IYuequeData>) => {
    const status = response.status;
    if (status !== 200) {
        throw new HttpException('服务器错误', status);
    }
    return response.data.data;
});

const transformInstance = {
    get: (
        token: string,
        url: string,
        config?: AxiosRequestConfig<any>,
    ): Promise<any> => {
        return instance.get(url, {
            ...config,
            headers: {
                'X-Auth-Token': token,
            },
        });
    },
    post: (
        token: string,
        url: string,
        data: any,
        config?: AxiosRequestConfig<any>,
    ): Promise<any> => {
        return instance.post(url, data, {
            ...config,
            headers: {
                'X-Auth-Token': token,
            },
        });
    },
    put: (
        token: string,
        url: string,
        data: any,
        config?: AxiosRequestConfig<any>,
    ): Promise<any> => {
        return instance.put(url, data, {
            ...config,
            headers: {
                'X-Auth-Token': token,
            },
        });
    },
};

export default transformInstance;
