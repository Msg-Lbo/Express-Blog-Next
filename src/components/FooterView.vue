<template>
  <main>
    <footer>
      <div class="container">
        <div class="left">
          <p>© 2022 绕远路的出租车司机 All Rights Reserved.</p>
          <p v-if="GongAn">{{ GongAn }}</p>
          <a v-if="Icp" href="http://beian.miit.gov.cn/" target="_blank">{{ Icp }}</a>
          <a v-if="Icp" :href="`https://icp.gov.moe/?keyword=${MoeIcp.match(/\d+/)}`" target="_blank">{{ MoeIcp }}</a>
        </div>
      </div>
    </footer>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  GongAn: {
    type: String,
    default: "",
  },
  Icp: {
    type: String,
    default: "",
  },
  MoeIcp: {
    type: String,
    default: "",
  },
});

const { GongAn, Icp, MoeIcp } = {
  GongAn: computed(() => props.GongAn),
  Icp: computed(() => props.Icp),
  MoeIcp: computed(() => props.MoeIcp),
};
</script>

<style lang="scss" scoped>
.container {
  @apply flex items-center justify-between;
  .left {
    @apply flex items-center gap-3;
  }
}

@media screen and (max-width: 768px) {
  .container {
    @apply justify-center;
    .left {
      @apply flex-col;
    }
  }
}
</style>
