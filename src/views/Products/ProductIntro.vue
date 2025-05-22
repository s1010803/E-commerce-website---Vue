<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
// Swiper 樣式
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
// Swiper 所需模組
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

import { getProductDetail } from '@/apis/productDetail'
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { useCartStore } from '@/stores/useCart'
import { toast } from 'vue3-toastify'

const cartStore = useCartStore()
const cartItems = computed(() => cartStore.items)

const route = useRoute()
const router = useRouter()
const product = ref(null)

async function fetchProduct() {
  try {
    const id = route.params.id
    const res = await getProductDetail(id)
    console.log(res);
    if (res.success) {
      product.value = res.data
    } else {
      console.error('無法獲取商品資料，請稍後再試。');
      product.value = []
    }
  } catch (err) {
    console.error('獲取商品資料失敗', err)
  }
}

// Swiper 實例 - 縮圖用
const thumbsSwiper = ref(null)

// 接收縮圖 Swiper 實例
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper
}

// 匯出模組 (供 template 使用)
const modules = [FreeMode, Navigation, Thumbs]

const quantity = ref(1)

function increase() {
  quantity.value++
}

function decrease() {
  if (quantity.value > 1) quantity.value--
}

onMounted(() => {
  fetchProduct()
})
</script>

<template>
  <section class="flex justify-center items-center w-full h-screen py-10 mt-8">
    <!-- 商品圖片 -->
    <div class="w-[350px] h-[350px] md:w-[750px] md:h-[750px]" v-if="product">
      <swiper
      :style="{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      }"
      :spaceBetween="10"
      :navigation="true"
      :thumbs="{ swiper: thumbsSwiper }"
      :modules="modules"
      class="mySwiper2"
      >
        <swiper-slide v-for="(image, index) in product.images"
            :key="index">
          <img 
            :src="`http://localhost:3000/images/${image.pImg}`" />
        </swiper-slide>
      </swiper>
      <swiper
        @swiper="setThumbsSwiper"
        :spaceBetween="10"
        :slidesPerView="4"
        :freeMode="true"
        :watchSlidesProgress="true"
        :modules="modules"
        class="mySwiper mt-10"
      >
        <swiper-slide v-for="(image, index) in product.images"
            :key="index">
          <img
            class="cursor-pointer"
            :src="`http://localhost:3000/images/${image.pImg}`" />
        </swiper-slide>
      </swiper>
    </div>

    <!-- 商品詳情 -->
    <div class="w-auto h-auto md:w-[800px] md:h-[800px] ml-10" v-if="product">
      <p class="text-xl ml-6 py-4 md:text-3xl md:font-bold md:py-8">{{ product.pName }}</p>
      <hr class="border-t-2 border-gray-300 my-4" />
      <p class="text-2xl pt-4 md:text-4xl md:pt-8 text-amber-500">NT${{ product.pPrice }}</p>
      <p class="text-xl pt-6 md:text-2xl md:pt-8">{{ product.pIntro }}</p>
      
      <!-- 數量選擇 -->
      <div class="mt-12 flex items-center gap-4">
        <label for="quantity" class="text-xl">數量:</label>
        <div class="flex items-center">
          <button class="px-4 py-2 bg-gray-200 rounded-l-md hover:bg-gray-300" @click="decrease">-</button>
          <input 
            id="quantity" 
            type="number" 
            min="1" 
            class="w-16 h-10 text-center border-2 border-gray-300 rounded-md"
            v-model.number="quantity"
          />
          <button class="px-4 py-2 bg-gray-200 rounded-r-md hover:bg-gray-300" @click="increase">+</button>
        </div>
      </div>

      <button 
        class="mt-10 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition cursor-pointer"
        @click="() => {
          cartStore.addToCart({ ...product, quantity: quantity })
          toast.success('已加入購物車！')
          }"
      >
        加入購物車
      </button>
    </div>
  </section>
  
</template>

<style scoped>
html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

body {
  background: #000;
  color: #000;
}

.swiper {
  width: 100%;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
}

.mySwiper2 {
  height: 80%;
  width: 100%;
}

.mySwiper {
  height: 20%;
  box-sizing: border-box;
  padding: 10px 0;
}

.mySwiper .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}

.mySwiper .swiper-slide-thumb-active {
  opacity: 1;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>