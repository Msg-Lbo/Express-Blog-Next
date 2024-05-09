import { getSettingsApi } from "@/apis/settings";
import { defineStore } from "pinia";
import { ref } from "vue";

interface Settings {
    Title: string;
    Ico: string;
    Logo: string;
    Avatar: string;
    LogoText: string;
    LogoText2: string;
    GongAn: string;
    Ipc: string;
    Icp: string;
    MoeIcp: string;
    LeftBgLight: string;
    LeftBgDark: string;
    AllowRegister: boolean;
    About: string;
    FriendTemplate: string;
}

export const useSettingsStore = defineStore("settings", () => {
    const settings = ref<Settings>()

    // 获取设置
    const getSettings = async () => {
        const res = await getSettingsApi();
        if (res.code === 200) {
            settings.value = res.data;
        }
    };

    return {
        settings,
        getSettings
    }
},
    {
        persist: true,
    },
)