<template>
  <n-modal v-model:show="showModal" :mask-closable="false">
    <n-card style="width: auto" title="修改密码" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <n-form ref="formRef" :model="model" :rules="rules" label-placement="top">
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="12" label="旧密码" path="oldPwd">
            <n-input v-model:value="model.oldPwd" placeholder="输入旧密码" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="新密码" path="newPwd">
            <n-input v-model:value="model.newPwd" @input="handlePasswordInput" placeholder="输入新密码" />
          </n-form-item-gi>
          <n-form-item-gi :span="24" label="确认密码" path="confirmPwd">
            <n-input v-model:value="model.confirmPwd" :disabled="!model.newPwd" placeholder="确认新密码" />
          </n-form-item-gi>
        </n-grid>
      </n-form>
      <template #footer>
        <n-space>
          <n-button type="default" @click="handleCancel">取消</n-button>
          <n-button type="primary" @click="handleValidateButtonClick">确认</n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { FormInst, FormItemInst, FormItemRule, useMessage, FormRules } from "naive-ui";
interface Model {
  oldPwd: string;
  newPwd: string;
  confirmPwd: string;
}
const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
});
const message = useMessage();
const formRef = ref<FormInst | null>(null);
const rPasswordFormItemRef = ref<FormItemInst | null>(null);

// 自定义验证规则。两次密码是否一致
const validatePasswordSame = (_rule: FormItemRule, value: string): boolean => {
  return value === model.value.newPwd;
};

const model = ref<Model>({
  oldPwd: "",
  newPwd: "",
  confirmPwd: "",
});

const showModal = toRef(props, "showModal");

const rules: FormRules = {
  oldPwd: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
  newPwd: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    { min: 6, message: "密码长度至少6位", trigger: "blur" },
  ],
  confirmPwd: [
    { required: true, message: "请输入确认密码", trigger: "blur" },
    { min: 6, message: "密码长度至少6位", trigger: "blur" },
    {
      validator: validatePasswordSame,
      trigger: ["blur", "password-input"],
      message: "两次密码输入不一致",
    },
  ],
};

const handleValidateButtonClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.success("验证成功");
      handleConfirm();
    } else {
      console.log(errors);
      message.error("验证失败");
    }
  });
};

// 监听密码输入事件
const handlePasswordInput = () => {
  if (model.value.oldPwd) {
    rPasswordFormItemRef.value?.validate({ trigger: "password-input" });
  }
};

const emits = defineEmits(["onCancel", "onConfirm"]);
const handleCancel = () => {
  emits("onCancel", false);
};

const handleConfirm = () => {
  emits("onConfirm", { ...model.value });
};
</script>

<style lang="scss" scoped></style>
