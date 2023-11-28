import axios from "axios"
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { showFailToast, showToast } from 'vant';

import { Names } from './requestCom/env-name'//枚举
import { errorCodeType } from './requestCom/error-code'//请求错误代码
// console.log(import.meta.env.VITE_HTTP)
const service = axios.create({
    //配置的跨域标识
    baseURL: '/api',
    //请求头
    headers: {},
    //超时
    timeout: 1000 * Names.TIME,
})
//请求拦截器
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    return config
}, (error: AxiosError) => {
    console.log(error, 'e')
})
//响应拦截器
service.interceptors.response.use((config: AxiosResponse) => {
    const code = config.data['code'];
    if (code == 'success') {
        return Promise.resolve(config)
    } else {
        showFailToast(config.data.message)
        return Promise.reject(config.data)
    }
    // return config;
}, (error: AxiosError) => {
    console.log(error);
    const errMsg = errorCodeType(error.response?.status + '');
    showToast(errMsg.message)
    return Promise.reject(errMsg)

})
export default service
