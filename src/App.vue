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
</script>

<style lang="scss" scoped></style>
