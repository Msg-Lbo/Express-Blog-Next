import { $http } from '.'

// 登陆
export const loginApi = async (data: { account: string, password: string }) => {
    return await $http({
        url: '/user/login',
        method: 'POST',
        data
    })
}
// 注册
export const registerApi = async (data: { account: string, password: string, email: string, code: string }) => {
    return await $http({
        url: '/user/register',
        method: 'POST',
        data
    })
}
// 获取邮箱验证码
export const getEmailCodeApi = async (email: string) => {
    return await $http({
        url: '/user/get-captcha',
        method: 'GET',
        params: {
            email
        }
    })
}
// 登出
export const logoutApi = async () => {
    return await $http({
        url: '/user/logout',
        method: 'POST'
    })
}

// 获取用户信息
export const getUserInfoApi = async () => {
    return await $http({
        url: '/user/get-userinfo',
        method: 'GET'
    })
}