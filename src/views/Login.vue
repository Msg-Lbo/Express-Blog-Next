<template>
  <main class="login-main">
    <div class="login-container">
      <h1 class="text-3xl font-bold mb-8">登录</h1>
      <n-form ref="formRef" :model="loginForm" :rules="rules">
        <n-form-item path="account" label="用户名" class="w-[400px]">
          <n-input v-model:value="loginForm.account" />
        </n-form-item>
        <n-form-item path="password" label="密码" class="w-[400px]">
          <n-input type="password" v-model:value="loginForm.password" @keydown.enter="handleSubmit"/>
        </n-form-item>
        <n-form-item>
          <n-button type="primary" class="w-[400px]" @click="handleSubmit">登录</n-button>
        </n-form-item>
      </n-form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FormRules } from "naive-ui";
import { useUserInfoStore } from "@/store/user";
interface LoginForm {
  account: string;
  password: string;
}
const userInfoStore = useUserInfoStore();
const loginForm = ref<LoginForm>({
  account: "",
  password: "",
});
const rules: FormRules = {
  account: [
    { required: true, message: "请输入用户名" },
    { type: "string", min: 3, max: 10, message: "用户名长度必须在3到10个字符之间" },
  ],
  password: [
    { required: true, message: "请输入密码" },
    { type: "string", min: 6, max: 12, message: "密码长度必须在6到12个字符之间" },
  ],
};
const handleSubmit = async () => {
  if (!loginForm.value) {
    return;
  }
  userInfoStore.handleLogin(loginForm.value);
};
</script>

<style lang="scss" scoped>
.login-main {
  @apply h-[calc(100vh-200px)] w-full flex justify-center items-center p-4;
  .login-container {
    @apply bg-white rounded-lg shadow-lg p-8;
  }
}
</style>
