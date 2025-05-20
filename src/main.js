import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '../tailwind.css'
import router from './router';
import { createPinia } from 'pinia'
import Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

createApp(App)
  .use(router)
  .use(createPinia())
  .use(Toastify, {
    autoClose: 3000, // 預設自動關閉時間（毫秒）
    position: 'top-right', // 顯示位置
  })
  .mount('#app')
