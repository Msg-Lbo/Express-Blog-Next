<template>
  <main class="p-4">
    <n-tabs type="line" animated placement="left">
      <n-tab-pane name="个人信息" tab="个人信息">
        <div class="avatar flex justify-center items-center mb-8">
          <n-avatar
            round
            :size="80"
            class="cursor-pointer"
            v-if="userinfo.avatar"
            :src="userinfo.avatar"
            @click="chooseAvatar()"
          />
          <n-avatar round :size="80" class="cursor-pointer" v-else @click="chooseAvatar()">{{
            userinfo.nickname || "默认头像"
          }}</n-avatar>
          <input type="file" accept="image/*" ref="fileInputRef" @change="handleFileUpload" style="display: none" />
        </div>
        <n-form
          ref="formRef"
          :model="settings"
          label-placement="top"
          label-width="auto"
          require-mark-placement="right-hanging"
          size="small"
          :style="{
            Width: '100%',
          }"
        >
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="12" label="账号" path="inputValue">
              <n-input v-model:value="userinfo.account" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="昵称" path="inputValue">
              <n-input v-model:value="userinfo.nickname" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="身份" path="inputValue">
              <n-input v-model:value="userinfo.identity" placeholder="Input" disabled />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="邮箱" path="inputValue">
              <n-input v-model:value="userinfo.email" placeholder="Input" />
            </n-form-item-gi>
          </n-grid>
        </n-form>
        <n-space>
          <n-button type="success" @click="updateUserInfo()">保存</n-button>
          <n-button type="warning" @click="showModal = true">修改密码</n-button>
        </n-space>
      </n-tab-pane>
      <n-tab-pane name="基础设置" tab="基础设置">
        <n-form
          ref="formRef"
          :model="settings"
          label-placement="top"
          label-width="auto"
          require-mark-placement="right-hanging"
          size="small"
          :style="{
            Width: '100%',
          }"
        >
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="12" label="网站主标题" path="inputValue">
              <n-input v-model:value="settings.Title" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="网站Logo(一级)" path="inputValue">
              <n-input v-model:value="settings.LogoText" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="网站Logo(二级)" path="inputValue">
              <n-input v-model:value="settings.LogoText2" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="网站Logo" path="inputValue">
              <n-input v-model:value="settings.Logo" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="Ico图标" path="inputValue">
              <n-input v-model:value="settings.Ico" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="ICP备案号" path="inputValue">
              <n-input v-model:value="settings.Icp" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="公安备案号" path="inputValue">
              <n-input v-model:value="settings.GongAn" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="萌国备案号" path="inputValue">
              <n-input v-model:value="settings.MoeIcp" placeholder="Input" />
            </n-form-item-gi>
          </n-grid>
        </n-form>
        <n-button type="success" @click="saveSettings()">保存</n-button>
      </n-tab-pane>
      <n-tab-pane name="RSS设置" tab="RSS设置">
        <n-form
          ref="formRef"
          :model="rss"
          label-placement="top"
          label-width="auto"
          require-mark-placement="right-hanging"
          size="small"
          :style="{
            Width: '100%',
          }"
        >
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="12" label="RSS标题" path="inputValue">
              <n-input v-model:value="rss.RssTitle" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="RSS描述" path="inputValue">
              <n-input v-model:value="rss.RssDesc" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="Feed链接" path="inputValue">
              <n-input v-model:value="rss.FeedUrl" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="网站链接" path="inputValue">
              <n-input v-model:value="rss.SiteUrl" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="语言(ps: zh-cn)" path="inputValue">
              <n-input v-model:value="rss.Language" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="版权" path="inputValue">
              <n-input v-model:value="rss.CopyRight" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="网站管理员" path="inputValue">
              <n-input v-model:value="rss.WebMaster" placeholder="Input" />
            </n-form-item-gi>
          </n-grid>
        </n-form>
        <n-button type="success" @click="saveRss()">保存</n-button>
      </n-tab-pane>
      <n-tab-pane name="友链模板" tab="友链模板">
        <MdEditor
          class="markdown-editor"
          v-model="settings.FriendTemplate"
          @on-save="handleSaveFriendTemplate"
          @onUploadImg="onUploadImg"
          theme="dark"
        />
      </n-tab-pane>
      <n-tab-pane name="关于" tab="关于">
        <MdEditor
          class="markdown-editor"
          v-model="settings.About"
          @on-save="handleSaveAbout"
          @onUploadImg="onUploadImg"
          theme="dark"
        />
      </n-tab-pane>
    </n-tabs>
    <update-password
      :showModal="showModal"
      @on-cancel="showModal = false"
      @on-confirm="handleUpdatePassword"
    ></update-password>
  </main>
</template>

<script setup lang="ts">
import { useSettingsStore } from "@/store/settings";
import { useUserInfoStore } from "@/store/user";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { uploadImageApi } from "@/apis/image";
import { useMessage } from "naive-ui";
const settingsStore = useSettingsStore();
const userInfoStore = useUserInfoStore();

const settings = computed(() => settingsStore.settings!);
const userinfo = computed(() => userInfoStore.userInfo!);
const rss = computed(() => settingsStore.rss!);
const message = useMessage();
const fileInputRef = ref<HTMLInputElement | null>(null);
const showModal = ref(false);
// 选择文件
const handleFileUpload = (e: any) => {
  const files = Array.from(e.target.files);
  // FileList转为File数组
  if (files.length === 0) {
    return;
  }
  onUploadImg(files, (urls) => {
    userinfo.value.avatar = urls[0];
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
      return import.meta.env.VITE_IMAGE_URL + item[0];
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

const saveSettings = () => {
  settingsStore.handleSaveSettings();
};
const saveRss = () => {
  settingsStore.handleSaveRss();
};
const handleSaveFriendTemplate = () => {
  settingsStore.handleSaveFriendTemplate();
};
const handleSaveAbout = () => {
  settingsStore.handleSaveAbout();
};
const updateUserInfo = () => {
  userInfoStore.handleUpdateUserInfo();
};
const chooseAvatar = () => {
  fileInputRef.value?.click();
};
const handleUpdatePassword = (e: any) => {
  userInfoStore.handleUpdatePassword(e.oldPwd, e.newPwd);
  showModal.value = false;
};
onMounted(() => {
  settingsStore.handleGetSettings();
  settingsStore.handleGetRss();
});
</script>

<style lang="scss" scoped>
.markdown-editor {
  min-height: calc(100vh - 200px);
}
</style>
