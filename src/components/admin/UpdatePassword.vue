<template>
  <n-modal v-model:show="showModal">
    <n-card style="width: 600px" title="修改密码" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <n-form ref="formRef" :model="model" :rules="rules"  label-placement="top">
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="12" label="旧密码" path="oldPwd">
            <n-input v-model:value="model.oldPwd" placeholder="输入旧密码" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="新密码" path="newPwd">
            <n-input v-model:value="model.newPwd" placeholder="输入新密码" />
          </n-form-item-gi>
          <n-form-item-gi :span="24" label="确认密码" path="confirmPwd">
            <n-input v-model:value="model.confirmPwd" placeholder="确认新密码" />
          </n-form-item-gi>
        </n-grid>
      </n-form>
      <template #footer>
        <n-space>
          <n-button type="default" @click="handleCancel">取消</n-button>
          <n-button type="primary" @click="handleConfirm">确认</n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
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

const model = ref<Model>({
  oldPwd: "",
  newPwd: "",
  confirmPwd: "",
});

const rules = {
  inputValue: [{ required: true, message: "请输入", trigger: "blur" }],
  textareaValue: [{ required: true, message: "请输入", trigger: "blur" }],
};

const { showModal } = toRefs(props);
const emits = defineEmits(["onCancel", "onConfirm"]);
const handleCancel = () => {
  emits("onCancel", false);
};

const handleConfirm = () => {
  emits("onConfirm", { ...model.value });
};
</script>

<style lang="scss" scoped></style>
