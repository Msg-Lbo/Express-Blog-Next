<template>
  <main class="p-4 h-screen">
    <n-table :single-line="true" striped size="small">
      <thead>
        <tr>
          <th class="title">
            <span>网站名</span>
            <n-divider vertical />
            <n-button type="primary" size="small" :disabled="isAddLink" text @click="addLink">添加友链</n-button>
            <n-divider vertical />
            <n-gradient-text type="info">编辑完后记得保存哦</n-gradient-text>
          </th>
          <th class="title">描述</th>
          <th class="title">链接</th>
          <th class="title">logo</th>
          <th class="title">logo(图片)</th>
          <th class="title">邮箱</th>
          <th class="title">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="friend in friendList" :key="friend.id">
          <td class="value cursor-text" @click="activeFriendEdit = friend.id">
            <n-input v-if="activeFriendEdit === friend.id" placeholder="输入网站名" v-model:value="friend.name" />
            <span v-else>
              <n-ellipsis style="width: 240px">
                {{ friend.name || "未命名" }}
              </n-ellipsis>
            </span>
          </td>
          <td class="value cursor-text" @click="activeFriendEdit = friend.id">
            <n-input
              v-if="activeFriendEdit === friend.id"
              placeholder="输入网站描述"
              v-model:value="friend.description"
            />
            <span v-else>
              <n-ellipsis style="width: 240px">
                {{ friend.description || "未填写" }}
              </n-ellipsis>
            </span>
          </td>
          <td class="value cursor-text" @click="activeFriendEdit = friend.id">
            <n-input v-if="activeFriendEdit === friend.id" placeholder="输入网站链接" v-model:value="friend.link" />
            <span v-else>
              {{ friend.link || "未填写" }}
            </span>
          </td>
          <td class="value cursor-text" @click="activeFriendEdit = friend.id">
            <n-input v-if="activeFriendEdit === friend.id" placeholder="输入网站链接" v-model:value="friend.logo" />
            <span v-else>
              <n-ellipsis style="width: 240px">
                {{ friend.logo || "未填写" }}
              </n-ellipsis>
            </span>
          </td>
          <td class="value logo" @click="activeFriendEdit = friend.id">
            <img :src="friend.logo" width="30" height="30" alt="" />
          </td>
          <td class="value cursor-text" @click="activeFriendEdit = friend.id">
            <n-input v-if="activeFriendEdit === friend.id" placeholder="输入网站邮箱" v-model:value="friend.email" />
            <span v-else>
              <n-ellipsis style="width: 240px">
                {{ friend.email || "未填写" }}
              </n-ellipsis>
            </span>
          </td>
          <td class="value">
            <n-space align="center" justify="center">
              <n-popover trigger="click" v-if="friend.status === 1">
                <template #trigger>
                  <n-button type="warning" size="small" text>驳回</n-button>
                </template>
                <n-input v-model:value="reason" placeholder="请输入驳回原因"></n-input>
                <template #footer>
                  <n-button type="primary" size="small" text @click="refuseFriend(friend)">确认</n-button>
                </template>
              </n-popover>
              <n-button v-if="friend.status === 0" type="primary" size="small" text @click="allowFriend(friend)">
                同意
              </n-button>
              <n-button
                v-if="activeFriendEdit === friend.id"
                type="primary"
                size="small"
                text
                @click="saveFriend(friend)"
              >
                保存
              </n-button>
              <n-popconfirm @positive-click="deleteFriend(friend.id)" v-else>
                <template #trigger>
                  <n-button type="error" size="small" text>删除</n-button>
                </template>
                <span>确定删除这个友链?</span>
              </n-popconfirm>
            </n-space>
          </td>
        </tr>
      </tbody>
    </n-table>
  </main>
</template>

<script setup lang="ts">
import {
  getAllFriendApi,
  addFriendApi,
  updateFriendApi,
  deleteFriendApi,
  allowFriendApi,
  refuseFriendApi,
} from "@/apis/friend";

interface Friend {
  id: number;
  name: string;
  description: string;
  link: string;
  logo: string;
  email: string;
  status: number;
  code?: string;
}

const friendList = ref<Friend[]>();
const activeFriendEdit = ref<number | null>(null);
const isAddLink = computed(() => friendList.value?.some((item: Friend) => item.id === -1) || false);
const message = useMessage();
const linkForm = ref<Friend>({
  id: -1,
  name: "",
  description: "",
  link: "",
  logo: "",
  email: "",
  status: 0,
  code: "",
});
const reason = ref("");

// 获取友链列表
const getFriendList = async () => {
  const res = await getAllFriendApi();
  if (res.code === 200) {
    friendList.value = res.data;
  }
};

// 同意
const allowFriend = async (friend: Friend) => {
  const res = await allowFriendApi(friend.id);
  if (res.code === 200) {
    friend.status = 1;
    message.success(res.msg);
  }
};

// 驳回
const refuseFriend = async (friend: Friend) => {
  const res = await refuseFriendApi(friend.id, reason.value);
  if (res.code === 200) {
    friend.status = 0;
    message.success(res.msg);
  }
};

// 保存
const saveFriend = async (friend: Friend) => {
  if (friend.id === -1) {
    // 新增
    const res = await addFriendApi(linkForm.value);
    if (res.code === 200) {
      getFriendList();
      message.success(res.msg);
    }
  } else {
    // 更新
    linkForm.value = friend;
    const res = await updateFriendApi(linkForm.value);
    if (res.code === 200) {
      getFriendList();
      message.success(res.msg);
    }
  }
  activeFriendEdit.value = null;
  linkForm.value = {
    id: -1,
    name: "",
    description: "",
    link: "",
    logo: "",
    email: "",
    status: 0,
    code: "",
  };
};

const deleteFriend = async (id: number) => {
  if (id === -1) {
    if (friendList.value) friendList.value.pop();
    return;
  }
  const res = await deleteFriendApi(id);
  if (res.code === 200) {
    getFriendList();
    message.success(res.msg);
  }
};

const addLink = () => {
  if (friendList.value) friendList.value.push(linkForm.value);
};

onMounted(() => {
  getFriendList();
});
</script>

<style lang="scss" scoped>
.title {
  @apply text-center;
  &:first-child {
    @apply text-left;
  }
}
.value {
  @apply text-left w-40;
}
.logo {
  @apply h-full;
  img {
    @apply m-auto;
  }
}
</style>
