<template>
  <main class="sider-main">
    <div class="box user-info-box">
      <div class="avatar">
        <n-avatar round :size="72" :src="Avater" />
      </div>
      <div class="user-info">
        <div class="text-center">
          <div class="title">总文章</div>
          <div class="num">{{ summary?.article_count || 0 }}</div>
        </div>
        <div class="text-center">
          <div class="title">总评论</div>
          <div class="num">{{ summary?.total_comments || 0 }}</div>
        </div>
        <div class="text-center">
          <div class="title">总阅读</div>
          <div class="num">{{ summary?.total_reads || 0 }}</div>
        </div>
      </div>
      <div class="search">
        <n-input-group>
          <n-input v-model:value="keyword" placeholder="搜索文章" @Keyup.enter="handleSearch" size="small" />
          <n-button ghost size="small" @click="handleSearch">搜索</n-button>
        </n-input-group>
      </div>
    </div>
    <div class="box">
      <div class="name">分类</div>
      <n-divider dashed />
      <div class="list">
        <ul>
          <n-skeleton v-if="isLoading" height="18px" width="100%" text :repeat="6" />
          <li class="item" v-else v-for="(item, index) in categoryList" :key="index">
            <router-link :to="`/category/${item.category_alias}`">{{ item.category_name }}</router-link>
            <span class="badge">{{ item.article_count }}</span>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { getAllCategoryApi } from "@/apis/category";
import { getSummaryApi } from "@/apis/settings";
import { useArticleStore } from "@/store/article";
interface Category {
  id: number;
  category_name: string;
  category_alias: string;
  article_count: number;
}
interface Summary {
  article_count: number | string;
  total_comments: number | string;
  total_reads: number | string;
}

const keyword = ref("");
const categoryList = ref<Category[]>([]);
const summary = ref<Summary>();
const articleStore = useArticleStore();
const isLoading = ref(true);

const props = defineProps({
  Avatar: {
    type: String,
    default: "",
  },
});
const Avater = computed(() => props.Avatar);
const { searchArticle } = articleStore;
const handleSearch = () => {
  searchArticle(keyword.value);
};
// const tagList = ref([]);

// 获取分类列表
const getCategoryList = async () => {
  const res = await getAllCategoryApi();
  if (res.code === 200) {
    categoryList.value = res.data;
    isLoading.value = false;
  }
};

// 获取汇总数据
const getSummary = async () => {
  const res = await getSummaryApi();
  if (res.code === 200) {
    summary.value = res.data;
  }
};

onMounted(() => {
  getCategoryList();
  getSummary();
});
</script>

<style lang="scss" scoped>
.sider-main {
  @apply flex flex-col w-full gap-4;
  .box {
    @apply rounded flex-1 bg-white;
    box-shadow: 1px 1px 5px rgb(0 0 0 / 5%);
    .name {
      @apply p-4 text-base font-bold flex items-center;
      &::before {
        @apply mr-3 w-[2px] h-3 bg-black;
        content: "";
      }
    }
    .list {
      @apply p-4;
      .item {
        @apply mb-1 w-full flex items-center justify-between cursor-pointer;
        a {
          @apply block w-full text-gray-600 hover:text-gray-800;
        }
      }
    }
  }

  .user-info-box {
    @apply p-4;
    .avatar {
      @apply flex justify-center items-center mb-8;
    }
    .user-info {
      @apply flex justify-between items-center mt-2;
      .title {
        @apply text-[15px];
      }

      .num {
        @apply text-[12px] font-bold;
      }
    }
    .search {
      @apply my-8;
    }
  }
}
</style>
