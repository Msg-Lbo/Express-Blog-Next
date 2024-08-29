<template>
  <main>
    <div class="header" :style="{top: isHeaderHidden? '-40px' : '0px'}">
      <header-view></header-view>
    </div>
    <div class="container">
      <div class="carousel" v-if="isHome && Carousel && Carousel.length > 0">
        <carousel-view :Carousel="Carousel"></carousel-view>
      </div>
      <div class="content">
        <div class="left-content relative">
          <router-view></router-view>
        </div>
        <div class="right-content" v-if="!disabledPath.includes(mainRouter)">
          <sider-view ref="sider" :Avatar="settings.Avatar"></sider-view>
        </div>
      </div>
      <div class="footer">
        <footer-view :GongAn="settings?.GongAn" :Icp="settings?.Icp" :MoeIcp="settings?.MoeIcp"></footer-view>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
// import router from "@/router";
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useSettingsStore } from "@/store/settings";
const settingsStore = useSettingsStore();
const settings = computed(() => settingsStore.settings!);
const Carousel = computed(() => settingsStore.carousel!);
const route = useRoute();
const isHome = computed(() => route.name === "home");
// 取第一个
const mainRouter = computed(() => route.path.split("/")[1]);

const disabledPath = ["detail", "login", "about"];

const sider = ref<any>();
const isHeaderHidden = ref(false);
let lastScrollPosition = 0;
const handleScroll = () => {
  const currentScrollPosition = window.scrollY;

  if (currentScrollPosition < lastScrollPosition) {
    // 向上滚动
    isHeaderHidden.value = false;
  } else {
    // 向下滚动
    isHeaderHidden.value = true;
  }

  lastScrollPosition = currentScrollPosition;
};

onMounted(() => {
  settingsStore.handleGetSettings();
  settingsStore.handleGetCarousel();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  sider.value = null;
});
</script>

<style lang="scss" scoped>
.header {
  @apply fixed top-0 left-0 w-full min-h-[40px] px-5 shadow-sm text-sm z-10 bg-[#3E4454] text-white duration-300 ease-in-out;
}

.container {
  @apply max-w-[1210px] mx-auto mt-12 w-full h-[calc(100vh-80px)];
  .carousel {
    @apply mb-2 mx-auto h-[150px] rounded overflow-hidden;
    box-shadow: 1px 1px 5px rgb(0 0 0 / 5%);
  }
  .content {
    @apply flex gap-2 mx-auto;
    .left-content {
      @apply w-full bg-white rounded;
      box-shadow: 1px 1px 5px rgb(0 0 0 / 5%);
    }
    .right-content {
      @apply min-w-[250px] h-full;
    }
  }
  .footer {
    @apply mt-2 flex rounded justify-center items-center min-h-[70px] bg-[#3E4454] text-white text-sm;
    box-shadow: 1px 1px 5px rgb(0 0 0 / 5%);
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
