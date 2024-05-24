<template>
  <main class="py-10 px-[100px] bg-gray-200 h-screen">
    <n-card size="small" class="h-full min-x-[500px] relative box-border">
      <n-h3 style="text-align: center">
        <strong>Express Blog Next 安装向导</strong>
      </n-h3>
      <n-divider class="my-5" />
      <n-steps size="small" :current="(current as number)" :status="currentStatus">
        <n-step title="检查Env环境变量" description="检查Env环境变量,并在下一步进行测试" />
        <n-step title="测试" description="环境变量测试" />
        <n-step title="创建数据表/创建超级管理员" description="创建数据库表,超级管理员,并导入默认数据" />
      </n-steps>
      <n-divider class="my-5" />
      <section class="step-first" v-if="current === 1">
        <n-form ref="formRef" :model="envForm" size="small" label-placement="top">
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi
              v-for="(item, index) in tabData"
              :key="index"
              :label="item.label"
              :path="item.path"
              :span="12"
            >
              <n-input v-model:value="item.value" :disabled="item.disabled" :placeholder="item.placeholder" />
            </n-form-item-gi>
          </n-grid>
        </n-form>
      </section>

      <section class="step-second" v-if="current === 2">
        <n-alert type="warning" v-if="isConnected == null"> 数据库链接待测试 </n-alert>
        <n-alert type="success" v-if="isConnected"> {{ testDbText }},请继续 </n-alert>
        <n-alert type="error" v-if="isConnected === false"> {{ testDbText }},请检查配置 </n-alert>
        <n-divider class="my-5" />
        <n-alert type="warning" v-if="emailService == null"> 邮件服务待测试 </n-alert>
        <n-alert type="success" v-if="emailService"> {{ testEmailText }},请继续 </n-alert>
        <n-alert type="error" v-if="emailService === false"> {{ testEmailText }},请检查配置 </n-alert>
        <n-divider class="my-5" v-if="isConnected" />
        <n-form ref="formRef" v-if="isConnected" :model="testEmailForm" size="small" label-placement="top">
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi label="邮箱" path="email" :span="12">
              <n-input v-model:value="testEmailForm.email" placeholder="请输入一个接受邮件的邮箱地址" />
            </n-form-item-gi>
            <n-form-item-gi label="验证码" path="email" :span="6">
              <n-input v-model:value="testEmailForm.code" placeholder="请输入获取到的验证码" />
            </n-form-item-gi>
            <n-form-item-gi :span="3">
              <n-button type="primary" @click="testEmail">发送验证码</n-button>
            </n-form-item-gi>
            <n-form-item-gi :span="3">
              <n-button type="success" @click="verifyEmailCode">验证</n-button>
            </n-form-item-gi>
          </n-grid>
        </n-form>
      </section>

      <section class="step-third" v-if="current === 3">
        <n-alert type="warning" v-if="isInstalling == null"> 数据库待安装 </n-alert>
        <n-alert type="success" v-if="isInstalling"> {{ insallDbText }},请继续 </n-alert>
        <n-alert type="error" v-if="isInstalling === false"> {{ insallDbText }},请检查配置 </n-alert>
        <n-divider class="my-5" />

        <n-form ref="formRef" :model="superAdminForm" size="small" label-placement="top">
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi label="用户名/管理员账号" path="account" :span="12">
              <n-input class="w-full" v-model:value="superAdminForm.account" placeholder="用户名/管理员账号" />
            </n-form-item-gi>
            <n-form-item-gi label="邮箱" path="email" :span="12">
              <n-input class="w-full" v-model:value="superAdminForm.email" placeholder="邮箱" />
            </n-form-item-gi>
            <n-form-item-gi label="密码" path="password" :span="12">
              <n-input class="w-full" v-model:value="superAdminForm.password" placeholder="密码" />
            </n-form-item-gi>
          </n-grid>
        </n-form>
      </section>
      <n-divider class="my-5" />
      <div class="actions w-full">
        <n-button type="primary" class="absolute left-4 bottom-3" @click="testDb" v-if="current === 2"
          >测试数据库连接</n-button
        >
        <n-button type="primary" class="absolute left-4 bottom-3" @click="installDb" v-if="current === 3"
          >创建数据库</n-button
        >
        <n-space justify="end" class="absolute bottom-3 right-4">
          <n-button type="primary" @click="prev" :disabled="current === 1" v-if="current !== null">上一步</n-button>
          <n-button
            type="primary"
            @click="next"
            :disabled="(!isConnected || !emailService) && current !== 1"
            v-if="current !== null && current < 3"
            >下一步</n-button
          >
          <n-button
            type="success"
            @click="succeed"
            :disabled="!isConnected || !emailService || !isInstalling"
            v-if="current === 3"
            >完成</n-button
          >
        </n-space>
      </div>
    </n-card>
  </main>
</template>

