import { $http } from '.'

// 获取env文件内容
export const getEnvApi = () => {
    return $http({
        url: '/getEnv',
        method: 'GET'
    })
}

// 测试数据库连接
export const testDbApi = () => {
    return $http({
        url: '/testConnection',
        method: 'GET',
    })
}

// 测试邮件配置
export const testEmailApi = (email: string) => {
    return $http({
        url: '/testEmailService',
        method: 'get',
        params: {
            email
        }
    })
}

// 验证邮件验证码
export const verifyEmailCodeApi = (email: string, code: string) => {
    return $http({
        url: '/verifyEmailCode',
        method: 'POST',
        data: {
            email,
            code
        }
    })
}

// 安装数据库
export const installDbApi = (data: any) => {
    return $http({
        url: '/installBackend',
        method: 'POST',
        data
    })
}