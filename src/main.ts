import { createApp } from 'vue'
import App from './App.vue'

import './style.css'
import '@icon-park/vue-next/styles/index.css'

// router
import router from './router/index'

// utils
import './utils/performance'

// store
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')

