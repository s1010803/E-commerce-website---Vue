import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../views/Layout/index.vue';
import Login from '../views/Login/index.vue';
import Products from '../views/Products/AllProducts.vue';
import Clothes from '../views/Products/Clothes.vue';
import Accessories from '../views/Products/Accessories.vue';

// 定義路由
const routes = [
  // 根路徑，使用 Layout 作為父組件
  {
    path: '/',
    component: Layout,
    children: [
      // 根路徑顯示的內容（首頁）
      {
        path: '', // 空路徑對應的是 Layout 頁面中的 <router-view />
        component: Products, // 可選擇主頁顯示的內容，這裡顯示 AllProducts.vue
      },
    ],
  },

  // 其他路徑使用 Layout 作為父組件，只顯示 Navbar 和 Footer
  {
    path: '/products',
    component: Layout,
    children: [
      {
        path: '', 
        component: Products,
      },
    ],
  },
  {
    path: '/products/clothes',
    component: Layout,
    children: [
      {
        path: '', 
        component: Clothes,
      },
    ],
  },
  {
    path: '/products/accessories',
    component: Layout,
    children: [
      {
        path: '', 
        component: Accessories,
      },
    ],
  },

  // login 頁面不需要 Layout 包裝
  {
    path: '/login',
    component: Login,
  },
];

// 創建路由器實例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 使用 HTML5 History 模式
  routes, // 路由配置
});

export default router;
