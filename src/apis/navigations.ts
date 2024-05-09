import { $http } from '.'

// 获取全部导航
export const getAllNavigationsApi = () => {
    return $http({
        url: '/navigations/get-all-navigations',
        method: 'GET'
    })
}

// 获取状态为1的导航
export const getActiveNavigationsApi = () => {
    return $http({
        url: '/navigations/get-navigation',
        method: 'GET'
    })
}


// 保存导航
export const saveNavigationsApi = (data: { label: string, alias: string, status: number, sort: number }) => {
    return $http({
        url: '/navigations/save-navigation',
        method: 'POST',
        data: data
    })
}

// 更新导航
export const updateNavigationApi = (data: { id: number, label: string, alias: string, status: number, sort: number }) => {
    return $http({
        url: '/navigations/update-navigation',
        method: 'POST',
        data: data
    })
}

// 删除导航
export const deleteNavigationApi = (id: number) => {
    return $http({
        url: '/navigations/delete-navigation',
        method: 'POST',
        data: { id }
    })
}