<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Autoplay } from 'swiper/modules'
import { getCarouselApi } from '../../../apis/carousel'
import { onMounted, ref } from 'vue'

const modules = [Pagination, Autoplay]

const carouselList = ref([])

const getCarousel = async () => {
  try {
    const res = await getCarouselApi()
    if (res.success) {
      carouselList.value = res.data
    }
  } catch (err) {
    console.error('獲取輪播圖資料失敗', err)
  }
}

onMounted(() => {
  getCarousel()
})
</script>

<template>
  <section id="content" class="w-full pt-40">
    <swiper
      :pagination="true"
      :autoplay="{ delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: true }"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="item in carouselList" :key="item.caro_id">
        <a href="#">
          <img :src="`http://127.0.0.1:3000/images/${item.caro_pic}`" alt="" class="mx-auto w-[1200px] h-[800px]">
        </a>
      </swiper-slide>
    </swiper>
  </section>
</template>
