<!-- src/components/Products.vue -->
<script setup>
import AOS from 'aos'
import 'aos/dist/aos.css'

import { onMounted, watch, ref, computed, toRef } from 'vue'
import { getCardApi } from '../../../apis/card'
import Breadcrumb from '../../../utils/Breadcrumb.vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../../../stores/cart'
import { toast } from 'vue3-toastify'

const cartStore = useCartStore()


// 接收父層傳入的分類參數
const props = defineProps({
  category: { type: String, default: '' }
})

// 商品資料清單 & 分頁參數
const cardList = ref([])
const currentPage = ref(1)
const totalPages = ref(1)
const limit = 12 // 每頁顯示 12 筆

// 取得商品資料（含分類、分頁）
const fetchCards = async () => {
  try {
    const res = await getCardApi(props.category, currentPage.value, limit)
    if (res.success) {
      cardList.value = res.data
      totalPages.value = res.totalPages
      AOS.refresh();  // 確保每次數據更新後刷新動畫效果
    }
  } catch (error) {
    console.error('獲取商品資料失敗', error)
  }
}

// 換頁方法
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    fetchCards()
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}

// 詳細資訊
const router = useRouter()
const goToDetail = (id) => {
  router.push(`/products/${id}`);
}

// 初次載入 & 初始化 AOS
onMounted(() => {
  fetchCards()
  AOS.init({
    duration: 3000,
    once: false,
    offset: 200
  })
})

// 當分類變化時重設分頁 & 抓資料
watch(() => props.category, () => {
  currentPage.value = 1
  fetchCards()
})
</script>

<template>
  <Breadcrumb class="pt-26 ml-30"/>
  <!-- 商品區塊 -->
  <section class="pt-10 px-4">
    <div
      class="w-400 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mx-auto"
    >
      <!-- 單筆商品卡片 -->
      <div
        v-for="item in cardList"
        :key="item.id"
        class="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        data-aos="fade-up"
      >
        <!-- 商品圖片 -->
        <img
          :src="`http://localhost:3000/images/${item.pImg}`"
          alt="商品圖片"
          class="w-full h-60 object-cover rounded-t-lg hover:cursor-pointer"
        />

        <!-- 商品內容區塊 -->
        <div class="p-5">
          <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ item.pName }}</h3>
          <p class="text-sm text-gray-600 mb-2 line-clamp-2">{{ item.pIntro }}</p>
          <p class="text-red-500 text-lg font-bold mb-4">NT${{ item.pPrice }}</p>

          <!-- 操作按鈕 -->
          <div class="flex gap-3">
            <button 
            @click="goToDetail(item.pid)"
            class="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition hover:cursor-pointer">
              詳細資訊
            </button>
            <button 
            @click="() => {
              cartStore.addToCart(item)
              toast.success('已加入購物車！')
            }"
            class="flex-1 px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition hover:cursor-pointer">
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="mt-30">
    <nav aria-label="Page navigation" class="mt-10">
      <ul class="flex items-center justify-center -space-x-px h-10 text-base">
        <!-- Previous -->
        <li>
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 hover:cursor-pointer"
            >
              <span class="sr-only">Previous</span>
              <svg class="w-3 h-3 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
              </svg>
            </button>
        </li>

        <!-- Page numbers -->
        <li v-for="page in totalPages" :key="page">
            <button
              @click="goToPage(page)"
              :class="[
                'flex items-center justify-center px-4 h-10 leading-tight border',
                page === currentPage
                  ? 'z-10 text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                  : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
              ]" class="hover:cursor-pointer"
            >
              {{ page }}
            </button>
        </li>

        <!-- Next -->
        <li>
            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 hover:cursor-pointer"
            >
              <span class="sr-only">Next</span>
              <svg class="w-3 h-3 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
              </svg>
            </button>
        </li>
      </ul>
    </nav>
  </section>
</template>
