<script setup>
import AOS from 'aos'
import 'aos/dist/aos.css'
import { getHotApi } from '@/apis/hot'
import { onMounted, ref } from 'vue'

const hotList = ref([])

// 獲取熱門商品資料
const getHot = async () => {
  try {
    const res = await getHotApi();
    if (res.success) {
      // console.log(res.data);
      hotList.value = res.data;
      AOS.refresh();  // 確保每次數據更新後刷新動畫效果
    } else {
      console.error('獲取熱門商品資料失敗:', res.message || '未知錯誤');
    }
  } catch (err) {
    console.error('熱門商品獲取失敗', err);
  }
}

onMounted(() => {
  getHot();  // 組件掛載時獲取資料
  AOS.init({
    duration: 3000, 
    once: false,  // 每次都觸發動畫
    offset: 300   // 觸發動畫的偏移量
  })
})
</script>

<template>
  <router-link to="/products">
    <img src="/src/p.img/短袖廣告圖.webp" alt="短袖廣告圖" class="mx-auto my-12">
  </router-link>
  <div id="hot" class="w-full h-8 bg-gradient-to-r from-pink-500 to-yellow-500"></div>
  <section class="w-full mt-16">
    <h3 class="flex items-center text-3xl my-12 
               before:content-[''] before:w-14 before:h-[3px] before:bg-gradient-to-r before:from-pink-500 before:to-yellow-500 before:mr-2 before:ml-6
               after:content-[''] after:w-14 after:h-[3px] after:bg-gradient-to-r after:from-blue-500 after:to-green-500 after:ml-2">
      人氣商品
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:ml-15">
      <!-- 使用 v-for 渲染熱門商品 -->
      <div
        class="opacity-0 max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
        v-for="item in hotList"
        :key="item.hotSort"
        data-aos="fade-up"
      >
        <router-link :to="`/products/${item.pid}`">
          <img 
            class="rounded-t-lg w-full h-100 object-cover" 
            :src="`http://127.0.0.1:3000/images/${item.pImg}`"
            alt="人氣商品"
          />
        </router-link>
      </div>
    </div>
  </section>
</template>
