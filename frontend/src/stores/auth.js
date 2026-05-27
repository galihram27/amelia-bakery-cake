// stores/auth.js
import { defineStore } from 'pinia'
import api from '@/utils/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    async login(token) {
      this.token = token
      localStorage.setItem('token', token)

      // langsung ambil data user setelah login
      await this.fetchUser()
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    },

    // ambil data user dari backend
    async fetchUser() {
      try {
        const res = await api.get('/auth/me')

        this.user = res.data.data

        console.log(res.data)

        console.log("USER:", this.user)
      } catch (err) {
        console.error(err)
        this.logout()
      }
    },
  },
})
