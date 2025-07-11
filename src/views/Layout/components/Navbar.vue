<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDebounce } from '@vueuse/core'
import { useCartStore } from '@/stores/useCart'

const cartStore = useCartStore()
const cartItemCount = computed(() => cartStore.itemCount)

const isMenuOpen = ref(false)
const searchQuery = ref('')
const debounceQuery = useDebounce(searchQuery, 300)
const router = useRouter()

const openMenu = () => {
  isMenuOpen.value = true
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const goToSearch = () => {
  if (debounceQuery.value.trim()) {
    router.push({ path: '/products/search', query: { q: debounceQuery.value } })
    searchQuery.value = ''
  }
}
</script>

<template>
  <div class="fixed top-0 right-0 w-11/12 -z-10 translate-y-[-90%]">
    <img src="/src/imgs/header-bg-color.png" alt="背景圖片" class="w-full">
  </div>

  <nav class="w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50">
    <!-- 開啟選單按鈕 -->
    <button class="cursor-pointer -ml-22" @click="openMenu">
      <img src="/src/imgs/menu-black.png" alt="漢堡選單" class="w-6">
    </button>

    <!-- 側邊選單 -->
    <ul
      id="sideMenu"
      :class="['flex flex-col gap-8 py-20 px-10 fixed top-0 bottom-0 w-64 z-50 h-screen bg-white/50 transition duration-500', isMenuOpen ? 'left-0' : '-left-64']"
    >
      <div class="absolute right-6 top-6" @click="closeMenu">
        <img src="/src/imgs/close-black.png" alt="關閉選單" class="w-5 cursor-pointer">
      </div>
      <li><router-link to="/" @click="closeMenu">Home</router-link></li>
      <li><router-link to="/products" @click="closeMenu">All Products</router-link></li>
      <li><router-link to="/products/clothes" @click="closeMenu">Clothes</router-link></li>
      <li><router-link to="/products/accessories" @click="closeMenu">Items</router-link></li>
      <li><a href="#contact" @click="closeMenu">Contact Us</a></li>
    </ul>

    <!-- 中間導覽按鈕 -->
    <ul id="ul" class="flex items-center absolute left-1/2 -translate-x-1/2 gap-6 lg:gap-8 rounded-full px-12 py-3 bg-white/50 shadow-sm">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/products">All Products</router-link></li>
      <li><router-link to="/products/clothes">Clothes</router-link></li>
      <li><router-link to="/products/accessories">Items</router-link></li>
      <li><a href="#contact">Contact Us</a></li>
    </ul>

    <!-- 功能按鈕區 -->
    <div class="flex items-center gap-12 -mr-25">
      <button class="cursor-pointer">
        <img src="/src/imgs/moon_icon.png" alt="夜間模式" class="w-8 mt-3">
      </button>

      <!-- 搜尋欄 -->
      <div class="pt-1 relative mx-auto text-gray-600 w-40 max-w-md">
        <input
          v-model="searchQuery"
          @keyup.enter="goToSearch"
          class="w-full h-10 px-5 pr-16 rounded-full text-sm text-gray-800 placeholder-gray-500 border border-white/30 bg-white/20 backdrop-blur-md shadow-md focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
          type="search" name="search" placeholder="Search" />

        <button type="button" @click="goToSearch" class="absolute right-0 top-0 mt-2.5 mr-4 text-gray-700 cursor-pointer hover:text-white transition">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <!-- 使用者圖示 -->
      <button class="cursor-pointer">
        <i class="fa-regular fa-user fa-2xl"></i>
      </button>

      <!-- 購物車圖示 -->
      <!-- 購物車圖示（帶徽章） -->
      <router-link to="/cart" class="relative cursor-pointer">
        <img src="/src/imgs/shopping_cart.png" alt="購物車" class="w-8 h-8">

        <!-- 購物車徽章 -->
        <span
          v-if="cartItemCount > 0"
          class="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow-lg animate-bounce transition"
        >
          {{ cartItemCount > 99 ? '99+' : cartItemCount }}
        </span>
      </router-link>
    </div>
  </nav>
</template>
