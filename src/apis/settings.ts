import { $http } from ".";

// 保存设置
export const saveSettingsApi = (data: {
    Ico: string,
    Logo: string,
    Avatar: string,
    LogoText: string,
    LogoText2: string,
    GongAn: string,
    Icp: string,
    MoeIcp: string,
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