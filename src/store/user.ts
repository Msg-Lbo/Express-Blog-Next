import { defineStore } from "pinia";
import { ref } from "vue";
import { loginApi, getUserInfoApi, logoutApi, updateUserInfoApi, updatePasswordApi } from "@/apis/user";
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
    const userInfo = ref<UserInfo>({
        id: 0,
        account: '',
        avatar: '',
        email: '',
        identity: '',
        nickname: ''
    });
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
    // 更新用户信息
    const handleUpdateUserInfo = async () => {
        const res = await updateUserInfoApi(userInfo.value.nickname, userInfo.value.avatar, userInfo.value.email);
        if (res.code === 200) {
            message.success(res.msg)
            handleGetUserInfo()
        }
    }
    // 修改密码
    const handleUpdatePassword = async (oldPassword: string, newPassword: string) => {
        const res = await updatePasswordApi(oldPassword, newPassword);
        if (res.code === 200) {
            message.success(res.msg);
            handleLogout()
        }
    }
    // 登出
    const handleLogout = async () => {
        const res = await logoutApi();
        if (res.code === 200) {
            message.success(res.msg)
            userInfo.value = {
                id: 0,
                account: '',
                avatar: '',
                email: '',
                identity: '',
                nickname: ''
            }
            router.push('/login')
        }
    }

    return {
        userInfo,
        handleLogin,
        handleGetUserInfo,
        handleUpdateUserInfo,
        handleUpdatePassword,
        handleLogout
    }
}, {
    persist: true
})