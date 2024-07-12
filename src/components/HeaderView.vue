<template>
  <main>
    <header>
      <div class="header-view">
        <div class="logo">
          <img class="logo-img" :src="settings.Logo" alt="logo" />
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
        <div class="menu-drawer-btn" @click="drawerVisible = true">
          <menu-fold theme="outline" size="24" :strokeWidth="3" />
        </div>
        <div class="menu-drawer md:hidden">
          <n-drawer class="md:hidden" v-model:show="drawerVisible" :width="200" placement="right">
            <n-drawer-content title="导航">
              <div class="menu-drawer-content">
                <div class="menu-drawer-item" v-for="item in menuOptions" :key="item.alias" @click="toPath(item.alias)">
                  <router-link to="">{{ item.label }}</router-link>
                </div>
              </div>
            </n-drawer-content>
          </n-drawer>
        </div>
      </div>
    </header>
  </main>
</template>

<script setup lang="ts">
import router from "@/router";
import { useRoute } from "vue-router";
import { getActiveNavigationsApi } from "@/apis/navigations";
import { useSettingsStore } from "@/store/settings";
import { useUserInfoStore } from "@/store/user";
import { MenuFold } from "@icon-park/vue-next";
const route = useRoute();
const settingsStore = useSettingsStore();
const userInfoStore = useUserInfoStore();
const settings = computed(() => settingsStore.settings);
const userInfo = computed(() => userInfoStore.userInfo);
const activeKey = ref<string | null>(route.path);
const drawerVisible = ref(false);
const manager = computed(() => [
  {
    label: "管理",
    alias: "manager",
    status: userInfo.value?.identity === "admin",
  },
  {
    label: "登录",
    alias: "login",
    status: userInfo.value?.identity !== "admin",
  },
]);
const menuOptions = ref();

// 获取导航数据
const getNavigations = async () => {
  const res = await getActiveNavigationsApi();
  if (res.code === 200) {
    menuOptions.value = res.data;
  }
};
const toPath = (alias: string) => {
  if (alias.startsWith("https")) {
    window.open(alias);
  } else {
    activeKey.value = alias;
    router.push(`/${alias}`);
  }
};
onMounted(() => {
  getNavigations();
});
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
    @apply hidden md:flex items-center justify-end gap-1;
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
  .menu-drawer-btn {
    @apply md:hidden fixed top-0 right-0 z-50 h-10 w-10 flex items-center justify-center;
  }
}
</style>
