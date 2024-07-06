<template>
  <main class="p-4">
    <n-form ref="formRef" :model="articleForm">
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi :span="8" label="标题" path="title">
          <n-input v-model:value="articleForm.title" placeholder="请输入标题" />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="标题/描述" path="desc">
          <n-input v-model:value="articleForm.description" placeholder="请输入描述" />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="标签(英文逗号分隔)" path="tags">
          <n-input v-model:value="articleForm.tags" placeholder="请输入" />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="分类" path="category">
          <n-select v-model:value="articleForm.category_id" placeholder="请选择" :options="categoryList" />
        </n-form-item-gi>

        <n-form-item-gi :span="8" label="发布时间" path="creat_time">
          <n-date-picker
            v-model:value="articleForm.create_time"
            value-format="yyyy.MM.dd HH:mm:ss"
            type="datetime"
            clearable
            style="width: 100%"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="更新时间" path="update_time">
          <n-date-picker
            v-model:value="articleForm.update_time"
            value-format="yyyy.MM.dd HH:mm:ss"
            type="datetime"
            clearable
            style="width: 100%"
          />
        </n-form-item-gi>
      </n-grid>
    </n-form>
    <MdEditor v-model="articleForm.content" @on-save="saveArticle" @onUploadImg="onUploadImg" theme="dark" />
  </main>
</template>

<script setup lang="ts">
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { useRoute } from "vue-router";
import { getArticleDetailApi, saveArticleApi } from "@/apis/article";
import { getAllCategoryApi } from "@/apis/category";
import { uploadImageApi } from "@/apis/image";
import { useSettingsStore } from "@/store/settings";
const settingsStore = useSettingsStore();
const settings = computed(() => settingsStore.settings!);
interface ArticleForm {
  id?: number;
  title: string;
  description: string;
  content: string;
  category_id: number | null;
  category_name: string;
  tags?: string;
  create_time: number | null;
  update_time: number | null;
}

const message = useMessage();
const route = useRoute();
const categoryList = ref([]);
const id = ref(route.query.id);
const articleForm = ref<ArticleForm>({
  title: "",
  description: "",
  content: "",
  category_id: null,
  category_name: "",
  tags: "",
  create_time: null,
  update_time: null,
});

// 获取文章详情
const getArticleDetail = async (id: string | number) => {
  const res = await getArticleDetailApi(id);
  if (res.code === 200) {
    articleForm.value = res.data;
  }
};
// 获取所有分类
const getAllCategory = async () => {
  const res = await getAllCategoryApi();
  if (res.code === 200) {
    categoryList.value = res.data.map((item: { id: number; category_name: string }) => {
      return {
        label: item.category_name,
        value: item.id,
      };
    });
  }
};
// 保存文章
const saveArticle = async () => {
  const res = await saveArticleApi(articleForm.value);
  if (res.code === 200) {
    message.success("保存成功");
    articleForm.value.id = res.data.id;
  }
};

// 上传图片
const onUploadImg = async (files: any, callback: (urls: string[]) => void) => {
  const res = await Promise.all(
    files.map((file: any) => {
      return uploadImg(file);
    })
  );
  // 方式一
  // console.log(res);
  callback(
    res.map((item) => {
      return settings.value.Domain + item[0];
    })
  );
};

// 上传图片主函数
const uploadImg = async (file: any) => {
  const form = new FormData();
  form.append("file", file);
  try {
    const res = await uploadImageApi(form);
    if (res.code === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
    message.error("上传失败");
  }
};

onMounted(() => {
  getAllCategory();
  if (id.value) {
    getArticleDetail(id.value as string | number);
  }
});
</script>

<style lang="scss" scoped></style>
