<!-- src/components/Products.vue -->
<script setup>
import AOS from 'aos'
import 'aos/dist/aos.css'

import { onMounted, watch, ref } from 'vue'
import { getCardApi } from '../../../apis/card'
import Breadcrumb from '../../../utils/Breadcrumb.vue'

// 接收父層傳入的分類參數
const props = defineProps({
  category: { type: String, default: '' }
})

// 商品資料清單
const cardList = ref([])

// 取得商品資料
const fetchCards = async () => {
  try {
    const res = await getCardApi(props.category)
    if (res.success) cardList.value = res.data
  } catch (error) {
    console.error('獲取商品資料失敗', error)
  }
}

// 初始執行一次
onMounted(() => {
  fetchCards()

  // 初始化 AOS 動畫
  AOS.init({
    duration: 2000, // 動畫持續時間
    once: false,    // 是否只執行一次
    offset: 250     // 偏移量
  })
})

// 當 category 改變時重新抓資料
watch(() => props.category, fetchCards)
</script>

<template>
  <Breadcrumb class="pt-26 ml-30"/>
  <!-- 商品區塊 -->
  <section class="pt-10 px-4">
    <div
      class="w-400 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mx-auto"
      data-aos="fade-up"
    >
      <!-- 單筆商品卡片 -->
      <div
        v-for="item in cardList"
        :key="item.id"
        class="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
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
            <button class="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition hover:cursor-pointer">
              詳細資訊
            </button>
            <button class="flex-1 px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition hover:cursor-pointer">
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
