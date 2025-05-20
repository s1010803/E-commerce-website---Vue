import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export const useCartStore = defineStore('cart', () => {
  // 將 items 與 localStorage 綁定（key: 'cartItems'）
  const items = useLocalStorage('cartItems', [])

  function addToCart(product) {
    const existing = items.value.find(item => item.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
  }

  function removeFromCart(productId) {
    items.value = items.value.filter(item => item.id !== productId)
  }

  function clearCart() {
    items.value = []
  }

  function increaseQuantity(productId) {
    const item = items.value.find(item => item.id === productId)
    if (item) item.quantity++
  }

  function decreaseQuantity(productId) {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      if (item.quantity > 1) {
        item.quantity--
      }
    }
  }

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.pPrice * item.quantity, 0)
  )

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
})