<script setup lang="ts">
import { StepsProps } from "naive-ui";
import { getEnvApi, testDbApi, installDbApi, testEmailApi, verifyEmailCodeApi } from "@/apis/install";
import { useRouter } from "vue-router";
interface EnvForm {
  HOST: string;
  PORT: string;
  DB_HOST: string;
  DB_PORT: string;
  DB_ROOT: string;
  DB_USER: string;
  DB_PASSWORD: string;
  EMAIL_SERVICE: string;
  EMAIL_PORT: string;
  EMAIL_USER: string;
  EMAIL_NAME: string;
  EMAIL_PASS: string;
  TOKEN_SECRET: string;
  SESSION_SECRET: string;
}
const router = useRouter();
const message = useMessage();
const currentRef = ref<number | null>(1);
const currentStatus = ref<StepsProps["status"]>("process");
const current = currentRef;
const isConnected = ref<boolean | undefined>(undefined);
const emailService = ref<boolean | undefined>(undefined);
const isInstalling = ref<boolean | undefined>(undefined);
const testDbText = ref<string | undefined>(undefined);
const testEmailText = ref<string | undefined>(undefined);
const insallDbText = ref<string | undefined>(undefined);
const envForm = ref<EnvForm>({
  HOST: "",
  PORT: "",
  DB_HOST: "",
  DB_PORT: "",
  DB_ROOT: "",
  DB_USER: "",
  DB_PASSWORD: "",
  EMAIL_SERVICE: "",
  EMAIL_PORT: "",
  EMAIL_USER: "",
  EMAIL_NAME: "",
  EMAIL_PASS: "",
  TOKEN_SECRET: "",
  SESSION_SECRET: "",
});

interface SuperAdminForm {
  account: string;
  password: string;
  email: string;
}
const superAdminForm = ref<SuperAdminForm>({
  account: "",
  password: "",
  email: "",
});

const testEmailForm = ref({
  email: "",
  code: "",
});

const tabData = computed(() => [
  {
    label: "服务器IP地址(默认0.0.0.0)",
    value: envForm.value.HOST,
    disabled: true,
    placeholder: "默认0.0.0.0",
    path: "HOST",
  },
  { label: "服务器端口(默认9090)", value: envForm.value.PORT, disabled: true, placeholder: "默认9090", path: "PORT" },
  { label: "数据库主机", value: envForm.value.DB_HOST, disabled: true, placeholder: "数据库主机", path: "DB_HOST" },
  { label: "数据库端口", value: envForm.value.DB_PORT, disabled: true, placeholder: "数据库端口", path: "DB_PORT" },
  { label: "数据库用户名", value: envForm.value.DB_USER, disabled: true, placeholder: "数据库用户名", path: "DB_USER" },
  {
    label: "数据库密码",
    value: envForm.value.DB_PASSWORD,
    disabled: true,
    placeholder: "数据库密码",
    path: "DB_PASSWORD",
  },
  { label: "数据库名称", value: envForm.value.DB_ROOT, disabled: true, placeholder: "数据库名称", path: "DB_ROOT" },
  {
    label: "邮箱服务",
    value: envForm.value.EMAIL_SERVICE,
    disabled: true,
    placeholder: "邮箱服务",
    path: "EMAIL_SERVICE",
  },
  { label: "邮箱端口", value: envForm.value.EMAIL_PORT, disabled: true, placeholder: "邮箱端口", path: "EMAIL_PORT" },
  {
    label: "邮箱用户名",
    value: envForm.value.EMAIL_USER,
    disabled: true,
    placeholder: "邮箱用户名",
    path: "EMAIL_USER",
  },
  {
    label: "发件人姓名",
    value: envForm.value.EMAIL_NAME,
    disabled: true,
    placeholder: "邮箱用户名",
    path: "EMAIL_NAME",
  },
  { label: "邮箱密码", value: envForm.value.EMAIL_PASS, disabled: true, placeholder: "邮箱密码", path: "EMAIL_PASS" },
  {
    label: "Token密钥",
    value: envForm.value.TOKEN_SECRET,
    disabled: true,
    placeholder: "Token密钥",
    path: "TOKEN_SECRET",
  },
  {
    label: "Session密钥",
    value: envForm.value.SESSION_SECRET,
    disabled: true,
    placeholder: "Session密钥",
    path: "SESSION_SECRET",
  },
]);

// 获取环境变量
const getEnv = async () => {
  const res = await getEnvApi();
  if (res.code === 200) {
    envForm.value = res.data;
    console.log(envForm.value);
  }
};

// 测试数据库连接
const testDb = async () => {
  const res = await testDbApi();
  if (res.code === 200) {
    message.success(res.msg);
    isConnected.value = true;
    testDbText.value = res.msg;
  } else {
    message.error(res.msg);
    isConnected.value = false;
    testDbText.value = res.msg;
  }
};

// 发送邮件服务
const testEmail = async () => {
  const res = await testEmailApi(testEmailForm.value.email);
  if (res.code === 200) {
    message.success(res.msg);
  } else {
    message.error(res.msg);
    emailService.value = false;
    testEmailText.value = res.msg;
  }
};

// 验证邮箱验证码
const verifyEmailCode = async () => {
  const res = await verifyEmailCodeApi(testEmailForm.value.email, testEmailForm.value.code);
  if (res.code === 200) {
    message.success(res.msg);
    emailService.value = true;
    testEmailText.value = res.msg;
  } else {
    message.error(res.msg);
    emailService.value = false;
    testEmailText.value = res.msg;
  }
};

// 创建数据库
const installDb = async () => {
  const res = await installDbApi(superAdminForm.value);
  if (res.code === 200) {
    message.success(res.msg);
    isInstalling.value = true;
    insallDbText.value = res.msg;
  } else {
    message.error(res.msg);
    isInstalling.value = false;
    insallDbText.value = res.msg;
  }
};

const next = () => {
  if (currentRef.value === null) currentRef.value = 1;
  else if (currentRef.value >= 4) currentRef.value = null;
  else currentRef.value++;
};
const prev = () => {
  if (currentRef.value === 0) currentRef.value = null;
  else if (currentRef.value === null) currentRef.value = 4;
  else currentRef.value--;
};

const succeed = () => {
  message.success("安装成功,即将跳转到首页...");
  setTimeout(() => {
    router.push("/");
  }, 1000);
};

onMounted(() => {
  getEnv();
});
</script>

<style lang="scss" scoped>
.n-divider {
  @apply my-5;
}
</style>
