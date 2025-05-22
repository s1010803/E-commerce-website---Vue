import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '../tailwind.css'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

// 建立 pinia 實例
const pinia = createPinia()

// 使用 persist 插件
pinia.use(piniaPluginPersistedstate)

createApp(App)
  .use(router)
  .use(pinia) // 用處理過的 pinia
  .use(Toastify, {
    autoClose: 3000,
    position: 'top-right',
  })
  .mount('#app')