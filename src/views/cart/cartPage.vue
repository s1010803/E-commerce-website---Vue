<script setup>
import { useCartStore } from '@/stores/useCart'
import { computed } from 'vue'

const cartStore = useCartStore()

const cartItems = computed(() => cartStore.items)
const totalPrice = computed(() => cartStore.totalPrice)

const handleCheckout = () => {
  alert('前往結帳流程（未實作）')
}
</script>

<template>
  <section class="px-6 md:px-20 py-16 min-h-screen bg-gray-50 mt-10">
    <h1 class="text-3xl font-bold mb-10">購物車</h1>

    <!-- 空購物車訊息 -->
    <div v-if="cartItems.length === 0" class="text-center text-gray-500 mt-20">
      <p class="text-xl">目前購物車是空的 🛒</p>
      <router-link to="/products" class="text-blue-600 underline mt-4 inline-block">前往選購商品</router-link>
    </div>

    <!-- 有商品時 -->
    <div v-else>
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <!-- 商品清單 -->
        <div class="lg:col-span-3 space-y-6">
          <div 
            v-for="item in cartItems" :key="item.id" 
            class="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm"
            >
            <img
              :src="`http://localhost:3000/images/${item.pImg ?? item.images[0].pImg}`"
              alt="商品圖片"
              class="w-24 h-24 object-cover rounded"
            />
            <div class="flex-1">
              <h2 class="text-lg font-semibold">{{ item.pName }}</h2>
              <p class="text-sm text-gray-600 mt-1">NT${{ item.pPrice }}</p>
              <div class="flex items-center gap-2 mt-3">
                <button @click="cartStore.decreaseQuantity(item.pid)" class="px-2 py-1 bg-gray-200 rounded cursor-pointer">−</button>
                <span>{{ item.quantity }}</span>
                <button @click="cartStore.increaseQuantity(item.pid)" class="px-2 py-1 bg-gray-200 rounded cursor-pointer">＋</button>
              </div>
            </div>
            <div class="flex flex-col items-end gap-4">
              <p class="font-bold text-gray-600">NT${{ item.pPrice * item.quantity }}</p>
              <button @click="cartStore.removeFromCart(item.pid)" class="text-sm text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition cursor-pointer">移除</button>
            </div>
          </div>
        </div>

        <!-- 購物車總覽 -->
        <div class="lg:col-span-2 bg-white p-6 rounded-lg shadow-md h-fit sticky top-24">
          <h2 class="text-xl font-bold mb-4">訂單摘要</h2>
          <div class="flex justify-between mb-2">
            <span>商品總計：</span>
            <span>NT${{ totalPrice }}</span>
          </div>
          <div class="border-t my-4"></div>
          <button
            @click="handleCheckout"
            class="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded text-lg transition cursor-pointer"
          >
            前往結帳
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
