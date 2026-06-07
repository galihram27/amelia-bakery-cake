import api from '@/utils/api'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),

  getters: {
    totalItems() {
      return this.items.reduce((sum, item) => sum + (item.quantity || 0), 0)
    },

    totalPrice() {
      return this.items.reduce((sum, item) => {
        // Gunakan subtotal dari response, atau hitung dari price * quantity jika tidak ada
        const subtotal = item.subtotal || (item.price * item.quantity)
        return sum + (Number(subtotal) || 0)
      }, 0)
    },
  },

  actions: {
    async fetchCart() {
      try {
        const res = await api.get('/carts')
        this.items = res.data.map((item) => ({
          id: item.cart_item_id,
          productId: item.product_id,
          name: item.name,
          price: Number(item.price) || 0,
          image: item.image,
          quantity: Number(item.quantity) || 0,
          subtotal: Number(item.subtotal) || 0,
        }))
      } catch (err) {
        console.error('Error fetching cart:', err)
      }
    },

    async addToCart(product) {
      try {
        await api.post('/carts/items', {
          product_id: product.id,
          quantity: 1,
        })

        await this.fetchCart() // sync ulang
      } catch (err) {
        console.error('Error adding to cart:', err.response?.data || err.message)
      }
    },

    async increaseQty(id) {
      try {
        await api.patch(`/carts/items/${id}/addOne`)
        await this.fetchCart()
      } catch (err) {
        console.error(err)
      }
    },

    async decreaseQty(id) {
      try {
        await api.patch(`/carts/items/${id}/subtractOne`)
        await this.fetchCart()
      } catch (err) {
        console.error(err)
      }
    },
  },
})
