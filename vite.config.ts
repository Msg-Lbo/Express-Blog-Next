// vite.config.ts
import { defineConfig, loadEnv, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

import { resolve } from 'path'
const pathResolve = (dir: string): any => {
  return resolve(__dirname, ".", dir)
}

const alias: Record<string, string> = {
  '@': pathResolve("src")
}

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  const basePublicPath: string = loadEnv(mode, process.cwd()).VITE_BASE_PUBLIC_PATH
  return defineConfig({
    // base: basePublicPath,
    server: {
      host: '0.0.0.0',
      proxy: {
        '/api/v1': {
          target: 'http://127.0.0.1:9090',
          changeOrigin: false,
          // rewrite: (path) => path.replace(/^\/api\/v1/, '')
        },
        '/uploads': {
          target: 'http://127.0.0.1:9090',
          changeOrigin: false,
          // rewrite: (path) => path.replace(/^\/uploads/, '')
        }
      }
    },
    build: {
      outDir: basePublicPath, // 指定输出文件夹路径
    },
    plugins: [
      vue(),
      AutoImport({
        imports: [
          'vue',
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar'
            ]
          },

        ],
        dts: 'src/auto-imports.d.ts'
      }),
      Components({
        resolvers: [NaiveUiResolver()]
      })
    ],
    resolve: {
      alias
    },
    // 自动导入

  })
}