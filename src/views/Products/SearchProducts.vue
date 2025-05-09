<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Fuse from 'fuse.js'
import { getAllProductsApi } from '../../apis/allProduct'
import AOS from 'aos'
import 'aos/dist/aos.css'

const route = useRoute()
const searchQuery = ref(route.query.q || '') // 取得路由中的搜尋參數
const products = ref([])  // 儲存商品資料
const rawResults = ref([])  // 儲存搜尋結果
let fuse = null

// 取得商品資料
async function fetchProducts() {
  try {
    const category = route.query.category || ''  // 取得網址上的分類參數
    const res = await getAllProductsApi()       // 加上分類參數呼叫 API
    console.log(res);
    if (res.success && Array.isArray(res.data)) {
      products.value = res.data
      fuse = new Fuse(products.value, {
        keys: ['pName'],
        threshold: 0.4
      })
      searchProducts()  // 搜尋邏輯
    } else {
      console.error('無法獲取商品資料，請稍後再試。')
      products.value = []  // 清空商品列表
    }
  } catch (error) {
    console.error('資料搜尋失敗', error)
  }
}

// 搜尋邏輯
function searchProducts() {
  if (!fuse || !searchQuery.value.trim()) {
    // 沒有搜尋條件時，顯示所有商品
    rawResults.value = products.value.map(item => ({ item }));
  } else {
    // 執行搜尋，並確保處理搜索結果
    rawResults.value = fuse.search(searchQuery.value).map(result => result.item);
  }

  if (rawResults.value.length === 0) {
    console.log('找不到符合條件的商品');
  }
}

// 過濾後的商品
const filteredProducts = computed(() => rawResults.value)

// 監聽路由中的查詢參數，當改變時重新執行搜尋
watch(() => route.query.q, (newQuery) => {
  searchQuery.value = newQuery || ''  // 更新 searchQuery
  searchProducts()  // 重新搜尋
})

// 頁面初始化時獲取商品資料
onMounted(() => {
  fetchProducts()
  AOS.init({
    duration: 2000, // 動畫持續時間
    once: false,    // 是否只執行一次
    offset: 250     // 偏移量
  })
})
</script>

<template>
  <!-- 商品區塊 -->
  <section class="pt-40 px-4">
    <div class="w-400 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mx-auto">
      <!-- 檢查是否有商品 -->
      <div v-if="filteredProducts.length === 0" class="col-span-4 text-center text-lg text-gray-600">
        <p>沒有符合條件的商品。</p>
      </div>
      
      <!-- 單筆商品卡片 -->
      <div
        v-for="item in filteredProducts"
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
