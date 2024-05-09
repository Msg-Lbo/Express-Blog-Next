import { $http } from '.'

// 获取指定状态友链
export const getAllFriendApi = async () => {
    return await $http({
        url: '/friend/get-all-friend',
        method: 'GET'
    })
}

// 获取已通过友链
export const getFriendByPassApi = async () => {
    return await $http({
        url: '/friend/get-friend',
        method: 'GET'
    })
}

// 申请友链
export const addFriendApi = async (data: { name: string, link: string, email: string, description: string, logo: string, code?: string }) => {
    return await $http({
        url: '/friend/apply-friend',
        method: 'POST',
        data
    })
}

// 允许友链
export const allowFriendApi = async (id: number) => {
    return await $http({
        url: '/friend/allow-friend',
        method: 'POST',
        data: { id }
    })
}

// 驳回友链
export const refuseFriendApi = async (id: number, reason: string) => {
    return await $http({
        url: '/friend/refuse-friend',
        method: 'POST',
        data: {
            id,
            reason
        }
    })
}

// 删除友链
export const deleteFriendApi = async (id: number) => {
    return await $http({
        url: '/friend/delete-friend',
        method: 'POST',
        data: { id }
    })
}

// 更新友链
export const updateFriendApi = async (data: { id: number, name: string, link: string, email: string, description: string, logo: string, code?: string }) => {
    return await $http({
        url: '/friend/update-friend',
        method: 'POST',
        data
    })
}