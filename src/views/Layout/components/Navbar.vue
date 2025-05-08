<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const openMenu = () => {
  isMenuOpen.value = true
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v6.2.1/css/all.css">
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
      <li><a href="http://localhost:5173/" @click="closeMenu">Home</a></li>
      <li><a href="http://localhost:5173/products" @click="closeMenu">All Products</a></li>
      <li><a href="http://localhost:5173/products/clothes" @click="closeMenu">Clothes</a></li>
      <li><a href="http://localhost:5173/products/accessories" @click="closeMenu">Items</a></li>
      <li><a href="#contact" @click="closeMenu">Contact Us</a></li>
    </ul>

    <!-- 中間導覽按鈕 -->
    <ul id="ul" class="flex items-center absolute left-1/2 -translate-x-1/2 gap-6 lg:gap-8 rounded-full px-12 py-3 bg-white/50 shadow-sm">
      <li><a href="http://localhost:5173/">Home</a></li>
      <li><a href="http://localhost:5173/products">All Products</a></li>
      <li><a href="http://localhost:5173/products/clothes">Clothes</a></li>
      <li><a href="http://localhost:5173/products/accessories">Items</a></li>
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
          class="w-full h-10 px-5 pr-16 rounded-full text-sm text-gray-800 placeholder-gray-500 border border-white/30 bg-white/20 backdrop-blur-md shadow-md focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
          type="search" name="search" placeholder="Search" />

        <button type="submit" class="absolute right-0 top-0 mt-2.5 mr-4 text-gray-700 cursor-pointer hover:text-white transition">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <!-- 使用者圖示 -->
      <button class="cursor-pointer">
        <i class="fa-regular fa-user fa-2xl"></i>
      </button>

      <!-- 購物車圖示 -->
      <button class="cursor-pointer">
        <img src="/src/imgs/shopping_cart.png" alt="購物車">
      </button>
    </div>
  </nav>
</template>
