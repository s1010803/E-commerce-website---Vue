<template>
  <nav class="breadcrumb">
    <ul>
      <li class="breadcrumb-item">
        <router-link to="/all-products">所有商品</router-link>  <!-- 固定為 "所有商品" -->
      </li>
      <li class="breadcrumb-item active">
        {{ dynamicTitle }}  <!-- 顯示動態的商品名稱 -->
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProductDetail } from '../apis/productDetail'

const dynamicTitle = ref('商品詳情')  // 預設為「商品詳情」
const product = ref(null)  // 用來儲存商品資料

// 抓取商品資料並更新 dynamicTitle
onMounted(async () => {
  const id = route.params.id
  if (id) {
    try {
      const res = await getProductDetail(id)
      product.value = res.data?.[0] || null  // 儲存商品資料
      dynamicTitle.value = product.value?.pName || '商品詳情'  // 更新標題
    } catch (err) {
      console.error('無法獲取商品資料', err)
      dynamicTitle.value = '商品詳情'
    }
  }
})
</script>

<style scoped>
.breadcrumb ul {
  display: flex;
  gap: 10px;
  list-style: none;
  padding: 0;
}

.breadcrumb li {
  display: flex;
  align-items: center;
}

.breadcrumb li::after {
  content: '/';
  margin-left: 10px;
}

.breadcrumb li:last-child::after {
  content: '';
}

.breadcrumb a {
  text-decoration: none;
  color: inherit;
}

.breadcrumb li.active span {
  color: DodgerBlue;
  font-weight: bold;
}

.breadcrumb-item {
  font-size: 14px;
  color: #333;
}

.breadcrumb-item a {
  text-decoration: none;
  color: inherit;
}
</style>
