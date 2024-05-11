<template>
  <main class="p-4">
    <n-tabs type="line" animated placement="left">
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
            <n-form-item-gi :span="12" label="头像" path="inputValue">
              <n-input v-model:value="settings.Avatar" placeholder="Input" />
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
    </n-tabs>
  </main>
</template>

<script setup lang="ts">
import { useSettingsStore } from "@/store/settings";
const settingsStore = useSettingsStore();
const settings = computed(() => settingsStore.settings!);
const rss = computed(() => settingsStore.rss!);

onMounted(() => {
  settingsStore.getSettings();
  settingsStore.getRss();
});


const saveSettings = () => {
  settingsStore.saveSettings()
};
const saveRss = () => {
  settingsStore.saveRss()
};
</script>

<style lang="scss" scoped></style>
