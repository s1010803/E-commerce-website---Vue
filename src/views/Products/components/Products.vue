<!-- src/components/Products.vue -->
<script setup>
import AOS from 'aos'
import 'aos/dist/aos.css'
import { onMounted, watch, ref } from 'vue';
import { getCardApi } from '../../../apis/card';

const props = defineProps({
  category: { type: String, default: '' }
});

const cardList = ref([]);

const fetchCards = async () => {
  try {
    const res = await getCardApi(props.category);
    if (res.success) cardList.value = res.data;
  } catch (error) {
    console.error('獲取商品資料失敗', error);
  }
};

onMounted(fetchCards);
onMounted(() => {
  AOS.init({
    duration: 1000, 
    once: false,
    offset: 250
  })
});
watch(() => props.category, fetchCards);
</script>

<template>
  <section class="pt-30 px-4">
    <div class="w-400 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mx-auto" data-aos="fade-up">
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

        <!-- 商品內容 -->
        <div class="p-5">
          <!-- 名稱 -->
          <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ item.pName }}</h3>

          <!-- 簡介 -->
          <p class="text-sm text-gray-600 mb-2 line-clamp-2">{{ item.pIntro }}</p>

          <!-- 價格 -->
          <p class="text-red-500 text-lg font-bold mb-4">NT${{ item.pPrice }}</p>

          <!-- 按鈕 -->
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
