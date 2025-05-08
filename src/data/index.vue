<script setup>
import { defineAsyncComponent } from 'vue';
const Navbar = defineAsyncComponent(() => import('./components/Navbar.vue'));
const Carousel = defineAsyncComponent(() => import('./components/Carousel.vue'));
const Hot = defineAsyncComponent(() => import('./components/Hot.vue'));
const Content = defineAsyncComponent(() => import('./components/Content.vue'));
const Footer = defineAsyncComponent(() => import('./components/Footer.vue'));
</script>

<template>
  <div class="min-h-screen bg-[#fff]">
    <Navbar />
    <Carousel />
    <Hot />
    <Content />
    <router-view />
    <Footer />
  </div>
</template>