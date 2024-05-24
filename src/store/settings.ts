import {
    getSettingsApi,
    saveSettingsApi,
    getRssApi,
    saveRssApi,
    saveFriendTemplateApi,
    saveAboutApi,
    getCarouselApi,
    saveCarouselApi,
    updateCarouselApi,
    deleteCarouselApi
} from "@/apis/settings";
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
    Domain: string;
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

interface Carousel {
    id: number,
    title: string,
    cover: string,
    link: string
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
        Domain: "",
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
    const carousel = ref<Carousel[]>()


    // 修改favicon
    const setFavicon = (path: string) => {
        console.log("favicon设置成功");

        const link = document.querySelector("link[rel*='icon']") || document.createElement("link") as any;
        link.type = "image/x-icon";
        link.rel = "icon";
        link.href = path;
        document.getElementsByTagName("head")[0].appendChild(link);
    }

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
            setFavicon(settings.value.Ico);
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

    // 获取轮播图
    const handleGetCarousel = async () => {
        const res = await getCarouselApi();
        if (res.code === 200) {
            carousel.value = res.data;
        }
    }

    // 保存轮播图
    const handleSaveCarousel = async (data: Carousel) => {
        const res = await saveCarouselApi(data);
        if (res.code === 200) {
            message.success("保存成功");
        }
    }

    // 更新轮播图
    const handleUpdateCarousel = async (data: Carousel) => {
        const res = await updateCarouselApi(data);
        if (res.code === 200) {
            message.success("更新成功");
        }
    }

    // 删除轮播图
    const handleDeleteCarousel = async (id: number) => {
        const res = await deleteCarouselApi(id);
        if (res.code === 200) {
            message.success("删除成功");
        }
    }

    return {
        settings,
        rss,
        carousel,
        handleGetSettings,
        handleSaveSettings,
        handleGetRss,
        handleSaveRss,
        handleSaveFriendTemplate,
        handleSaveAbout,
        handleGetCarousel,
        handleSaveCarousel,
        handleUpdateCarousel,
        handleDeleteCarousel,

    }
},
    {
        persist: true,
    },
)