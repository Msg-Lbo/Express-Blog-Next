import { defineStore } from "pinia";
import { ref } from "vue";
import { loginApi, getUserInfoApi, logoutApi } from "@/apis/user";
import { createDiscreteApi } from "naive-ui";
import router from "@/router";
const { message } = createDiscreteApi(['message'])

interface UserInfo {
    id: number;
    account: string;
    avatar: string;
    email: string;
    identity: string;
    nickname: string;
}

interface LoginForm {
    account: string;
    password: string;
}

export const useUserInfoStore = defineStore("userInfo", () => {
    const userInfo = ref<UserInfo>();
    // 登录
    const handleLogin = async (loginForm: LoginForm) => {
        const res = await loginApi(loginForm);
        if (res.code === 200) {
            message.success(res.msg)
            handleGetUserInfo()
            router.push('/')
        }
    }
    // 获取用户信息
    const handleGetUserInfo = async () => {
        const res = await getUserInfoApi();
        if (res.code === 200) {
            userInfo.value = res.data;
            return true
        }
    }
    // 登出
    const handleLogout = async () => {
        const res = await logoutApi();
        if (res.code === 200) {
            message.success(res.msg)
            userInfo.value = undefined
            router.push('/')
        }

    }

    return {
        userInfo,
        handleLogin,
        handleGetUserInfo,
        handleLogout
    }
}, {
    persist: true
})