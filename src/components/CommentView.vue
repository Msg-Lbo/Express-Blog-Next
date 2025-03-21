<template>
  <main class="comment-main">
    <div class="send-comment">
      <div class="form">
        <n-space v-if="userInfo?.identity !== 'admin'">
          <n-input v-model:value="commentForm.nickname" minlength="2" maxlength="10" placeholder="昵称" size="small" />
          <n-input v-model:value="commentForm.email" minlength="2" maxlength="20" placeholder="邮箱" size="small" />
        </n-space>
        <n-input ref="commentInputRef" v-model:value="commentForm.content" maxlength="200" type="textarea" placeholder="基本的 Textarea" />
        <n-space justify="start" align="center">
          <div class="captcha-svg" v-html:value="captcha" @click="getCaptcha"></div>
          <n-input v-model:value="commentForm.code" minlength="4" maxlength="4" placeholder="验证码" size="small" />
          <n-button type="primary" size="small" @click="sendComment">发表评论</n-button>
        </n-space>
      </div>
    </div>
    <div class="comments-list">
      <div class="title">评论列表({{ total }})</div>
      <div class="list">
        <div class="item" v-for="(item, index) in commentsList" :key="index">
          <div class="info">
            <span class="nickname admin" v-if="item.identity === 'admin'">
              {{ item.nickname }}({{ item.identity }})
            </span>
            <span class="nickname" v-else>{{ item.nickname }}</span>
            <span class="time">
              <n-time :time="item.create_time" format="yyyy-MM-dd hh:mm"></n-time>
            </span>
            <span class="reply" @click="replyComment(item)">回复</span>
          </div>
          <div class="content">{{ item.content }}</div>
          <div class="chindren-list">
            <div class="item-children" v-for="children in item.children" :key="children.id">
              <div class="info">
                <span class="nickname admin" v-if="children.identity === 'admin'">
                  {{ children.nickname }}({{ children.identity }})
                </span>
                <span class="nickname" v-else>{{ children.nickname }}</span>
                <span class="time">
                  <n-time :time="children.create_time" format="yyyy-MM-dd hh:mm"></n-time>
                </span>
                <span class="reply" @click="replyComment(children)">回复</span>
              </div>
              <div class="content">{{ children.content }}</div>
            </div>
          </div>
          <n-divider dashed />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { getCommentListApi, sendCommentApi } from "@/apis/comment";
import { getCaptchaApi } from "@/apis/captcha";
import { InputInst, useMessage } from "naive-ui";
import { useUserInfoStore } from "@/store/user";

interface Comment {
  id: number | string;
  article_id: number;
  content: string;
  create_time: number;
  email: string;
  identity?: string;
  nickname: string;
  parent_id: number | string;
  children: Comment[];
}
interface CommentForm {
  article_id: number | string;
  content: string;
  create_time: number;
  email: string;
  identity?: string;
  nickname: string;
  parent_id: number | string;
  code: string;
  reply_email: string;
}
const props = defineProps({
  articleId: {
    type: String,
    required: true,
  },
});

const userInfoStore = useUserInfoStore();
const userInfo = computed(() => userInfoStore.userInfo);
const id = computed(() => props.articleId);
const commentsList = ref<Comment[]>([]);
const captcha = ref<string>("");
const message = useMessage();
const commentInputRef = ref<InputInst | null>(null);
const total = ref<number>(0);

const commentForm = ref<CommentForm>({
  article_id: id.value,
  content: "",
  create_time: new Date().getTime(),
  email: userInfo.value?.email || "",
  nickname: userInfo.value?.nickname,
  identity: userInfo.value?.identity,
  parent_id: 0,
  reply_email: "",
  code: "",
});

watch(id, (newVal) => {
  if (Number(newVal) !== 0) {
    getComments(newVal);
  }
});
// 获取评论列表
const getComments = async (article_id: number | string) => {
  const res = await getCommentListApi(article_id);
  if (res.code === 200) {
    commentsList.value = res.data.tree;
    total.value = res.data.total;
  }
};

// 回复评论
const replyComment = (item: Comment) => {
  commentForm.value.parent_id = item.parent_id;
  commentForm.value.content = `@${item.nickname} `;
  commentForm.value.reply_email = item.email;
  commentInputRef.value?.focus();
};

// 刷新验证码
const getCaptcha = async () => {
  const res = await getCaptchaApi();
  if (res.code === 200) {
    captcha.value = res.data;
  }
};

// 发送评论
const sendComment = async () => {
  commentForm.value.article_id = id.value;
  // console.log(commentForm.value);
  // return;
  // 缓存昵称和邮箱
  if (userInfo.value) {
    localStorage.setItem("nickname", userInfo.value.nickname);
    localStorage.setItem("email", userInfo.value.email);
  }
  if (!commentForm.value.nickname) {
    message.error("昵称不能为空");
    return;
  }
  if (!commentForm.value.email) {
    message.error("邮箱不能为空");
    return;
  }
  if (!commentForm.value.content) {
    message.error("评论内容不能为空");
    return;
  }
  if (!commentForm.value.code) {
    message.error("验证码不能为空");
    return;
  }
  const res = await sendCommentApi(commentForm.value);
  if (res.code === 200) {
    commentForm.value.content = "";
    commentForm.value.code = "";
    getCaptcha();
    getComments(id.value);
    message.success(res.msg);
  }
};

onMounted(() => {
  if (Number(id.value) !== 0) {
    getComments(id.value);
  }
  getCaptcha();
});
</script>

<style lang="scss" scoped>
.send-comment {
  @apply w-full my-2;

  .title {
    @apply text-xl font-bold mb-4;
  }

  .form {
    @apply flex flex-col gap-1;
  }
}

.comments-list {
  @apply w-full my-2;

  .title {
    @apply text-sm font-bold mb-4;
  }

  .list {
    .item {
      @apply my-4;

      .info {
        @apply flex items-center gap-2 h-6 text-sm;

        .nickname {
          @apply text-green-600;
        }

        .admin {
          @apply text-red-600;
        }

        .time {
          @apply h-6 leading-7 text-gray-500;
        }

        .reply {
          @apply cursor-pointer hover:text-[#409eff];
        }
      }

      .content {
        @apply text-sm whitespace-pre-wrap;
      }

      .chindren-list {
        @apply ml-2;

        .item-children {
          @apply my-2;
        }
      }
    }
  }
}
</style>
