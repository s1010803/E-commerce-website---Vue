import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // 使用本地狀態存儲商品列表
  const items = ref([])

  // 加入商品到購物車
  function addToCart(product) {
    const existing = items.value.find(item => item.pid === product.pid)
    if (existing) {
      existing.quantity += product.quantity || 1
    } else {
      items.value.push({ ...product, quantity: product.quantity || 1 })
    }
  }

  // 移除商品
  function removeFromCart(productId) {
    items.value = items.value.filter(item => item.pid !== productId)
  }

  // 清空購物車
  function clearCart() {
    items.value = []
  }

  // 增加商品數量
  function increaseQuantity(productId) {
    const item = items.value.find(item => item.pid === productId)
    if (item) item.quantity++
  }

  // 減少商品數量
  function decreaseQuantity(productId) {
    const item = items.value.find(item => item.pid === productId)
    if (item && item.quantity > 1) {
      item.quantity--
    }
  }

  // 計算總金額
  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.pPrice * item.quantity, 0)
  )

  // 計算商品數量
  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  return {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    itemCount
  }
}, {
  persist: {
    enabled: true, // 啟用持久化功能
    strategies: [
      {
        key: 'cartItems', // 指定要儲存的 key（必須設定）
        storage: localStorage, // 儲存在 localStorage
      }
    ]
  }
})
