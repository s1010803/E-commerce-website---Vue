<script setup>
import { defineAsyncComponent } from 'vue';
const Navbar = defineAsyncComponent(() => import('./components/Navbar.vue'));
const Carousel = defineAsyncComponent(() => import('./components/Carousel.vue'));
const Hot = defineAsyncComponent(() => import('./components/Hot.vue'));
const Content = defineAsyncComponent(() => import('./components/Content.vue'));
const Footer = defineAsyncComponent(() => import('./components/Footer.vue'));
</script>

<template>
  <div class="flex flex-col min-h-screen bg-[#fff]">
    <Navbar />
    <!-- 僅在根路徑 / 顯示 Carousel 和 Hot -->
    <template v-if="$route.path === '/'">
      <Carousel />
      <Hot />
      <Content />
    </template>
    <!-- 動態內容 -->
     <template v-else>
      <router-view />
     </template>
     <Footer />
  </div>
</template>