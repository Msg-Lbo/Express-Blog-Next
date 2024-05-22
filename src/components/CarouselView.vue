<template>
  <main>
    <n-carousel style="height: 150px; width: 100%">
      <div class="relative" v-for="item in Carousel" :key="item.id">
        <n-image
          width="100%"
          class="w-[100%] h-[150px] flex justify-center relative"
          lazy
          object-fit="cover"
          preview-disabled
          :src="item.cover"
        >
          <template #placeholder>
            <div class="w-[100%] h-[150px] flex items-center justify-center bg-slate-400">
              <loading theme="outline" size="18" class="animate-spin text-slate-300" />
            </div>
          </template>
        </n-image>
        <div class="absolute bottom-0 left-0 p-2 w-full h-full flex justify-between items-end">
          <span class="text-center text-white text-lg font-bold">
            {{ item.title }}
          </span>
          <!-- <n-button quaternary size="small" type="info" @lick="() => router.push(item.link)"> Read More </n-button> -->
        </div>
      </div>
    </n-carousel>
  </main>
</template>

<script setup lang="ts">
import { Loading } from "@icon-park/vue-next";
// import { useRouter } from "vue-router";
// const router = useRouter();
const props = defineProps({
  Carousel: {
    type: Array<{
      id: number;
      cover: string;
      title: string;
      link: string;
    }>,
    required: true,
  },
});
const Carousel = ref(props.Carousel);
</script>

<style lang="scss" scoped></style>
