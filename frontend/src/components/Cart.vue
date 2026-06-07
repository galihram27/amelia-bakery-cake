<template>
  <div
    class="min-h-screen w-full pt-24 font-sans bg-gradient-to-b from-[#F7F5EE] via-white to-[#EEF2E6]"
  >
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
        <router-link to="/cart" class="relative">
          <ShoppingCart class="w-6 h-6 text-white hover:text-[#F5F3E7] transition" />

          <!-- optional badge -->
          <span
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full"
          >
            <span>{{ cart.totalItems }}</span>
          </span>
        </router-link>

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

    <!-- CONTENT -->
    <div class="px-6 md:px-12 py-10">
      <h1 class="text-3xl font-serif text-[#3F4F1A] mb-2">Shopping Cart</h1>
      <p class="text-gray-500 mb-8">{{ cart.totalItems }} items in your cart</p>

      <div class="grid md:grid-cols-3 gap-8">
        <!-- LEFT -->
        <div class="md:col-span-2 space-y-6">
          <!-- CART ITEMS -->
          <div
            v-for="item in cart.items"
            :key="item.id"
            class="flex items-center gap-4 bg-white/80 backdrop-blur border border-[#e5e7db] p-4 rounded-2xl shadow"
          >
            <img
              :src="`http://localhost:3200/uploads/${item.image}`"
              class="w-20 h-20 object-cover rounded-xl"
            />

            <div class="flex-1">
              <span class="text-xs bg-[#EEF2E6] text-[#3F4F1A] px-2 py-1 rounded-full">
                Bread
              </span>
              <h2 class="font-semibold text-[#3F4F1A]">{{ item.name }}</h2>
              <p class="text-x4 text-gray-500">
                {{ formatRupiah(item.price) }}
              </p>
            </div>

            <!-- QUANTITY -->
            <div class="flex items-center gap-3 mt-2 bg-[#F5F3E7] w-fit px-3 py-1 rounded-full">
              <button @click.stop="cart.decreaseQty(item.id)" class="cursor-pointer">-</button>
              <span>{{ item.quantity }}</span>
              <button @click.stop="cart.increaseQty(item.id)" class="cursor-pointer">+</button>
            </div>

            <div class="text-right">
              <p class="text-sm text-gray-400">Subtotal</p>
              <p class="font-semibold text-[#3F4F1A]">
                {{ formatRupiah(Subtotal(item)) }}
              </p>
            </div>
          </div>
        </div>

        <!-- RIGHT: SUMMARY -->
        <div class="bg-white/90 border border-[#e5e7db] rounded-2xl p-6 shadow-md h-fit">
          <h2 class="text-xl font-semibold text-[#3F4F1A] mb-4">Order Summary</h2>

          <!-- LIST ITEM -->
          <div class="space-y-2 text-sm">
            <div v-for="item in cart.items" :key="item.id" class="flex justify-between">
              <span>{{ item.name }}</span>
              <span>{{ formatRupiah(Subtotal(item)) }}</span>
            </div>

            <hr class="my-4" />

            <!-- SUBTOTAL -->
            <div class="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{{ formatRupiah(subtotal) }}</span>
            </div>

            <hr class="my-4" />

            <!-- TOTAL -->
            <div class="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span class="text-[#3F4F1A]">{{ formatRupiah(cart.totalPrice) }}</span>
            </div>

            <!-- CHECKOUT -->
            <router-link to="/checkout">
              <button
                class="cursor-pointer w-full mt-6 bg-[#3F4F1A] text-white py-3 rounded-full hover:bg-[#2f3a14] transition"
              >
                Checkout
              </button>
            </router-link>

            <router-link to="/menu">
              <p class="text-center text-sm text-gray-400 mt-3 pt-2">< Continue Shopping</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ShoppingCart, User } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

const auth = useAuthStore()
const { isLoggedIn } = storeToRefs(auth)
const cart = useCartStore()

onMounted(() => {
  if (isLoggedIn.value) {
    cart.fetchCart()
  }
})

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const subtotal = computed(() =>
  cart.items.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0),
)

const delivery = 15000

const Subtotal = (item) => {
  return Number(item.price) * item.quantity
}

const formatRupiah = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}
</script>
