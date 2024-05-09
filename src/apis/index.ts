import router from '@/router';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { createDiscreteApi } from "naive-ui";
import { useUserInfoStore } from '@/store/user';

const { message, loadingBar } = createDiscreteApi(['message', 'loadingBar'])

export const httpInstance = axios.create({
    timeout: 6000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    withCredentials: true,
})


export type BkResponse = {
    data: any,
    code: number,
    msg: string,
    succeed: boolean
}

// 请求拦截器
httpInstance.interceptors.request.use((config) => {
    return config
}, (error) => {
    return Promise.reject(error)
})

if (process.env.NODE_ENV === 'development') {
    httpInstance.defaults.baseURL = import.meta.env.VITE_BASE_URL_DEV;
    httpInstance.defaults.url = import.meta.env.VITE_BASE_URL_DEV
} else {
    httpInstance.defaults.baseURL = import.meta.env.VITE_BASE_URL + '/api/v1';
    httpInstance.defaults.url = import.meta.env.VITE_BASE_URL
}

// 响应拦截器
export const $http = async (config: AxiosRequestConfig) => {
    loadingBar.start()
    const userInfoStore = useUserInfoStore()
    try {
        const axiosResponse = await httpInstance(config);
        const bkResponse = axiosResponse.data
        let errTitle: string = 'Error'
        if (!bkResponse?.succeed) {
            if (bkResponse.code === 400) {
                errTitle = 'Bad Request'
                message.error(bkResponse.msg || "请求错误")
            } else if (bkResponse.code === 401) {
                errTitle = 'Unauthorized'
                message.error(bkResponse.msg || "未授权或未登录")
                userInfoStore.userInfo = undefined
                router.push('/login')
            } else if (bkResponse.code === 403) {
                errTitle = 'Forbidden'
                message.error(bkResponse.msg || "禁止访问")
                router.push('/result/403')
            } else if (bkResponse.code === 404) {
                errTitle = 'Not Found'
                message.error(bkResponse.msg || "资源不存在")
                router.push('/result/404')
            } else if (bkResponse.code === 500) {
                errTitle = 'Internal Server Error'
                message.error(bkResponse.msg || "服务器内部错误")
                router.push('/result/500')
            } else {
                errTitle = 'Unknow Error'
                message.error(bkResponse.msg || "未知错误")
            }
            const err = new Error(bkResponse.msg || "Unknow Error") as AxiosError
            err.name = errTitle
            // 抛出错误
            // throw err
        }
        loadingBar.finish()
        return bkResponse
    } catch (err) {
        if (err instanceof AxiosError) {
            if (err.response?.status === 404) {
                router.push('/result/404')
            }
            loadingBar.error()
            message.error(err.response?.data.message || err.message || "网络错误")
            throw err
        }
        throw err
    } finally {
        // 以错误形式结束加载条
        loadingBar.error()
    }
}
