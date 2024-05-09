<template>
  <main>
    <header>
      <div class="header-view">
        <div class="logo">
          <img class="logo-img" src="https://q1.qlogo.cn/g?b=qq&nk=24130801&s=100" alt="logo" />
          <router-link to="/">{{ settings?.Title }}</router-link>
        </div>
        <div class="menu-list">
          <div class="menu-item" v-for="item in menuOptions" :key="item.alias" @click="activeKey = item.alias">
            <router-link
              to=""
              @click="toPath(item.alias)"
              class="menu-link"
              :class="{ active: activeKey === item.alias }"
            >
              {{ item.label }}
            </router-link>
          </div>
          <div class="menu-item" v-for="item in manager" :key="item.alias" @click="activeKey = item.alias">
            <router-link
              to=""
              @click="toPath(item.alias)"
              class="menu-link"
              :class="{ active: activeKey === item.alias }"
              v-if="item.status"
            >
              {{ item.label }}
            </router-link>
          </div>
        </div>
      </div>
    </header>
  </main>
</template>

<script setup lang="ts">
import router from "@/router";
import { useRoute } from "vue-router";
import {getActiveNavigationsApi} from "@/apis/navigations";
import { useSettingsStore } from "@/store/settings";
import { useUserInfoStore } from "@/store/user";
const route = useRoute();
const settingsStore = useSettingsStore();
const userInfoStore = useUserInfoStore();
const settings = computed(() => settingsStore.settings);
const userInfo = computed(() => userInfoStore.userInfo);
const activeKey = ref<string | null>(route.path);
const manager = computed(() => [  
  {
    label: "管理",
    alias: "/manager",
    status: userInfo.value?.identity === "admin",
  },
  {
    label: "登录",
    alias: "/login",
    status: userInfo.value?.identity !== "admin",
  },
]);
const menuOptions = ref();


// 获取导航数据
const getNavigations = async () => {
  const res = await getActiveNavigationsApi();
  if (res.code === 200) {
    console.log(res.data);
    menuOptions.value = res.data;
  }

};
const toPath = (alias: string) => {
  if (alias.startsWith("https")) {
    window.open(alias);
  } else {
    activeKey.value = alias;
    router.push(alias);
  }
};
onMounted(() => {
  getNavigations();
})
</script>

<style lang="scss" scoped>
.header-view {
  @apply min-h-[40px] flex justify-between items-center flex-wrap;
  .logo {
    @apply flex items-center gap-2 cursor-pointer;
    img {
      @apply h-8 w-8;
    }
    a {
      @apply text-lg font-bold tracking-widest;
    }
  }
  .menu-list {
    @apply flex items-center justify-end gap-1;
    .menu-item {
      @apply flex items-center justify-center;
      a {
        @apply py-1 px-2;
      }
    }
    .active {
      @apply text-blue-500;
    }
  }
}

// 如果宽度小于 768px
@media (max-width: 768px) {
  .header-view {
    @apply justify-center;
  }
}
</style>
