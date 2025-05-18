<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'
import { ref, defineProps } from 'vue'

// 建立 swiper 的 ref（如果你之後想存取 swiper 實例）
const swiperRef = ref(null)

const modules = [Pagination, Navigation]

defineProps({
  product: {
    type: Object
  }
})

const shuffledProducts = computed(() => {
  if (!props.product?.items || props.product.items.length === 0) return []
  const copied = [...props.product.items]
  // 洗牌
  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copied[i], copied[j]] = [copied[j], copied[i]]
  }
  return copied.slice(0, 4)
})
</script>

<template>
  <p class="text-2xl md:text-4xl py-10 mx-auto">推薦商品</p>
  <section>
      <Swiper
        ref="swiperRef"
        :slides-per-view="3"
        :centered-slides="true"
        :space-between="30"
        :pagination="{ type: 'fraction' }"
        :navigation="true"
        :modules="modules"
        class="mySwiper w-full max-w-screen-lg h-[700px] my-5 mx-auto"
        v-if="product"
      >
       <SwiperSlide v-for="item in shuffledProducts" :key="item.id">
        <div class="flex flex-col items-center">
          <img :src="item.image" :alt="item.name" class="w-full h-60 object-cover" />
          <p class="mt-2 text-lg">{{ item.name }}</p>
        </div>
      </SwiperSlide>
      </Swiper>

      <p class="append-buttons"></p>
  </section>
</template>

<style>
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

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
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

.append-buttons {
  text-align: center;
  margin-top: 20px;
}

.append-buttons button {
  display: inline-block;
  cursor: pointer;
  border: 1px solid #007aff;
  color: #007aff;
  text-decoration: none;
  padding: 4px 10px;
  border-radius: 4px;
  margin: 0 10px;
  font-size: 13px;
}
</style>
