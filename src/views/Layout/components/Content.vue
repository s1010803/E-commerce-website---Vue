<script setup>
import AOS from 'aos'
import 'aos/dist/aos.css'
import { onMounted, ref } from 'vue'

const clothes = ref(
  [
    'raucohouse02.webp',
    'nerdy02.jpg' ,
    'lee02.jfif'
  ]
)

const items = ref(
  [
    'converse02.jpg',
    'adidas02.jpg' ,
    'nb03.jpg'
  ]
)
</script>

<template>
  <section id="clothes" class="w-full mt-16">
    <h3 class="text-3xl ml-10 my-10">--Clothes :</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 mt-30 px-4 md:ml-40 gap-8">
      <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition duration-300 ease-in-out cursor-pointer" v-for="item in clothes" :key="item" data-aos="fade-left" data-aos-duration="3000">
        <a href="#">
          <img class="rounded-t-lg w-full h-full object-cover" :src="`http://127.0.0.1:3000/images/${item}`" alt="服飾推薦" />
        </a>
      </div>
    </div>
  </section>

  <section id="items" class="w-full my-16">
    <h3 class="text-3xl ml-10 my-10">--Items :</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 mt-30 px-4 md:ml-40 gap-8">
      <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition duration-300 ease-in-out cursor-pointer" v-for="item in items" :key="item" data-aos="fade-right" data-aos-duration="3000">
        <a href="#">
          <img class="rounded-t-lg w-full h-full object-cover" :src="`http://127.0.0.1:3000/images/${item}`" alt="飾品推薦" />
        </a>
      </div>
    </div>
  </section>
</template>