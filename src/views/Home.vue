<template>
  <main class="home-main h-full">
    <section v-if="isLoding">
      <n-skeleton text :repeat="6" style="height: 20px" />
    </section>
    <section
      v-else-if="!isLoding && articleList.length === 0"
      class="h-full w-full p-4 flex items-center justify-center"
    >
      <n-result status="404" title="东西呢?" description="找不到你想要的东西">
        <template #footer>
          <n-button @click="() => router.push('/')">找点乐子吧</n-button>
        </template>
      </n-result>
    </section>

    <section v-else>
      <div class="article-container">
        <div class="title-content">
          <span class="title">标题</span>
          <span class="title">分类</span>
          <span class="title">阅读</span>
          <span class="title">评论</span>
          <span class="title">时间</span>
        </div>
        <n-divider dashed />
        <div class="article-content">
          <div
            class="cursor-pointer"
            v-for="(item, index) in articleList"
            :key="index"
            @click="handleArticleClick(item)"
          >
            <div class="item-content">
              <span class="text" :class="{ 'text-red-500': item.top === 1 }">
                <n-ellipsis :line-clamp="1">
                  {{ item.title }}
                </n-ellipsis>
              </span>
              <span class="text">{{ item.category_name }}</span>
              <span class="text">{{ item.read_count }}</span>
              <span class="text">{{ item.comment_count }}</span>
              <span class="text"> <n-time :time="item.update_time || item.create_time" type="date" /></span>
            </div>
          </div>
        </div>
        <div class="pagination">
          <n-pagination
            v-model:page="page"
            size="small"
            show-size-picker
            :page-count="total"
            simple
            @update:page="handlePageChange"
          />
        </div>
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
import { getAllArticleApi } from "@/apis/article";
import { getArticlesByCategoryApi } from "@/apis/category";
import { useRouter, useRoute } from "vue-router";
import { useArticleStore } from "@/store/article";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const message = useMessage();
const articleStore = useArticleStore();

interface Article {
  id: number;
  title: string;
  category_name: string;
  description: string;
  read_count: number;
  comment_count: number;
  top: number;
  create_time: string;
  update_time: string | null;
}

const articleList = ref<Article[]>([]);
const page = ref(1);
const pageSize = ref(15);
const total = ref(0);
const alias = computed(() => route.path.split("/").pop());
const { searchArticlesList } = storeToRefs(articleStore);
const isLoding = ref(true);
// 监听路由变化，如果有分类别名，则获取分类下的文章列表，否则获取全部文章列表
watch(alias, () => {
  page.value = 1;
  if (alias.value && alias.value !== "search") {
    // console.log("alias", alias.value);
    getCategoryArticleList(alias.value!);
  }
});

watch(
  () => route.path,
  (newVal) => {
    if (newVal === "/") {
      getArticleList();
    }
  }
);

// 监听已搜索文章列表变化，如果有文章列表，则跳转到搜索页
watch(searchArticlesList, (newVal) => {
  articleList.value = newVal;
});

// 获取分类下的文章列表
const getCategoryArticleList = async (alias: string) => {
  const res = await getArticlesByCategoryApi(alias, page.value, pageSize.value);
  if (res.code === 200) {
    if (res.data.list.length === 0) {
      articleList.value = [];
      message.error("没有文章");
      return;
    }
    articleList.value = res.data.list;
    total.value = Math.ceil(res.data.total / pageSize.value);
  }
  isLoding.value = false;
};

// 获取文章列表
const getArticleList = async () => {
  const res = await getAllArticleApi(page.value, pageSize.value);
  if (res.code === 200) {
    if (res.data.list.length === 0) {
      articleList.value = [];
      message.error("没有文章");
      return;
    }
    articleList.value = res.data.list;
    total.value = Math.ceil(res.data.total / pageSize.value);
  }
  isLoding.value = false;
};

// 文章点击事件
const handleArticleClick = async (item: Article) => {
  // 跳转到文章详情页
  router.push({ path: `/detail/${item.id}` });
};

const handlePageChange = (num: number) => {
  page.value = num;
  getArticleList();
};

onMounted(() => {
  if (alias.value && alias.value !== "search") {
    getCategoryArticleList(alias.value);
  } else if (alias.value !== "search") {
    getArticleList();
  } else {
    articleList.value = searchArticlesList.value;
  }
});
</script>

<style lang="scss" scoped>
.skeleton {
  @apply p-4;
}
.article-container {
  @apply h-full;
  .title-content {
    @apply flex py-4 px-5;
    .title {
      @apply min-w-[100px] flex justify-center items-center text-center font-bold;
      &:first-child {
        @apply flex-1 justify-start;
        &::before {
          @apply mr-3 w-[2px] h-3 bg-black;
          content: "";
        }
      }
    }
  }
  .article-content {
    @apply flex flex-col gap-[2px] mt-2 justify-center;
    .item-content {
      @apply flex py-2 px-5 hover:bg-gray-100 cursor-pointer;
      .text {
        @apply min-w-[100px] flex justify-center items-center gap-1 leading-5;
        &:first-child {
          @apply flex-1 justify-start items-center;
        }
        &:not(:first-child) {
          @apply opacity-50;
        }
      }
    }
  }

  .pagination {
    @apply m-5;
  }
}

@media screen and (max-width: 768px) {
  .article-container {
    .item-content {
      .text {
        &:not(:first-child) {
          display: none;
        }
      }
    }
    .title-content {
      .title {
        &:not(:first-child) {
          display: none;
        }
      }
    }
  }
}
</style>
