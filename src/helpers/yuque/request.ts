import axios from 'axios';

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

instance.interceptors.request.use((config) => {});

instance.get = (url: string, token: string, config) =>
    instance.get(url, {
        ...config,
        headers: {
            'X-Auth-Token': token,
        },
    });
