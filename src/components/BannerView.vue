<template>
  <main>
    <n-carousel style="height: 150px; width: 100%">
      <n-image
        width="100%"
        class="w-[100%] h-[150px] flex justify-center"
        lazy
        object-fit="cover"
        preview-disabled
        :src="`https://picsum.photos/1280/150?random=${i}`"
        v-for="i in 3"
        :key="i"
      >
        <template #placeholder>
          <div class="w-[100%] h-[150px] flex items-center justify-center bg-slate-400">
            <loading theme="outline" size="18" class="animate-spin text-slate-300" />
          </div>
        </template>
      </n-image>
    </n-carousel>
  </main>
</template>

<script setup lang="ts">
import { Loading } from '@icon-park/vue-next'
</script>

<style lang="scss" scoped></style>
