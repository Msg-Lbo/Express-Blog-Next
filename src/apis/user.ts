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

// 修改用户信息
export const updateUserInfoApi = async (nickname: string, avatar: string, email: string) => {
    return await $http({
        url: '/user/update-userinfo',
        method: 'POST',
        data:{
            nickname,
            avatar,
            email
        }
    })
}

// 修改密码
export const updatePasswordApi = async (oldPassword: string, newPassword: string) => {
    return await $http({
        url: '/user/update-password',
        method: 'POST',
        data:{
            oldPassword,
            newPassword
        }
    })
}