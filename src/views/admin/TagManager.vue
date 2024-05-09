<template>
  <main class="p-4">
    <n-alert type="info" :bordered="false">
      <n-popover trigger="click">
        <template #trigger>
          <n-button type="primary" size="small" text>添加标签</n-button>
        </template>
        <n-input v-model:value="newTag" size="small" placeholder="请输入标签名称" />
        <template #footer>
          <n-button type="primary" size="small" text @click="handleSave">保存</n-button>
        </template>
      </n-popover>
      <n-divider vertical />
      <n-gradient-text type="info">删除后，对应文章的标签也会被删除。</n-gradient-text>
    </n-alert>
    <n-divider style="margin: 10px 0" dashed />

    <n-space>
      <!-- <n-dynamic-tags v-model:value="tags" @create="onCreate" @update:value="onChange" /> -->
      <n-tag v-for="tag in tags" :key="tag.id" closable @close="handleDelete(tag)">{{ tag.label }}</n-tag>
    </n-space>
  </main>
</template>

<script setup lang="ts">
import { getAllTags, saveTags, deleteTag } from "@/apis/tag";
interface Tag {
  id: number;
  label: string;
}
const tags = ref<Tag[]>([]);
const message = useMessage();
const newTag = ref("");
const getTages = async () => {
  const res = await getAllTags();
  if (res.code === 200) {
    tags.value = res.data;
  }
};

const handleSave = async () => {
  const res = await saveTags({ label: newTag.value, id: -1 });
  if (res.code === 200) {
    message.success(res.msg);
    getTages();
  }
};

const handleDelete = async (tag: Tag) => {
  const res = await deleteTag(tag.id);
  if (res.code === 200) {
    message.success(res.msg);
    getTages();
  }
};

onMounted(() => {
  getTages();
});
</script>

<style lang="scss" scoped></style>
