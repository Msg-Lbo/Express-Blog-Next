<template>
  <main class="p-4">
    <n-table :single-line="true" striped size="small">
      <thead>
        <tr>
          <th class="title">
            <span>分类名</span>
            <n-divider vertical />
            <n-button type="primary" size="small" :disabled="isAddCategory" text @click="addCategory">
              新增分类
            </n-button>
            <n-divider vertical />
            <n-gradient-text type="info">编辑完后记得保存哦</n-gradient-text>
          </th>
          <th class="title text-center">别名</th>
          <th class="title text-center">包含文章数</th>
          <th class="title text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categoryList" :key="category.id">
          <td class="value cursor-text" @click="activeCategoryEdit = category.id">
            <n-input
              v-if="activeCategoryEdit === category.id"
              placeholder="输入分类名"
              v-model:value="category.category_name"
            />
            <span v-else>
              {{ category.category_name || "未命名" }}
            </span>
          </td>
          <td class="value cursor-text" @click="activeCategoryEdit = category.id">
            <n-input
              v-if="activeCategoryEdit === category.id"
              placeholder="输入分类名"
              v-model:value="category.category_alias"
            />
            <span v-else>
              {{ category.category_alias || "未命名" }}
            </span>
          </td>
          <td class="value">{{ category.article_count }}</td>
          <td class="value">
            <n-space align="center" justify="center">
              <n-button
                v-if="activeCategoryEdit === category.id"
                type="primary"
                size="small"
                text
                @click="saveCategory(category)"
              >
                保存
              </n-button>
              <n-popconfirm @positive-click="deleteCategory(category.id)" v-else>
                <template #trigger>
                  <n-button type="error" size="small" text>删除</n-button>
                </template>
                <span>确定删除这个分类?</span>
              </n-popconfirm>
            </n-space>
          </td>
        </tr>
      </tbody>
    </n-table>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { getAllCategoryApi, addCategoryApi, deleteCategoryApi, updateCategoryApi } from "@/apis/category";
import { useMessage } from "naive-ui";

interface Category {
  id: number;
  category_name: string;
  category_alias: string;
  article_count: number;
}

const activeCategoryEdit = ref();
const categoryList = ref<Category[]>();
const message = useMessage();
// 是否可以新增分类,如果categoryList中有id为-1的分类，则可以新增分类
const isAddCategory = computed(() => categoryList.value?.some((item) => item.id === -1) || false);
const categoryForm = ref<Category>({
  id: -1,
  category_name: "",
  category_alias: "default",
  article_count: 0,
});

const getCategoryList = async () => {
  const res = await getAllCategoryApi();
  if (res.code === 200) {
    categoryList.value = res.data;
  }
};

// 新增分类
const addCategory = () => {
  categoryList.value!.push(categoryForm.value);
};

// 保存分类
const saveCategory = async (category: any) => {
  if (category.category_name === "" || category.category_alias === "") {
    message.error("分类名和别名不能为空");
    return;
  }
  if (category.id === -1) {
    const res = await addCategoryApi(category.category_name, category.category_alias);
    if (res.code === 200) {
      getCategoryList();
      message.success(res.msg);
    }
  } else {
    const res = await updateCategoryApi(category.id, category.category_name, category.category_alias);
    if (res.code === 200) {
      getCategoryList();
      message.success(res.msg);
    }
  }
  activeCategoryEdit.value = "";
  categoryForm.value = {
    id: -1,
    category_name: "",
    category_alias: "default",
    article_count: 0,
  };
};

// 删除分类
const deleteCategory = async (id: number) => {
  if (id === -1) {
    categoryList.value!.pop();
    return;
  }
  const res = await deleteCategoryApi(id);
  if (res.code === 200) {
    getCategoryList();
    message.success(res.msg);
  }
};

onMounted(() => {
  getCategoryList();
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
  @apply text-center w-40;
  &:first-child {
    @apply text-left w-auto;
  }
}
</style>
