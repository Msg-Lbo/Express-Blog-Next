<template>
  <main class="links-container">
    <section>
      <p class="text-center text-[25px] font-bold tracking-widest">Links</p>
      <n-divider dashed style="margin: 10px 0" />
      <div class="content">
        <div class="link-card" tag="a" v-for="(item, index) in friendList" :key="index" @click="toLink(item.link)">
          <n-avatar size="large" :src="item.logo" />
          <div class="info">
            <p class="name line">
              <n-ellipsis :line-clamp="1">{{ item.name }}</n-ellipsis>
            </p>
            <p class="description line">
              <n-ellipsis :line-clamp="1">{{ item.description }}</n-ellipsis>
            </p>
          </div>
        </div>
      </div>
    </section>
    <section>
      <MdPreview :modelValue="settings.FriendTemplate" previewTheme="github" />
    </section>
    <section>
      <n-divider dashed style="margin: 10px 0" />
      <comment-view articleId="friends"></comment-view>
    </section>
  </main>
</template>

<script setup lang="ts">
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { getFriendByPassApi } from "@/apis/friend";
import { onMounted, ref } from "vue";
import { useSettingsStore } from "@/store/settings";

interface Friend {
  name: string;
  logo: string;
  description: string;
  link: string;
}

const friendList = ref<Friend[]>([]);
const settingsStore = useSettingsStore();

const settings = computed(() => settingsStore.settings!);
// 获取友链列表
const getFriendList = async () => {
  const res = await getFriendByPassApi();
  if (res.code === 200) {
    friendList.value = res.data;
  }
};

// 跳转到友链链接
const toLink = (link: string) => {
  window.open(link);
};

onMounted(() => {
  getFriendList();
});
</script>

<style lang="scss" scoped>
.links-container {
  @apply h-full p-4 flex flex-col justify-between;
  .content {
    @apply grid gap-3;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    .link-card {
      @apply flex items-center gap-2 border rounded p-2 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer;
      .info {
        @apply flex-1;
        .line {
          @apply flex items-center;
        }
        .name {
          @apply font-bold text-lg;
        }
        .description {
          @apply text-sm;
        }
      }
    }
  }
}
</style>
