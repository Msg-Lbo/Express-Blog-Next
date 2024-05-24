<template>
  <main class="p-4">
    <n-table :single-line="true" striped size="small">
      <thead>
        <tr>
          <th class="title">
            <span>图片链接</span>
            <n-divider vertical />
            <n-button type="primary" size="small" text @click="chooseImage()">上传图片</n-button>
            <input type="file" accept="image/*" ref="fileInputRef" @change="handleFileUpload" style="display: none" />
          </th>
          <th class="title text-center">名字</th>
          <th class="title text-center">缩略图</th>
          <th class="title text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in imgList" :key="index">
          <td class="value cursor-text">
            <a :href="`${item.url}`">{{ item.url }}</a>
          </td>
          <td class="value text-left" style="width: 200px">
            <n-ellipsis style="width: 200px">
              {{ item.image_name }}
            </n-ellipsis>
          </td>
          <td class="value text-center" style="width: 100px">
            <img :src="item.url" alt="图片" class="mx-auto my-0" style="width: 20px; height: 20px; object-fit: cover" />
          </td>
          <td class="value text-center" style="width: 150px">
            <n-space align="center" justify="center">
              <n-button type="primary" text size="small" @click="handleCopyLink(item.url)">复制链接</n-button>
              <n-button type="error" text size="small">删除</n-button>
            </n-space>
          </td>
        </tr>
      </tbody>
    </n-table>
  </main>
</template>

<script setup lang="ts">
import { uploadImageApi, getImageListApi } from "@/apis/image";
import { useMessage } from "naive-ui";
import { useSettingsStore } from "@/store/settings";
const settingsStore = useSettingsStore();
const settings = computed(() => settingsStore.settings!);

interface ImgItem {
  id: number;
  image_id: number;
  image_name: string;
  url: string;
}

const message = useMessage();
const page = ref(1);
const pageSize = ref(10);
const imgList = ref<ImgItem[]>();
const fileInputRef = ref<HTMLInputElement | null>(null);
// 复制链接
const handleCopyLink = async (url: string) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(settings.value.Domain + url);
      message.success("链接已复制");
    } catch (err) {
      console.error('无法复制链接', err);
    }
  } else {
    message.error('当前环境不支持写入剪贴板,仅支持localhost，https');
  }
};


const chooseImage = () => {
  fileInputRef.value?.click();
};
// 选择文件
const handleFileUpload = (e: any) => {
  const files = Array.from(e.target.files) as File[];
  // FileList转为File数组
  if (files.length === 0) {
    return;
  }
  // 如果图片名包含特殊字符
  const fileName = files[0].name;
  const isSpecialChar = /[\\/:*?"<>|]/.test(fileName);
  if (isSpecialChar) {
    message.error("图片名不能包含特殊字符");
    return;
  }
  // 如果图片是其他格式修改的后缀名
  const isImg = /\.(jpg|jpeg|png|gif|ico|svg)$/i.test(fileName);
  if (!isImg) {
    message.error("请上传图片格式文件");
    return;
  }
  onUploadImg(files, (_urls) => {
    return;
  });
};
// 上传图片
const onUploadImg = async (files: any, callback: (urls: string[]) => void) => {
  const res = await Promise.all(
    files.map((file: any) => {
      console.log(file);
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
// 获取图片列表
const getImgList = async () => {
  const res = await getImageListApi(page.value, pageSize.value);
  if (res.code === 200) {
    imgList.value = res.data.list;
    if (imgList.value) {
      imgList.value.forEach((item) => {
        item.url = settings.value.Domain + item.url;
      });
    }

  } else {
  }
};
onMounted(() => {
  getImgList();
});
</script>

<style lang="scss" scoped>
th {
  text-align: center;

  &:first-child {
    text-align: left;
  }
}
</style>
