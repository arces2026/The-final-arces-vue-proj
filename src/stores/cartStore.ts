import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export interface Product {
  id: number
  nome: string
  prezzo_scontato: number
}

export interface CartItem extends Product {
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  // const items = ref<CartItem[]>([]);
  const items = ref<CartItem[]>(
    (() => {     // ← Function definition starts
      try {
        const retrieved = localStorage.getItem('cart')
        return retrieved === null ? [] : JSON.parse(retrieved)
      } catch (err) {
        console.error('Error', err)
        return []
      }
    })(), // ← Function is CALLED here
  ) // ← ref receives the RETURN VALUE
  const totalItems = computed<number>(() => {
    return items.value.reduce((acc, item) => acc + item.quantity, 0)
  })

  // watch the ref items and saves to localStorage at any change
  watch(items, (newItems) => {localStorage.setItem('cart', JSON.stringify(newItems))}, { deep: true})

  const totalPrice = computed<number>(() =>
    items.value.reduce((acc, item) => acc + item.prezzo_scontato * item.quantity, 0),
  )

  const clearCart = () => {
    // localStorage.setItem('cart', JSON.stringify([]))
    items.value = []
  }

  const addToCart = (product: Product) => {
    const existingItem = items.value.find((item) => item.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
    console.log({ items: items.value })

    // localStorage.setItem('cart', JSON.stringify(items.value))
  }

  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    clearCart,
  }
})
