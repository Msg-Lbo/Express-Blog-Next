import { $http } from ".";

// 保存设置
export const saveSettingsApi = (data: {
    Ico: string,
    Logo: string,
    LogoText: string,
    LogoText2: string,
    GongAn: string,
    Icp: string,
    MoeIcp: string,
    Domain: string,
    LeftBgLight: string,
    LeftBgDark: string,
    AllowRegister: boolean,
}) => {
    return $http({
        url: "/settings/save-settings",
        method: "POST",
        data,
    });
}

// 获取设置
export const getSettingsApi = () => {
    return $http({
        url: "/settings/get-settings",
        method: "GET",
    });
}

// 获取汇总
export const getSummaryApi = () => {
    return $http({
        url: "/settings/get-summary",
        method: "GET",
    });
}

// 获取rss
export const getRssApi = () => {
    return $http({
        url: "/feed/get-rss",
        method: "GET",
    });
}

// 保存rss
export const saveRssApi = (data: {
    RssTitle: string
    RssDesc: string
    FeedUrl: string
    SiteUrl: string
    Language: string
    CopyRight: string
    WebMaster: string
}) => {
    return $http({
        url: "/feed/save-rss",
        method: "POST",
        data,
    });
}

// 保存友链模板
export const saveFriendTemplateApi = (FriendTemplate: string) => {
    return $http({
        url: "/settings/save-friend-template",
        method: "POST",
        data: {
            FriendTemplate
        },
    });
}

// 保存关于
export const saveAboutApi = (About: string) => {
    return $http({
        url: "/settings/save-about",
        method: "POST",
        data: {
            About
        },
    });
}

// 获取轮播图
export const getCarouselApi = () => {
    return $http({
        url: "/settings/get-carousel",
        method: "GET",
    });
}

// 保存轮播图
export const saveCarouselApi = (data: { title: string, cover: string, link: string }) => {
    return $http({
        url: "/settings/save-carousel",
        method: "POST",
        data
    });
}

// 删除轮播图
export const deleteCarouselApi = (id: number) => {
    return $http({
        url: "/settings/delete-carousel",
        method: "POST",
        data: {
            id
        },
    });
}

// 更新轮播图
export const updateCarouselApi = (data: { id: number, title: string, cover: string, link: string }) => {
    return $http({
        url: "/settings/update-carousel",
        method: "POST",
        data
    });
}