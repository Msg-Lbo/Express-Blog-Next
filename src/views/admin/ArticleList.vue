<template>
  <main class="p-4">
    <n-table :single-line="true" striped size="small">
      <thead>
        <tr>
          <th class="title">标题</th>
          <th class="title">分类</th>
          <th class="title">发布时间</th>
          <th class="title">更新时间</th>
          <th class="title">阅读量</th>
          <th class="title">评论量</th>
          <th class="title">置顶</th>
          <th class="title">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articleList" :key="article.id">
          <td class="value">{{ article.title }}</td>
          <td class="value">{{ article.category_name }}</td>
          <td class="value">
            <n-time :time="article.create_time" />
          </td>
          <td class="value">
            <n-time :time="article.update_time || article.create_time" />
          </td>
          <td class="value">{{ article.read_count }}</td>
          <td class="value">{{ article.comment_count }}</td>
          <td class="value">
            <n-switch
              v-model:value="article.top"
              size="small"
              :checked-value="1"
              :unchecked-value="0"
              @update:value="isTop(article)"
            />
          </td>
          <td class="value">
            <n-space align="center" justify="center">
              <n-button type="primary" size="small" text @click="openArticle(article.id)">查看</n-button>
              <n-button type="warning" size="small" text @click="editArticle(article.id)">编辑</n-button>

              <n-popconfirm @positive-click="deleteArticle(article.id)">
                <template #trigger>
                  <n-button type="error" size="small" text>删除</n-button>
                </template>
                <span>确定删除该文章?</span>
              </n-popconfirm>
            </n-space>
          </td>
        </tr>
      </tbody>
    </n-table>
    <div class="mt-4 flex items-center justify-end">
      <n-pagination
        @update:page="handlePageChange"
        @update:page-size="handlePageSizeChange"
        :item-count="total"
        :page-sizes="pageSizes"
        v-model:page="page"
        v-model:page-size="pageSize"
        size="small"
        show-size-picker
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { getAllArticleApi, deleteArticleApi, setTopArticleApi } from "@/apis/article";
import router from "@/router";

interface Article {
  id: number;
  category_id: number;
  category_name: string;
  title: string;
  description: string;
  read_count: number;
  comment_count: number;
  create_time: number;
  update_time: number | null;
  top: number;
}

const message = useMessage();
const articleList = ref<Article[]>([]);
const page = ref(1);
const pageSize = ref(20);
const total = ref(0);
const pageSizes = [
  {
    label: "10 每页",
    value: 10,
  },
  {
    label: "20 每页",
    value: 20,
  },
  {
    label: "30 每页",
    value: 30,
  },
  {
    label: "40 每页",
    value: 40,
  },
];
// 获取文章列表
const getArticleList = async (page: number, pageSize: number) => {
  const res = await getAllArticleApi(page, pageSize);
  if (res.code === 200) {
    articleList.value = res.data.list;
    total.value = res.data.total;
  }
};
// 页码变化
const handlePageChange = (num: number) => {
  page.value = num;
  getArticleList(num, pageSize.value);
};

// 页面大小变化
const handlePageSizeChange = (size: number) => {
  pageSize.value = size;
  getArticleList(page.value, size);
};

// 打开文章
const openArticle = (id: number) => {
  router.push(`/detail/${id}`);
};

// 编辑文章
const editArticle = (id: number) => {
  router.push({ name: "edit-article", query: { id } });
};

// 置顶
const isTop = async (article: Article) => {
  // TODO: 实现置顶功能
  const res = await setTopArticleApi(article.id, article.top);
  if (res.code === 200) {
    message.success(res.msg);
  }
};

// 删除文章
const deleteArticle = async (id: number) => {
  // TODO: 实现删除文章功能
  const res = await deleteArticleApi(id);
  if (res.code === 200) {
    getArticleList(page.value, pageSize.value);
    message.success(res.msg);
  }
};
onMounted(() => {
  getArticleList(page.value, pageSize.value);
});
</script>

<style lang="scss" scoped>
.title {
  @apply text-center;
}
.value {
  @apply text-center cursor-pointer;
  &:first-child {
    @apply text-left;
  }
}
</style>
