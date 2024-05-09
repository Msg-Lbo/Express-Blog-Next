<template>
  <main class="p-4">
    <n-table :single-line="true" striped size="small">
      <thead>
        <tr>
          <th class="title">内容</th>
          <th class="title">昵称</th>
          <th class="title">邮箱</th>
          <th class="title">发布时间</th>
          <th class="title">来自文章/页面</th>
          <th class="title">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="comment in commentList" :key="comment.id">
          <td class="value">{{ comment.content }}</td>
          <td class="value">{{ comment.nickname }}</td>
          <td class="value">{{ comment.email }}</td>
          <td class="value">
            <n-time :time="comment.create_time" />
          </td>
          <td class="value">{{ comment.article_title || comment.article_id }}</td>
          <td class="value">
            <n-space align="center" justify="center">
              <n-popconfirm @positive-click="deleteComment(comment.id)">
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
import { deleteCommentApi, getAllCommentApi } from "@/apis/comment";
import { useMessage } from "naive-ui";
import { onMounted, ref } from "vue";

const pageSizes = [10, 20, 30, 50];
const page = ref(1);
const pageSize = ref(10);
const commentList = ref();
const total = ref(0);
const message = useMessage();

const getCommentList = async (page: number, pageSize: number) => {
  const res = await getAllCommentApi(page, pageSize);
  if (res.code === 200) {
    commentList.value = res.data.list;
    total.value = res.data.total;
  }
};

const handlePageChange = (page: number) => {
  getCommentList(page, pageSize.value);
};

const handlePageSizeChange = (pageSize: number) => {
  getCommentList(page.value, pageSize);
};

const deleteComment = async (id: number) => {
  const res = await deleteCommentApi(id);
  if (res.code === 200) {
    getCommentList(page.value, pageSize.value);
    message.success(res.msg);
  }
};
onMounted(() => {
  getCommentList(page.value, pageSize.value);
});
</script>

<style lang="scss" scoped>
.title {
  @apply text-center;
  &:first-child {
    @apply text-left;
  }
}
.value {
  @apply text-center cursor-pointer;
  &:first-child {
    @apply text-left;
  }
}
</style>
