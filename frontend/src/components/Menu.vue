<template>
  <div class="min-h-screen w-full pt-24 bg-[#f5f3e7]">
    <!-- NAVBAR -->
    <nav
      class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#3F4F1A] text-white shadow-md"
    >
      <router-link
        to="/"
        class="text-2xl font-serif font-bold flex items-center gap-2 hover:opacity-80 tracking-wide"
      >
        🌿 AMALIA BAKERY
      </router-link>

      <div class="hidden md:flex gap-10 font-medium -ml-30">
        <router-link
          to="/"
          class="relative text-white/90 hover:text-[#F5F3E7] transition-colors duration-300 group"
        >
          Home
          <span
            class="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#F5F3E7] transition-all duration-300 group-hover:w-full"
          ></span>
        </router-link>

        <router-link
          to="/menu"
          class="relative text-white/90 hover:text-[#F5F3E7] transition-colors duration-300 group"
        >
          Menu
          <span
            class="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#F5F3E7] transition-all duration-300 group-hover:w-full"
          ></span>
        </router-link>

        <router-link
          to="/about"
          class="relative text-white/90 hover:text-[#F5F3E7] transition-colors duration-300 group"
        >
          About
          <span
            class="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#F5F3E7] transition-all duration-300 group-hover:w-full"
          ></span>
        </router-link>
      </div>

      <div class="hidden md:flex items-center gap-4">
        <!-- Cart Icon -->
        <div class="relative cursor-pointer cart-button" @click.stop="toggleCart">
          <ShoppingCart class="w-6 h-6 text-white hover:text-[#F5F3E7] transition" />

          <!-- jumlah item -->
          <span
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full"
          >
            {{ cart.totalItems }}
          </span>
        </div>

        <router-link
          v-if="!isLoggedIn"
          to="/login"
          class="bg-[#F5F3E7] text-[#3F4F1A] px-5 py-2 rounded-full hover:bg-[#e6e2c3] transition font-medium"
        >
          Sign In
        </router-link>

        <router-link v-else to="/profile" class="text-white hover:text-[#F5F3E7] transition">
          <User class="w-6 h-6" />
        </router-link>
      </div>

      <button class="md:hidden flex flex-col gap-1" @click="toggleMenu">
        <span class="w-6 h-[2px] bg-white"></span>
        <span class="w-6 h-[2px] bg-white"></span>
        <span class="w-6 h-[2px] bg-white"></span>
      </button>

      <div
        v-if="isMenuOpen"
        class="absolute top-full left-0 w-full bg-[#3F4F1A] flex flex-col items-center gap-6 py-6 md:hidden"
      >
        <router-link @click="toggleMenu" to="/">Home</router-link>
        <router-link @click="toggleMenu" to="/menu">Menu</router-link>
        <router-link @click="toggleMenu" to="/about">About</router-link>
      </div>
    </nav>

    <!-- MINI CART-->
    <div
      v-if="showCart"
      @click.stop
      class="cart-popup fixed right-6 top-20 w-96 bg-white text-black rounded-2xl shadow-xl p-4 z-50"
    >
      <h3 class="font-bold text-lg mb-3">Your Cart</h3>

      <!-- Jika kosong -->
      <p v-if="cart.items.length === 0" class="text-gray-500 text-sm">Cart is empty</p>

      <!-- Jika item lebih dari 0 -->
      <div v-else :class="['space-y-4', cart.items.length > 5 ? 'max-h-60 overflow-y-auto' : '']">
        <div
          v-for="item in cart.items"
          :key="item.id"
          class="flex justify-between items-center gap-3 py-1 last:border-none"
        >
          <!-- IMAGE -->
          <div class="flex items-center gap-3">
            <!-- gambar -->
            <img
              :src="`http://localhost:3200/uploads/${item.image}`"
              class="w-12 h-12 object-cover rounded-lg"
            />

            <!-- INFO -->
            <div>
              <p class="font-semibold text-sm">{{ item.name }}</p>
              <p class="text-xs text-gray-500">
                {{ formatRupiah(item.price) }}
              </p>
            </div>
          </div>

          <!-- QTY BUTTON -->
          <div class="flex items-center gap-2">
            <button @click.stop="cart.decreaseQty(item.id)" class="cursor-pointer px-2 bg-gray-200 rounded">
              -
            </button>

            <span>{{ item.qty }}</span>

            <button @click.stop="cart.increaseQty(item.id)" class="cursor-pointer px-2 bg-gray-200 rounded">
              +
            </button>
          </div>
        </div>

        <!-- total -->
        <div v-if="cart.items.length > 0" class="mt-4 border-t pt-3">
          <p class="text-sm">
            Total Items: <b>{{ cart.totalItems }}</b>
          </p>
          <p class="text-sm">
            Total Price: <b>{{ formatRupiah(cart.totalPrice) }}</b>
          </p>

          <router-link
            to="/cart"
            class="block mt-3 text-center bg-[#3f4f1a] text-white py-2 rounded-xl"
          >
            Go to Cart
          </router-link>
        </div>
      </div>
    </div>

    <!-- HEADER (FULL WIDTH HERO STYLE) -->
    <section class="relative px-12 py-20 text-white overflow-hidden">
      <!-- background gradient -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-[#3f4f1a] via-[#4b5f1f] to-[#2f3b14]"
      ></div>

      <!-- glow effect -->
      <div
        class="absolute w-[500px] h-[500px] bg-[#f5f3e7]/10 blur-3xl rounded-full top-[-100px] left-[-100px]"
      ></div>
      <div
        class="absolute w-[400px] h-[400px] bg-[#f5f3e7]/10 blur-3xl rounded-full bottom-[-100px] right-[-100px]"
      ></div>

      <!-- content -->
      <div class="relative z-10 max-w-4xl">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 text-[#f5f3e7]">Our Menu</h1>

        <p class="text-[#e6e2c3] mb-8">Freshly baked every morning — pick your favourite</p>

        <!-- Search -->
        <div class="flex flex-col md:flex-row gap-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search breads, cakes, pastries..."
            class="w-full md:w-1/2 px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-[#e6e2c3] text-white focus:outline-none focus:ring-2 focus:ring-[#f5f3e7]"
          />

          <!-- Sort -->
          <select
            v-model="sortOption"
            class="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white"
          >
            <option value="default" class="text-black">Sort: Default</option>
            <option value="low" class="text-black">Price Low to High</option>
            <option value="high" class="text-black">Price High to Low</option>
          </select>
        </div>

        <!-- category -->
        <div class="flex flex-wrap gap-3 mt-6">
          <button class="bg-[#f5f3e7] text-[#3f4f1a] px-4 py-2 rounded-full text-sm font-semibold">
            All Items ({{ sortedProducts.length }})
          </button>
          <button class="border border-white/30 px-4 py-2 rounded-full text-sm hover:bg-white/10">
            Bread
          </button>
          <button class="border border-white/30 px-4 py-2 rounded-full text-sm hover:bg-white/10">
            Cakes
          </button>
          <button class="border border-white/30 px-4 py-2 rounded-full text-sm hover:bg-white/10">
            Pastries
          </button>
        </div>
      </div>
    </section>

    <!-- PRODUCT SECTION (DIFFERENT BACKGROUND) -->
    <section class="px-12 py-16 bg-[#f9f6ee]">
      <p class="text-gray-600 mb-6">Showing ({{ sortedProducts.length }}) products</p>

      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <!-- card -->
        <div
          v-for="item in sortedProducts"
          :key="item.id"
          class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300"
        >
          <div class="relative">
            <img
              :src="`http://localhost:3200/uploads/${item.image}`"
              class="h-48 w-full object-cover"
            />

            <!-- badge -->
            <span class="absolute top-3 left-3 text-xs bg-white px-2 py-1 rounded-full shadow">
              {{ item.category }}
            </span>
          </div>

          <div class="p-4">
            <h3 class="font-bold text-[#3f4f1a]">{{ item.name }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ item.desc }}</p>

            <div class="flex items-center justify-between mt-4">
              <span class="font-bold text-[#b45309]">{{ formatRupiah(item.price) }}</span>

              <button
                @click="cart.addToCart(item)"
                class="cursor-pointer bg-[#3f4f1a] text-white px-4 py-1 rounded-full text-sm hover:bg-[#2f3b14] hover:scale-105 transition"
              >
                + Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import { ShoppingCart, User } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import api from '@/utils/api'

const auth = useAuthStore()
const { isLoggedIn } = storeToRefs(auth)

const cart = useCartStore()

const isMenuOpen = ref(false)
const searchQuery = ref('')
const sortOption = ref('default')

const showCart = ref(false)

const toggleCart = () => {
  showCart.value = !showCart.value
}

const handleClickOutside = (e) => {
  const isCartButton = e.target.closest('.cart-button')
  const isCartPopup = e.target.closest('.cart-popup')

  if (!isCartButton && !isCartPopup) {
    showCart.value = false
  }
}

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})

const products = ref([])

const filteredProducts = computed(() => {
  return products.value.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const sortedProducts = computed(() => {
  const data = [...filteredProducts.value]

  if (sortOption.value === 'default') {
    return data.sort((a, b) => a.name.localeCompare(b.name))
  }

  if (sortOption.value === 'low') {
    return data.sort((a, b) => a.price - b.price)
  }

  if (sortOption.value === 'high') {
    return data.sort((a, b) => b.price - a.price)
  }

  return data
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

onMounted(async () => {
  window.addEventListener('click', handleClickOutside)

  try {
    const res = await api.get('/products')

    console.log('API RESPONSE:', res.data)

    products.value = res.data
  } catch (err) {
    console.error('ERROR:', err.response || err)
  }
})

const formatRupiah = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}
</script>
