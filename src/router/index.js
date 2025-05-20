import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../views/Layout/index.vue';
import Login from '../views/Login/index.vue';
import Products from '../views/Products/AllProducts.vue';
import Clothes from '../views/Products/Clothes.vue';
import Accessories from '../views/Products/Accessories.vue';
import SearchProducts from '../views/Products/SearchProducts.vue';
import ProductIntro from '../views/Products/ProductIntro.vue';
import CartPage from '../views/cart/cartPage.vue';

// 定義路由
const routes = [
  {
    path: '/',
    component: Layout
  },
  {
    path: '/products',
    component: Layout,
    meta: { breadcrumb: '所有商品' },
    children: [
      {
        path: '', // /products
        component: Products,
      },
      {
        path: 'clothes', // /products/clothes
        component: Clothes,
        meta: { breadcrumb: '服飾' }
      },
      {
        path: 'accessories', // /products/accessories
        component: Accessories,
        meta: { breadcrumb: '飾品' }
      },
      {
        path: 'search', // /products/SearchProducts
        component: SearchProducts,
      },
      {
        path: ':id', // /products/:id
        component: ProductIntro,
        props: true
      }
    ]
  },
  {
    path: '/cart',
    component: Layout,
    children: [
      {
        path: '',
        component: CartPage
      }
    ]
  },
  {
    path: '/login',
    component: Login,
  }
];

// 創建路由器實例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 使用 HTML5 History 模式
  routes, // 路由配置
  scrollBehavior(to, from, savePosition) {
    // 若有保存的位置(例如瀏覽器返回) 則返回該位置
    if (savePosition) {
      return savePosition
    } else {
      // 否則跳轉回頂部
      return { top: 0 }
    }
  }
});

export default router;
