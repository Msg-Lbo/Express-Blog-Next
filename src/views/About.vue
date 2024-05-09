<template>
  <main class="p-4">
    <section>
      <p class="text-center mb-5 text-xl font-bold">关于</p>
      <MdPreview :modelValue="aboutContent" previewTheme="github" />
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
import { ref } from "vue";
const aboutContent = ref("123123123");
</script>

<style lang="scss" scoped></style>
