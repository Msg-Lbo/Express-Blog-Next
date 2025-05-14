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
  Home
} from "@icon-park/vue-next";
import { useRouter } from "vue-router";
import type { MenuOption } from "naive-ui";

const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) });
};

const router = useRouter();
const activeKey = ref<string | null>(null);

const menuOptions = ref<MenuOption[]>([]);

// 从router中获取管理菜单
const generateMenuOptions = () => {
  const adminRoutes = router.options.routes.find(
    route => route.path === '/manager'
  )?.children || [];

  const options: MenuOption[] = [];

  adminRoutes.forEach(route => {
    if (!route.meta) return;

    // 处理文章管理特殊情况（有子菜单）
    if (route.children && route.meta.title === '文章管理') {
      const children: MenuOption[] = [];
      
      route.children.forEach(child => {
        if (child.meta?.title && child.name) {
          children.push({
            label: child.meta.title as string,
            key: child.name as string,
            icon: renderIcon(getMenuIcon(child.name as string))
          });
        }
      });

      options.push({
        label: route.meta.title as string,
        key: route.children[0].name as string, // 默认选中第一个子菜单
        icon: renderIcon(Book),
        children
      });
    } 
    // 处理普通菜单项
    else if (route.meta.title && route.name && route.name !== 'manager') {
      options.push({
        label: route.meta.title as string,
        key: route.name as string,
        icon: renderIcon(getMenuIcon(route.name as string))
      });
    }
  });

  // 添加返回首页按钮
  options.push({
    label: '返回首页',
    key: 'back-to-home',
    icon: renderIcon(Home)
  });

  menuOptions.value = options;
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
  if (value === 'back-to-home') {
    router.push('/');
  } else {
    router.push({ name: value });
  }
};
</script>

<style lang="scss" scoped>
@use "sass:math";

// Add any necessary SCSS styles here
</style>
