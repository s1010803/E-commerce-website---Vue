<script setup>
import { defineAsyncComponent } from 'vue';
const Products = defineAsyncComponent(() => import('./components/Products.vue'));
</script>

<template>
  <div class="min-h-screen bg-[#fff]">
    <Products category="accessories"/>
  </div>
</template>