<script setup>
import AOS from 'aos'
import 'aos/dist/aos.css'
import { getHotApi } from '../../../apis/hot'
import { onMounted, ref } from 'vue'

const hotList = ref([])
const getHot = async () => {
  try {
    const res = await getHotApi();
    if (res.success) {
      console.log(res.data);
      hotList.value = res.data;
      AOS.refresh();
    }
  } catch (err) {
    console.error('熱門商品獲取失敗', err);
  }
}

onMounted(() => {
  getHot();
  AOS.init({
    duration: 2000, 
    once: false,
    offset: 300
  })
})
</script>

<template>
  <img src="/src/p.img/短袖廣告圖.webp" alt="" class="mx-auto my-12">
  <div id="hot" class="w-full h-8 bg-gradient-to-r from-pink-500 to-yellow-500"></div>
  <section class="w-full mt-16">
    <h3 class="text-3xl ml-10 my-10">--人氣商品:</h3>
    <div class="grid grid-cols-1 md:grid-cols-4 mt-30 px-4 md:ml-15 gap-8">
      <div class="opacity-0 max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition duration-300 ease-in-out cursor-pointer" v-for="item in hotList" :key="item.hotSort" data-aos="fade-up">
        <a href="#">
          <img class="rounded-t-lg" :src="`http://127.0.0.1:3000/images/${item.pImg}`" alt="人氣商品" />
        </a>
      </div>
    </div>
  </section>
</template>