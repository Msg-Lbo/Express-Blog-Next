<template>
  <main class="flex gap-2">
    <div class="preview-container">
      <div class="perview-title">
        <p class="title">{{ articleInfo.title }}</p>
        <p class="desc">{{ articleInfo.description }}</p>
        <div class="info">
          <div class="flex gap-2 justify-between items-center">
            <span class="category">{{ articleInfo.category_name }}</span>
            <n-tag
              class="cursor-pointer"
              size="small"
              :bordered="false"
              v-for="(tag, index) in articleInfo.tags"
              :key="index"
            >
              {{ tag }}
            </n-tag>
          </div>
          <span class="time">
            <n-time :time="articleInfo.create_time" type="datetime" />
          </span>
        </div>
      </div>
      <MdPreview
        editorId="md-id"
        :modelValue="articleInfo.content"
        @onGetCatalog="onGetCatalog"
        previewTheme="github"
      />
      <n-divider dashed style="margin: 10px 0" />
      <n-space justify="space-between">
        <n-button class="overflow-hidden w-full" type="primary" text :disabled="!articleInfo.pre_id" @click="getPreOrNext(articleInfo.pre_id)">
          上一篇: {{ articleInfo.pre_title || "无" }}
        </n-button>
        <n-button class="overflow-hidden w-full" type="primary" text :disabled="!articleInfo.next_id" @click="getPreOrNext(articleInfo.next_id)">
          下一篇: {{ articleInfo.next_title || "无" }}
        </n-button>
      </n-space>
      <comment-view :article-id="articleInfo.id.toString()"></comment-view>
    </div>
    <div class="catalog-container">
      <div class="text-lg mb-2 font-bold">目录</div>
      <MdCatalog editorId="md-id" :scrollElement="scrollElement" />
    </div>
    <n-float-button :right="60" :bottom="60" shape="square" @click="handleToTop">
      <to-top theme="outline" size="16" :strokeWidth="3" />
    </n-float-button>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { MdPreview, MdCatalog } from "md-editor-v3";
import CommentView from "@/components/CommentView.vue";
import { ToTop } from "@icon-park/vue-next";
import "md-editor-v3/lib/style.css";
import { useRoute } from "vue-router";
import { getArticleDetailApi } from "@/apis/article";
import router from "@/router";

interface Article {
  id: number;
  title: string;
  category_name: string;
  description: string;
  content: string;
  tags?: string[];
  pre_id: number;
  next_id: number;
  pre_title: string;
  next_title: string;
  create_time: number;
  update_time: number;
}

const route = useRoute();
const articleInfo = ref<Article>({
  id: 0,
  title: "",
  category_name: "",
  description: "",
  content: "",
  pre_id: 0,
  next_id: 0,
  pre_title: "",
  next_title: "",
  create_time: 0,
  update_time: 0,
});
const catalogList = ref<any[]>([]);
const id = ref<string>(route.path.split("/").pop()!);
const scrollElement = document.documentElement;

// 获取文章详情
const getArticleDetail = async (id: number) => {
  const res = await getArticleDetailApi(id);
  if (res.code === 200) {
    articleInfo.value = res.data;
    articleInfo.value.tags = res.data.tags?.split(",") || [];
  }
};

// 获取目录
const onGetCatalog = (list: any[]) => {
  catalogList.value = list;
};

// 修改路由
const getPreOrNext = (id: number) => {
  router.push({ path: `/detail/${id}` });
  getArticleDetail(id);
};

// 返回顶部
const handleToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  getArticleDetail(Number(id.value));
});
</script>

<style lang="scss" scoped>
.preview-container {
  @apply p-4 w-full;
  .perview-title {
    @apply mb-4;

    .title {
      @apply text-2xl text-center;
      @apply font-bold;
    }
    .desc {
      @apply text-sm text-center;
    }
    .info {
      @apply flex justify-between items-center;
      .category {
        font-size: 14px;
      }
      .time {
        font-size: 14px;
        line-height: 16px;
      }
    }
  }
}
.catalog-container {
  @apply w-[200px] fixed top-[200px] right-[50px] bg-slate-100 p-3 rounded-md hidden md:block;
}
.float-button {
  @apply fixed bottom-4 right-4;
}
</style>
