import { defineStore } from "pinia";
import { ref } from "vue";
import { searchArticleApi } from "@/apis/article";
import { createDiscreteApi } from "naive-ui";
import router from "@/router";

const { message } = createDiscreteApi(['message'])

export const useArticleStore = defineStore('article', () => {
    const searchArticlesList = ref([])

    const searchArticle = async (keyword: string) => {
        const res = await searchArticleApi(keyword)
        if (res.code === 200) {
            router.push({ path: "/search" });
            if (res.data.list.length === 0) {
                searchArticlesList.value = []
                message.error('没有找到呢')
                return
            }
            message.success(res.msg)
            searchArticlesList.value = res.data.list
        }
    }

    return {
        searchArticlesList,
        searchArticle
    }
})