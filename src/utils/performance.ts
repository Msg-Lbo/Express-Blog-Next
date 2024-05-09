// performance
const times = () => {
    const performance = window.performance;
    if (performance) {
        setTimeout(() => { //异步获取， 同步获取时duration等值可能获取不到
            const pnt: any = performance.getEntriesByType('navigation')[0]
            const column = [
                {
                    key: 'Redirect',
                    desc: '网页重定向的耗时',
                    value: pnt.redirectEnd - pnt.redirectStart,
                },
                {
                    key: 'AppCache',
                    desc: '检查本地缓存的耗时',
                    value: pnt.domainLookupStart - pnt.fetchStart,
                },
                {
                    key: 'DNS',
                    desc: 'DNS查询的耗时',
                    value: pnt.domainLookupEnd - pnt.domainLookupStart,
                },
                {
                    key: 'TCP',
                    desc: 'TCP连接的耗时',
                    value: pnt.connectEnd - pnt.connectStart,
                },
                {
                    key: 'Waiting(TTFB)',
                    desc: '从客户端发起请求到接收到响应的时间 / Time To First Byte',
                    value: pnt.responseStart - pnt.fetchStart,
                },
                {
                    key: '白屏时间',
                    desc: '首次渲染时间/白屏时间',
                    value: pnt.responseStart - pnt.startTime,
                },
                {
                    key: 'Content Download',
                    desc: '下载服务端返回数据的时间',
                    value: pnt.responseEnd - pnt.responseStart,
                },
                {
                    key: 'request',
                    desc: 'request请求耗时',
                    value: pnt.responseEnd - pnt.requestStart,
                },
                {
                    key: 'dom树',
                    desc: '解析dom树耗时',
                    value: pnt.domComplete - pnt.domInteractive,
                },
                {
                    key: 'DOMContentLoaded',
                    desc: 'dom加载完成的时间',
                    value: pnt.domContentLoadedEventEnd,
                },
                {
                    key: 'Loaded',
                    desc: '页面load的总耗时',
                    value: pnt.duration
                },
            ];
            // tslint:disable-next-line:no-console
            console && console.table && console.table(column);
        }, 0)
    }
}
window.addEventListener('load', times); // onload 事件触发
