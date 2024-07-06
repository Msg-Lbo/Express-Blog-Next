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
          :model="userinfo"
          :rules="userInfoRule"
          label-placement="top"
          label-width="auto"
          require-mark-placement="right-hanging"
          size="small"
          :style="{
            Width: '100%',
          }"
        >
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="12" label="账号" path="account">
              <n-input v-model:value="userinfo.account" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="昵称" path="nickname">
              <n-input v-model:value="userinfo.nickname" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="身份" path="identity">
              <n-input v-model:value="userinfo.identity" placeholder="Input" disabled />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="邮箱" path="email">
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
          :rules="settingsRule"
          require-mark-placement="right-hanging"
          size="small"
          :style="{
            Width: '100%',
          }"
        >
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="12" label="网站主标题" path="Title">
              <n-input v-model:value="settings.Title" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="网站Logo(一级)-暂时无用" path="LogoText">
              <n-input v-model:value="settings.LogoText" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="网站Logo(二级)-暂时无用" path="LogoText2">
              <n-input v-model:value="settings.LogoText2" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="网站Logo" path="Logo">
              <n-input v-model:value="settings.Logo" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="Ico图标" path="Ico">
              <n-input v-model:value="settings.Ico" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="ICP备案号" path="Icp">
              <n-input v-model:value="settings.Icp" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="公安备案号" path="GongAn">
              <n-input v-model:value="settings.GongAn" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="萌国备案号" path="MoeIcp">
              <n-input v-model:value="settings.MoeIcp" placeholder="Input" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="站点域名(不包含尾部/)" path="Domain">
              <n-input v-model:value="settings.Domain" placeholder="Input" />
            </n-form-item-gi>
          </n-grid>
        </n-form>
        <n-button type="success" @click="saveSettings()">保存</n-button>
      </n-tab-pane>
      <n-tab-pane
        class="h-[calc(100vh-200px)]"
        name="轮播图设置"
        tab="轮播图设置"
        @click.stop="activeCarouselEdit = undefined"
      >
        <n-table :single-line="true" striped size="small">
          <thead>
            <tr>
              <th class="title">
                <span>轮播图标题</span>
                <n-divider vertical />
                <n-button type="primary" size="small" text @click="addCarousel()"> 新增轮播图 </n-button>
                <n-divider vertical />
                <n-gradient-text type="info">编辑完后记得保存哦</n-gradient-text>
              </th>
              <th class="title text-center">封面</th>
              <th class="title text-center">链接</th>
              <th class="title text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in Carousel" :key="index">
              <td class="value cursor-text" @click.stop="activeCarouselEdit = item.id">
                <n-input
                  v-if="activeCarouselEdit === item.id"
                  placeholder="输入轮播图标题"
                  @keyup.enter="saveCarousel()"
                  v-model:value="item.title"
                />
                <span v-else>
                  <n-ellipsis style="width: 240px">
                    {{ item.title || "无标题" }}
                  </n-ellipsis>
                </span>
              </td>
              <td class="value" @click.stop="activeCarouselEdit = item.id">
                <n-input
                  v-if="activeCarouselEdit === item.id"
                  placeholder="输入轮播图封面"
                  @keyup.enter="saveCarousel()"
                  v-model:value="item.cover"
                />
                <span v-else>
                  <n-ellipsis style="width: 240px">
                    {{ item.cover || "未设置封面" }}
                  </n-ellipsis>
                </span>
              </td>
              <td class="value" @click.stop="activeCarouselEdit = item.id">
                <n-input
                  v-if="activeCarouselEdit === item.id"
                  placeholder="输入轮播图链接"
                  @keyup.enter="saveCarousel()"
                  v-model:value="item.link"
                />
                <span v-else>
                  <n-ellipsis style="width: 240px">
                    {{ item.link || "无链接" }}
                  </n-ellipsis>
                </span>
              </td>
              <td class="value">
                <n-space align="center" justify="left">
                  <n-button
                    type="primary"
                    size="small"
                    text
                    @click="saveCarousel()"
                    v-if="activeCarouselEdit === item.id"
                    >保存</n-button
                  >
                  <n-popconfirm @positive-click="deleteCarousel(item.id)" v-else>
                    <template #trigger>
                      <n-button type="error" size="small" text>删除</n-button>
                    </template>
                    <span>确定删除这个轮播图?</span>
                  </n-popconfirm>
                </n-space>
              </td>
            </tr>
          </tbody>
        </n-table>
      </n-tab-pane>
      <n-tab-pane name="友链模板" tab="友链模板">
        <MdEditor
          class="markdown-editor"
          v-model="settings.FriendTemplate"
          @on-save="saveFriendTemplate"
          @onUploadImg="onUploadImg"
          theme="dark"
        />
      </n-tab-pane>
      <n-tab-pane name="关于" tab="关于">
        <MdEditor
          class="markdown-editor"
          v-model="settings.About"
          @on-save="saveAbout"
          @onUploadImg="onUploadImg"
          theme="dark"
        />
      </n-tab-pane>
    </n-tabs>
    <update-password :showModal="showModal" @on-cancel="showModal = false" @on-confirm="updatePwd"></update-password>
  </main>
