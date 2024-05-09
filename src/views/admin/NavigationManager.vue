<template>
  <main class="p-4">
    <n-table :single-line="true" striped size="small">
      <thead>
        <tr>
          <th class="title">
            <span>导航</span>
            <n-divider vertical />
            <n-button type="primary" size="small" :disabled="isAddNavigation" text @click="addNavigation">
              新增导航
            </n-button>
            <n-divider vertical />
            <n-gradient-text type="info">编辑完后记得保存哦</n-gradient-text>
          </th>
          <th class="title">别名/链接</th>
          <th class="title w-20">排序</th>
          <th class="title w-20">展示</th>
          <th class="title w-40">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="navigation in navigationList" :key="navigation.id">
          <td class="value cursor-text" @click="navigationActiveEdit = navigation.id">
            <n-input
              v-if="navigationActiveEdit === navigation.id"
              placeholder="输入导航显示名称"
              v-model:value="navigation.label"
            />
            <span v-else>
              {{ navigation.label || "未命名" }}
            </span>
          </td>
          <td class="value cursor-text" @click="navigationActiveEdit = navigation.id">
            <n-input
              v-if="navigationActiveEdit === navigation.id"
              placeholder="输入导航分类别名或链接"
              v-model:value="navigation.alias"
            />
            <span v-else>
              {{ navigation.alias || "未命名" }}
            </span>
          </td>
          <td class="value" @click="navigationActiveEdit = navigation.id">
            <n-input
              v-if="navigationActiveEdit === navigation.id"
              placeholder="输入排序位置"
              v-model:value="navigation.sort"
            />
            <span v-else>
              {{ navigation.sort }}
            </span>
          </td>
          <td class="value">
            <n-switch
              :checked-value="1"
              :unchecked-value="0"
              :round="false"
              v-model:value="navigation.status"
              @update:value="saveNavication(navigation)"
            />
          </td>
          <td class="value">
            <n-space align="center" justify="center">
              <n-button
                v-if="navigationActiveEdit === navigation.id"
                type="primary"
                size="small"
                text
                @click="saveNavication(navigation)"
              >
                保存
              </n-button>
              <n-popconfirm @positive-click="deleteCategory(navigation.id)" v-else>
                <template #trigger>
                  <n-button type="error" size="small" text>删除</n-button>
                </template>
                <span>确定删除这个导航?</span>
              </n-popconfirm>
            </n-space>
          </td>
        </tr>
      </tbody>
    </n-table>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { saveNavigationsApi, getAllNavigationsApi, deleteNavigationApi, updateNavigationApi } from "@/apis/navigations";
import { useMessage } from "naive-ui";
interface Navigation {
  id: number;
  label: string;
  alias: string;
  status: number;
  sort: number;
}
const navigationForm = ref<Navigation>({
  id: -1,
  label: "",
  alias: "",
  status: 0,
  sort: 0,
});
const message = useMessage();
const navigationList = ref<Navigation[]>();
const navigationActiveEdit = ref<number | null>(null);
const isAddNavigation = computed(() => navigationList.value?.some((item: Navigation) => item.id === -1));
// 是否新增导航
const saveNavication = async (navigation: Navigation) => {
  if (navigation.id === -1) {
    const res = await saveNavigationsApi(navigation);
    if (res.code === 200) {
      message.success(res.msg);
    }
  } else {
    const res = await updateNavigationApi(navigation);
    if (res.code === 200) {
      message.success(res.msg);
    }
  }
  getAllNavigations();
  navigationActiveEdit.value = null;
};

// 获取全部导航
const getAllNavigations = async () => {
  const res = await getAllNavigationsApi();
  if (res.code === 200) {
    navigationList.value = res.data;
  }
};

// 删除导航
const deleteCategory = async (id: number) => {
  if (id === -1) {
    if (navigationList.value) navigationList.value.pop();
    return;
  }
  const res = await deleteNavigationApi(id);
  if (res.code === 200) {
    message.success(res.msg);
    getAllNavigations();
  }
};

const addNavigation = () => {
  if (navigationList.value) navigationList.value.push(navigationForm.value);
};

onMounted(() => {
  getAllNavigations();
});
</script>

<style lang="scss" scoped>
.title {
  @apply text-left;
  &:last-child,
  &:nth-last-child(2),
  &:nth-last-child(3) {
    @apply text-center;
  }
}
.value {
  @apply text-left;
  &:nth-last-child(2),
  &:nth-last-child(3) {
    @apply text-center;
  }
}
</style>
