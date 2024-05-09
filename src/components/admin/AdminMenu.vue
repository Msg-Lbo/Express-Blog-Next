<template>
  <n-menu :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" @update:value="onUpdate" />
</template>

<script setup lang="ts">
import { h, ref, Component } from "vue";
import { NIcon } from "naive-ui";
import {
  Dashboard,
  Book,
  Pencil,
  AllApplication,
  TagOne,
  BookOpen,
  Comment,
  Link,
  Setting,
  Navigation,
} from "@icon-park/vue-next";
import { useRouter } from "vue-router";
const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) });
};
const router = useRouter();
const menuOptions = ref([
  {
    label: "仪表盘",
    key: "dashboard",
    icon: renderIcon(Dashboard),
  },
  {
    label: "文章管理",
    key: "article-manager",
    icon: renderIcon(Book),
    children: [
      {
        label: "文章列表",
        key: "article-list",
        icon: renderIcon(BookOpen),
      },
      {
        label: "添加文章",
        key: "edit-article",
        icon: renderIcon(Pencil),
      },
    ],
  },
  {
    label: "分类管理",
    key: "category-manager",
    icon: renderIcon(AllApplication),
  },
  {
    label: "导航管理",
    key: "navigation-manager",
    icon: renderIcon(Navigation),
  },
  {
    label: "标签管理",
    key: "tag-manager",
    icon: renderIcon(TagOne),
  },
  {
    label: "评论管理",
    key: "comment-manager",
    icon: renderIcon(Comment),
  },
  {
    label: "友链管理",
    key: "link-manager",
    icon: renderIcon(Link),
  },
  {
    label: "设置",
    key: "settings",
    icon: renderIcon(Setting),
  },
]);

const onUpdate = (value: string) => {
  router.push({ name: value });
};
</script>

<style lang="scss" scoped></style>
