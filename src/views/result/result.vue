<template>
  <main class="result">
    <n-result :status="result.status" :title="result.title" :description="result.description">
      <template #footer>
        <n-button @click="handleBack">{{ result.footer }}</n-button>
      </template>
    </n-result>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const alias = computed(() => route.path.split("/")[2]);

interface ResultItem {
  status: string;
  title: string;
  description: string;
  footer: string;
}

const resltList = ref<ResultItem[]>([
  {
    status: "404",
    title: "404 资源不存在",
    description: "生活总归带点荒谬",
    footer: "回去看看",
  },
  {
    status: "500",
    title: "500 服务器错误",
    description: "服务器出错可能说明该雇更多程序员了",
    footer: "散财消灾",
  },
  {
    status: "403",
    title: "403 禁止访问",
    description: "总有些门是对你关闭的",
    footer: "放轻松",
  },
  {
    status: "warning",
    title: "访问失败",
    description: "总能发现一些奇奇怪怪的问题",
    footer: "再试试",
  },
]);

// 取回对应状态码的结果
const result = computed(() => {
  const status = alias.value;
  return resltList.value.find((item) => item.status === status) || resltList.value[0];
});

const handleBack = () => {
  router.push("/");
};
</script>

<style lang="scss" scoped>
.result {
  @apply flex justify-center items-center h-full p-4;
}
</style>
