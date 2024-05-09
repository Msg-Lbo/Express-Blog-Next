<template>
  <main>
    <n-config-provider :theme="darkTheme">
      <n-layout>
        <n-layout-header>
          <admin-header :settings="settings" :user-info="userInfo" @logout="logout"></admin-header>
        </n-layout-header>
        <n-layout has-sider>
          <n-layout-sider
            show-trigger
            collapse-mode="width"
            :collapsed-width="64"
            :width="240"
            :native-scrollbar="false"
            style="height: calc(100vh - 125px)"
          >
            <admin-menu></admin-menu>
          </n-layout-sider>
          <n-layout style="height: calc(100vh - 125px)" :native-scrollbar="false">
            <router-view></router-view>
          </n-layout>
        </n-layout>
        <n-layout-footer>
          <admin-footer></admin-footer>
        </n-layout-footer>
      </n-layout>
    </n-config-provider>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUserInfoStore } from "@/store/user";
import { useSettingsStore } from "@/store/settings";
import { darkTheme } from "naive-ui";

const userStore = useUserInfoStore();
const settingsStore = useSettingsStore();

const settings = computed(() => settingsStore.settings);
const userInfo = computed(() => userStore.userInfo);

// 退出登录
const logout = () => {
  userStore.handleLogout();
};
</script>

<style lang="scss" scoped></style>
