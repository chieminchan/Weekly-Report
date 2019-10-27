import _ from 'lodash';
import axios from 'axios';
import Qs from 'qs';
import router from '@/router';
import store from '@/store';

// 创建axios实例,对axios进行封装
const instance = axios.create({
    baseURL: 'http://47.107.227.25:8000',
    timeout: 60000,
    withCredentials: true,
    paramsSerializer(data) {
        return Qs.stringify(data, {
            arrayFormat: 'brackets'
        });
    },
});

// request拦截器
instance.interceptors.request.use((config) => {
    if (config.paramType === 'form') {
        const {
            data
        } = config;
        let queryParams = '';
        switch (config.method.toLocaleLowerCase()) {
            case 'put':
            case 'post':
                queryParams = new FormData();
                _.forOwn(data, (item, key) => queryParams.append(key, item));
                config.data = queryParams;
        }
    }
    return config;
});

// response拦截器
instance.interceptors.response.use((response) => {
        const { data } = response;
        switch (data.code) {
            case 200:
                return Promise.resolve(data);
            case 500201:
                if (router.currentRoute.name !== 'login') {
                    store.dispatch('initState');
                    router.replace({ name: 'login' });
                }
                break;
            case 403:
                // 后台活动403页面
                router.replace({ name: '403' });
                break;
        }
        return Promise.reject(data);
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;