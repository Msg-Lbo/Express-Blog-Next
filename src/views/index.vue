<template>
  <main>
    <div class="header">
      <header-view></header-view>
    </div>
    <div class="container">
      <div class="banner" v-if="isHome">
        <banner-view></banner-view>
      </div>
      <div class="content">
        <div class="left-content relative">
          <router-view></router-view>
        </div>
        <div class="right-content" v-if="!disabledPath.includes(mainRouter)">
          <sider-view ref="sider" :Avatar="userinfo.avatar"></sider-view>
        </div>
      </div>
      <div class="footer">
        <footer-view
          :GongAn="settings?.GongAn"
          :Icp="settings?.Icp"
          :MoeIcp="settings?.MoeIcp"
        ></footer-view>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
// import router from "@/router";
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useSettingsStore } from "@/store/settings";
import { useUserInfoStore } from "@/store/user";
const userInfoStore = useUserInfoStore();
const userinfo = computed(() => userInfoStore.userInfo!);
const settingsStore = useSettingsStore();
const settings = computed(() => settingsStore.settings);
const route = useRoute();
const isHome = computed(() => route.name === "home");
// 取第一个
const mainRouter = computed(() => route.path.split("/")[1]);

const disabledPath = ["detail", "login", "about"];

const sider = ref<any>();
onMounted(() => {
  settingsStore.handleGetSettings();
  settingsStore.handleGetRss();
});
</script>

<style lang="scss" scoped>
.header {
  @apply fixed top-0 left-0 w-full min-h-[40px] px-5 shadow-sm text-sm z-10 bg-[#3E4454] text-white;
}

.container {
  @apply max-w-[1210px] mx-auto mt-12 w-full h-[calc(100vh-80px)];
  .banner {
    @apply mb-2 mx-auto h-[150px] rounded overflow-hidden;
    box-shadow: 1px 1px 5px rgb(0 0 0 / 5%);
  }
  .content {
    @apply flex gap-2 mx-auto;
    .left-content {
      @apply flex-1 bg-white rounded;
      box-shadow: 1px 1px 5px rgb(0 0 0 / 5%);
    }
    .right-content {
      @apply min-w-[250px] h-full;
    }
  }
  .footer {
    @apply mt-4;
  }
}

@media screen and (max-width: 768px) {
  .container {
    @apply top-[70px];
    .right-content {
      display: none;
    }
  }
}
</style>
