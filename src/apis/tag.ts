import { $http } from '.'

export const getAllTags = () => {
    return $http({
        url: '/tags/get-tags',
        method: 'GET'
    })
}

// 保存标签
export const saveTags = (tag: { label: string, id: number }) => {
    return $http({
        url: '/tags/save-tags',
        method: 'POST',
        data: {
            tag
        }
    })
}

// 删除标签
export const deleteTag = (id: number) => {
    return $http({
        url: '/tags/delete-tag',
        method: 'POST',
        data: {
            id
        }
    })
}