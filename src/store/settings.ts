import { getSettingsApi, saveSettingsApi, getRssApi, saveRssApi, saveFriendTemplateApi, saveAboutApi } from "@/apis/settings";
import { defineStore } from "pinia";
import { ref } from "vue";
import { createDiscreteApi } from "naive-ui";
const { message } = createDiscreteApi(['message'])

interface Settings {
    Title: string;
    Ico: string;
    Logo: string;
    LogoText: string;
    LogoText2: string;
    GongAn: string;
    Icp: string;
    MoeIcp: string;
    LeftBgLight: string;
    LeftBgDark: string;
    AllowRegister: boolean;
    About: string;
    FriendTemplate: string;

}

interface Rss {
    RssTitle: string;
    RssDesc: string;
    FeedUrl: string;
    SiteUrl: string;
    Language: string;
    CopyRight: string;
    WebMaster: string;
}

export const useSettingsStore = defineStore("settings", () => {
    const settings = ref<Settings>({
        Title: "",
        Ico: "",
        Logo: "",
        LogoText: "",
        LogoText2: "",
        GongAn: "",
        Icp: "",
        MoeIcp: "",
        LeftBgLight: "",
        LeftBgDark: "",
        AllowRegister: false,
        About: "",
        FriendTemplate: "",
    })
    const rss = ref<Rss>({
        RssTitle: "",
        RssDesc: "",
        FeedUrl: "",
        SiteUrl: "",
        Language: "",
        CopyRight: "",
        WebMaster: "",
    })

    // 获取设置
    const handleGetSettings = async () => {
        const res = await getSettingsApi();
        if (res.code === 200) {
            settings.value = res.data;
        }
    };

    // 保存设置
    const handleSaveSettings = async () => {
        const res = await saveSettingsApi(settings.value);
        if (res.code === 200) {
            message.success("保存成功");
        }
    }


    // 获取rss设置
    const handleGetRss = async () => {
        const res = await getRssApi();
        if (res.code === 200) {
            rss.value = res.data;
        }
    };

    // 保存rss设置
    const handleSaveRss = async () => {
        const res = await saveRssApi(rss.value);
        if (res.code === 200) {
            message.success("保存成功");
        }
    }

    // 保存友链模板
    const handleSaveFriendTemplate = async () => {
        const res = await saveFriendTemplateApi(settings.value.FriendTemplate);
        if (res.code === 200) {
            message.success("保存成功");
        }
    }

    // 保存关于
    const handleSaveAbout = async () => {
        const res = await saveAboutApi(settings.value.About);
        if (res.code === 200) {
            message.success("保存成功");
        }
    }

    return {
        settings,
        rss,
        handleGetSettings,
        handleSaveSettings,
        handleGetRss,
        handleSaveRss,
        handleSaveFriendTemplate,
        handleSaveAbout
    }
},
    {
        persist: true,
    },
)