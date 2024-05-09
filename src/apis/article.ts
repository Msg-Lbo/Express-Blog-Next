import { $http } from '.'

// 获取所有文章
export const getAllArticleApi = async (page: number, pageSize: number) => {
    return await $http({
        url: '/article/get-all-article',
        method: 'GET',
        params: {
            page,
            pageSize
        }
    })
}
// 保存文章
export const saveArticleApi = async (data: { id?: number | null, title: string, description: string, content: string, category_id: number | null, tags?: string, create_time: number | null, update_time: number | null }) => {
    return await $http({
        url: '/article/save-article',
        method: 'POST',
        data
    })
}
// 删除文章
export const deleteArticleApi = async (id: number) => {
    return await $http({
        url: '/article/delete-article-by-id',
        method: 'POST',
        data: {
            id
        }
    })
}
// 获取文章详情
export const getArticleDetailApi = async (id: number | string) => {
    return await $http({
        url: '/article/get-article-detail',
        method: 'GET',
        params: {
            id
        }
    })
}
// 搜索文章
export const searchArticleApi = async (keyword: string) => {
    return await $http({
        url: '/article/search-article',
        method: 'GET',
        params: {
            keyword
        }
    })
}
// 置顶或取消置顶
export const setTopArticleApi = async (id: number, top: number) => {
    return await $http({
        url: '/article/istop-article',
        method: 'POST',
        data: {
            id,
            top
        }
    })
}