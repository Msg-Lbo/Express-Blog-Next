![Express-Blog-Next](https://socialify.git.ci/Msg-Lbo/Express-Blog-Next/image?description=1&descriptionEditable=%E4%B8%80%E4%B8%AA%E7%AE%80%E6%B4%81%E7%9A%84%E5%89%8D%E5%90%8E%E7%AB%AF%E5%88%86%E7%A6%BB%E5%8D%9A%E5%AE%A2%E7%B3%BB%E7%BB%9F&font=Raleway&forks=1&issues=1&language=1&name=1&owner=1&pulls=1&stargazers=1&theme=Auto)
<table>
<tr>
  <td><a href="https://github.com/Msg-Lbo/Express-Blog-Next">前端</a></td>
  <td>Express Blog Next(👈就是这里)</td>
</tr>
<tr>
  <td><a href="https://github.com/Msg-Lbo/Express-Blog-Server">后端</a></td>
  <td>Express Blog Server</td>
</tr>
</table>

## 技术栈
| 后端    | 前端         |
| ------- | ------------ |
| Node.js | Vite         |
| Express | Vue3         |
| Mysql   | Typescript   |
|         | Axios        |
|         | Naive UI     |
|         | Tailwind CSS |
|         | Sass         |


## 项目运行(开发环境)
### 配合后端Readme食用
>pnpm(推荐)
``` bash
# 安装依赖
pnpm install

# 开发环境
pnpm run dev
```

## 项目运行(生产环境)
1,先打包前端项目，然后启动后端项目
``` bash
pnpm run build
```
2,前端项目打包后，将dist目录下的所有文件复制到你的站点目录下
3,配置nginx,配置如下,其他配置根据你的实际情况进行修改
``` nginx
server {
        listen        4173;
        server_name  127.0.0.1;
        root   "/dist";
        location / {
            index index.php index.html error/index.html;
            try_files $uri $uri/ /index.html;
        }

        location /api/v1/{
            proxy_pass http://127.0.0.1:9090;
        }

        location /uploads/{
            proxy_pass http://127.0.0.1:9090;
        }
}
```
4,启动nginx
5,进入 **/install** 路由,如:http://127.0.0.1/install,进行安装

