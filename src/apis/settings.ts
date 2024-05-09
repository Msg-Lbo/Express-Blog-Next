import { $http } from ".";

// 保存设置
export const saveSettingsApi = (data: {
    Title: string
    Ico: string
    Logo: string
    LogoText: string
    LogoText2: string
    GongAn: string
    Ipc: string
    LeftBgLight: string
    LeftBgDark: string
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