<script setup>
import AOS from 'aos'
import 'aos/dist/aos.css'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

// 服飾和商品圖片
const clothes = ref([
  'raucohouse02.webp',
  'nerdy02.jpg',
  'lee02.jfif'
])

const items = ref([
  'nike03.jpg',
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
    <h3 class="flex items-center text-3xl my-12 
              before:content-[''] before:w-14 before:h-[3px] before:bg-gradient-to-r before:from-pink-500 before:to-yellow-500 before:mr-2 before:ml-6
              after:content-[''] after:w-14 after:h-[3px] after:bg-gradient-to-r after:from-blue-500 after:to-green-500 after:ml-2">
      Clothes
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:ml-40">
      <div 
        v-for="item in clothes" 
        :key="item"
        class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
        data-aos="fade-left"
      >
        <router-link to="/products/clothes">
          <img 
            class="rounded-t-lg w-full h-100 object-cover" 
            :src="`http://127.0.0.1:3000/images/${item}`" 
            alt="服飾推薦" 
          />
        </router-link>
        
      </div>
    </div>
  </section>

  <!-- Items Section -->
  <section id="items" class="w-full my-16">
    <h3 class="flex items-center text-3xl my-12 
              before:content-[''] before:w-14 before:h-[3px] before:bg-gradient-to-r before:from-pink-500 before:to-yellow-500 before:mr-2 before:ml-6
              after:content-[''] after:w-14 after:h-[3px] after:bg-gradient-to-r after:from-blue-500 after:to-green-500 after:ml-2">
      Items
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:ml-40">
      <div 
        v-for="item in items" 
        :key="item"
        class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
        data-aos="fade-right"
        data-aos-duration="3000"
      >
        
        <router-link to="/products/accessories">
          <img 
            class="rounded-t-lg w-full h-100 object-cover" 
            :src="`http://127.0.0.1:3000/images/${item}`" 
            alt="飾品推薦" 
          />
        </router-link>
        
      </div>
    </div>
  </section>
</template>
