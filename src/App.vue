<template>
  <main>
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
      <n-modal-provider>
        <n-message-provider>
          <router-view></router-view>
        </n-message-provider>
      </n-modal-provider>
    </n-config-provider>
  </main>
</template>

<script setup lang="ts">
import { zhCN, dateZhCN } from "naive-ui";
import { useSettingsStore } from "@/store/settings";
const settingsStore = useSettingsStore();
const settings = computed(() => settingsStore.settings!);

onMounted(() => {
  settingsStore.setFavicon(settings.value.Ico);
});
</script>

<style lang="scss" scoped></style>
