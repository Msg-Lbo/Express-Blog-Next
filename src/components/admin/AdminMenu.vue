<template>
  <n-menu :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" :value="activeKey" @update:value="onUpdate" />
</template>

<script setup lang="ts">
import { h, ref, Component } from "vue";
import { NIcon } from "naive-ui";
import {
  Book,
  Pencil,
  ImageFiles,
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
const activeKey = ref<string | null>(null);
interface MenuOption {
  label: string
  key: string
  icon: ReturnType<typeof renderIcon>
}

const menuOptions = ref<MenuOption[]>([])

// 从router中获取管理菜单
const generateMenuOptions = () => {
  const adminRoutes = router.options.routes.find(
    route => route.path === '/manager'
  )?.children || []

  const options = adminRoutes
    .filter(route => {
      if (!route.meta || !route.name) return false
      return route.meta.title && route.name !== 'manager'
    })
    .map(route => ({
      label: route.meta!.title as string,
      key: route.name as string,
      icon: renderIcon(getMenuIcon(route.name as string))
    }))

  menuOptions.value = options
}

// 根据路由名称获取对应图标
const getMenuIcon = (name: string): Component => {
  type IconMap = Record<string, Component>
  const iconMap: IconMap = {
    'article-list': BookOpen,
    'edit-article': Pencil,
    'category-manager': AllApplication,
    'image-manager': ImageFiles,
    'navigation-manager': Navigation,
    'tag-manager': TagOne,
    'comment-manager': Comment,
    'link-manager': Link,
    'settings': Setting,
    'seo': Book
  }
  return iconMap[name] || Book
}

// 初始化时生成菜单
generateMenuOptions()

const onUpdate = (value: string) => {
  activeKey.value = value;
  router.push({ name: value });
};
</script>

<style lang="scss" scoped>
@use "sass:math";

// Add any necessary SCSS styles here
</style>
