import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),

  getters: {
    totalItems: (state) => state.items.reduce((total, item) => total + item.qty, 0),

    totalPrice: (state) =>
      state.items.reduce((total, item) => {
        return total + Number(item.price) * item.qty
      }, 0),
  },

  actions: {
    addToCart(product) {
      const existing = this.items.find((item) => item.id === product.id)

      if (existing) {
        existing.qty++
      } else {
        this.items.push({
          ...product,
          qty: 1,
        })
      }
    },

    increaseQty(id) {
      const item = this.items.find((i) => i.id === id)
      if (item) item.qty++
    },

    decreaseQty(id) {
      const item = this.items.find((i) => i.id === id)
      if (item) {
        item.qty--
        if (item.qty <= 0) {
          this.items = this.items.filter((i) => i.id !== id)
        }
      }
    },
  },

  persist: true,
})
