<template>
  <main class="p-4">
    <section>
      <p class="text-center mb-5 text-xl font-bold">关于</p>
      <MdPreview :modelValue="settings.About" previewTheme="github" />
    </section>
    <section>
      <n-divider dashed style="margin: 10px 0" />
      <comment-view articleId="about"></comment-view>
    </section>
  </main>
</template>

<script setup lang="ts">
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { useSettingsStore } from "@/store/settings";
const settingsStore = useSettingsStore();
const settings = computed(() => settingsStore.settings!);
</script>

<style lang="scss" scoped></style>
