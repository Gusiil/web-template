import axios from "axios";
import qs from "qs";
import { IObjectKeys } from "./global";

const baseMap: IObjectKeys = {
    qa: '//specialty-merchant1-qa.elong.com',
    stage: 'https://specialty-merchant-hd.elong.com',
    prod: 'https:////arsenalgw.elong.com/specialty/merchant' // xWXemWYKSmKQ7yw7PhtC7Q
}

type Env = "qa" | 'stage' | 'prod'

const { userToken, env } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

const baseURL = baseMap[env as Env];//import.meta.env.VITE_API_PATH as string;

const instance = axios.create({
    baseURL,
    timeout: 50000,
});

// 添加请求拦截器
instance.interceptors.request.use(config => {
    config.headers['userToken'] = userToken;
    return config
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

const fetch = {
    //  get
    get(url: string, params?: IObjectKeys) {
        return instance({
            method: 'get',
            url,
            params,
        })
    },

    // post
    post(url: string, data: IObjectKeys) {
        return instance({
            method: 'post',
            url,
            data,
        })
    }
}

export default fetch