<template>
  <header class="admin-header">
    <h1>Admin Dashboard</h1>
    <n-dropdown :options="options" :on-select="handleSelect" >
      <n-avatar class="flex items-center cursor-pointer" round size="large" :src="settings.Avatar" />
    </n-dropdown>
  </header>
</template>

<script setup lang="ts">
import { computed, h, ref } from "vue";
import type { Component } from "vue";
import { NIcon } from "naive-ui";
import { Logout } from "@icon-park/vue-next";
const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};
const props = defineProps({
  settings: {
    type: Object,
    required: true,
  },
  userInfo: {
    type: Object,
  },
});

const options = ref([
  {
    label: "退出登录",
    key: "logout",
    icon: renderIcon(Logout),
  },
]);

const settings = computed(() => props.settings);
const emits = defineEmits(["logout"]);
const handleSelect = (key: string) => {
  if (key === "logout") {
    emits("logout")
  }
}
</script>

<style lang="scss" scoped>
.admin-header {
  @apply px-6 py-4 flex items-center justify-between;
}
</style>
