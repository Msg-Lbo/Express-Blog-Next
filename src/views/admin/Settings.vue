<template>
  <main class="p-4">
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
  </main>
</template>

<script setup lang="ts">
import { useSettingsStore } from "@/store/settings";
const settingsStore = useSettingsStore();
const settings = computed(() => settingsStore.settings!);

</script>

<style lang="scss" scoped></style>
