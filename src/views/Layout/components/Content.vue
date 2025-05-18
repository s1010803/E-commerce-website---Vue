<script setup>
import AOS from 'aos'
import 'aos/dist/aos.css'
import { onMounted, ref } from 'vue'

// 服飾和商品圖片
const clothes = ref([
  'raucohouse02.webp',
  'nerdy02.jpg',
  'lee02.jfif'
])

const items = ref([
  'converse02.jpg',
  'adidas02.jpg',
  'nb03.jpg'
])

onMounted(() => {
  AOS.init({
    duration: 3000, 
    once: false,
    offset: 300
  })
})
</script>

<template>
  <!-- Clothes Section -->
  <section id="clothes" class="w-full mt-16">
    <h3 class="text-3xl ml-10 my-10">--Clothes :</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:ml-40">
      <div 
        v-for="item in clothes" 
        :key="item"
        class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
        data-aos="fade-left"
      >
        <a href="#">
          <img 
            class="rounded-t-lg w-full h-100 object-cover" 
            :src="`http://127.0.0.1:3000/images/${item}`" 
            alt="服飾推薦" 
          />
        </a>
      </div>
    </div>
  </section>

  <!-- Items Section -->
  <section id="items" class="w-full my-16">
    <h3 class="text-3xl ml-10 my-10">--Items :</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:ml-40">
      <div 
        v-for="item in items" 
        :key="item"
        class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
        data-aos="fade-right"
        data-aos-duration="3000"
      >
        <a href="#">
          <img 
            class="rounded-t-lg w-full h-100 object-cover" 
            :src="`http://127.0.0.1:3000/images/${item}`" 
            alt="飾品推薦" 
          />
        </a>
      </div>
    </div>
  </section>
</template>