</template>

<script setup lang="ts">
import { useSettingsStore } from "@/store/settings";
import { useUserInfoStore } from "@/store/user";
import { MdEditor } from "md-editor-v3";
import { FormRules } from "naive-ui";
import "md-editor-v3/lib/style.css";
import { uploadImageApi } from "@/apis/image";
import { useMessage } from "naive-ui";
const settingsStore = useSettingsStore();
const userInfoStore = useUserInfoStore();

const settings = computed(() => settingsStore.settings!);
const userinfo = computed(() => userInfoStore.userInfo!);
const message = useMessage();
const fileInputRef = ref<HTMLInputElement | null>(null);
const showModal = ref(false);
const Carousel = computed(() => settingsStore.carousel!);
const activeCarouselEdit = ref<number | undefined>(undefined);
const carouselForm = ref({
  id: -1,
  title: "",
  cover: "",
  link: "",
});

const settingsRule: FormRules ={
  Title: [{ required: true, message: "请输入网站主标题" , trigger: "blur" }],
  LogoText: [{ required: false, message: "请输入网站Logo(一级)" , trigger: "blur" }],
  LogoText2: [{ required: false, message: "请输入网站Logo(二级)" , trigger: "blur" }],
  Logo: [{ required: true, message: "请输入网站Logo" , trigger: "blur" }],
  Ico: [{ required: true, message: "请输入Ico图标" , trigger: "blur" }],
  Icp: [{ required: false, message: "请输入ICP备案号" , trigger: "blur" }],
  GongAn: [{ required: false, message: "请输入公安备案号" , trigger: "blur" }],
  MoeIcp: [{ required: false, message: "请输入萌ICP备案号" , trigger: "blur" }],
  Domain: [{ required: true, message: "请输入站点域名(不包含尾部/)" , trigger: "blur" }],
}

const userInfoRule: FormRules = {
  account: [{ required: true, message: "请输入账号" , trigger: "blur" }],
  nickname: [{ required: true, message: "请输入昵称" , trigger: "blur" }],
  email: [{ required: true, message: "请输入邮箱" , trigger: "blur" }],
}

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
  const isImg = /\.(jpg|jpeg|png|gif)$/i.test(fileName);
  if (!isImg) {
    message.error("请上传图片格式文件");
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
// 保存基础设置
const saveSettings = () => {
  settingsStore.handleSaveSettings();
};
// 保存友链模板
const saveFriendTemplate = () => {
  settingsStore.handleSaveFriendTemplate();
};
// 保存关于
const saveAbout = () => {
  settingsStore.handleSaveAbout();
};
// 更新用户信息
const updateUserInfo = () => {
  userInfoStore.handleUpdateUserInfo();
};
// 选择头像
const chooseAvatar = () => {
  fileInputRef.value?.click();
};
// 修改密码
const updatePwd = (e: any) => {
  userInfoStore.handleUpdatePassword(e.oldPwd, e.newPwd);
  showModal.value = false;
};
const addCarousel = () => {
  if (Carousel.value) Carousel.value.push(carouselForm.value);
};
// 保存轮播图
const saveCarousel = () => {
  if (activeCarouselEdit.value === -1) {
    settingsStore.handleSaveCarousel(carouselForm.value);
  } else {
    settingsStore.handleUpdateCarousel(Carousel.value.find((item) => item.id === activeCarouselEdit.value)!);
  }
  activeCarouselEdit.value = undefined;
};
// 删除轮播图
const deleteCarousel = (id: number) => {
  settingsStore.handleDeleteCarousel(id);
  activeCarouselEdit.value = undefined;
  Carousel.value.splice(
    Carousel.value.findIndex((item) => item.id === id),
    1
  );
};
onMounted(() => {
  settingsStore.handleGetSettings();
  settingsStore.handleGetCarousel();
});
</script>

<style lang="scss" scoped>
.markdown-editor {
  min-height: calc(100vh - 200px);
}
</style>
