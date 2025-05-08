<script setup>
import { onMounted, ref } from 'vue';
import { getCardApi } from '../../../apis/card'

const cardList = ref([]);

// 獲取產品資料
const getCard = async () => {
    try {
        const res = await getCardApi();
        console.log(res);
        if (res.success) {
            cardList.value = res.data;
        }
    } catch (err) {
        console.error('獲取資料失敗', err);
    }
}

// 在組件加載時調用獲取產品資料
onMounted(() => {
    getCard();
});
</script>

<template>
<section id="clothes" class="w-full pt-20">
    <!-- 產品卡片列表 -->
    <div class="grid grid-cols-1 md:grid-cols-3 mt-8 px-4 md:ml-40 gap-8">
        <!-- 動態生成每個產品卡片 -->
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition duration-300 ease-in-out" v-for="item in cardList" :key="item.id">
            <a href="#">
                <!-- 動態綁定圖片 -->
                <img class="rounded-t-lg w-full h-64 object-cover" :src="`http://127.0.0.1:3000/images/${item.pImg}`" alt="product image" />
            </a>
            <div class="p-5">
                <a href="#">
                    <!-- 動態綁定標題 -->
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ item.pName }}</h5>
                </a>
                <!-- 動態綁定描述 -->
                <p class="mb-3 font-normal text-gray-700">{{ item.pIntro }}</p>

                <!-- 查看詳細資訊按鈕 -->
                <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 transition duration-300 mb-2 mr-4">
                    詳細資訊
                    <svg class="w-4 h-4 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>

                <!-- 加入購物車按鈕 -->
                <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 transition duration-300">
                    加入購物車
                    <svg class="w-4 h-4 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</section>
</template>
