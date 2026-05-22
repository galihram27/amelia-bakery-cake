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
          <ShoppingCart
            class="w-6 h-6 text-white hover:text-[#F5F3E7] transition"
          />

          <!-- optional badge -->
          <span
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full"
          >
            2
          </span>
        </router-link>

        <router-link
          v-if="!isLoggedIn"
          to="/login"
          class="bg-[#F5F3E7] text-[#3F4F1A] px-5 py-2 rounded-full hover:bg-[#e6e2c3] transition font-medium"
        >
          Sign In
        </router-link>

        <router-link
          v-else
          to="/profile"
          class="text-white hover:text-[#F5F3E7] transition"
        >
          <User class="w-6 h-6 cursor-pointer" />
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

    <!-- HERO -->
    <section
      class="flex flex-col md:flex-row items-center justify-between px-8 md:px-12 py-16"
    >
      <div class="max-w-xl">
        <h1
          class="font-serif text-5xl md:text-7xl font-semibold text-[#3F4F1A] mb-6 leading-tight"
        >
          Handmade Bakery<br />with Love
        </h1>

        <p class="text-lg text-gray-700 mb-6 leading-relaxed">
          Discover fresh bread, premium cakes, and artisan pastries crafted
          daily with natural ingredients.
        </p>

        <div class="flex gap-4">
          <router-link to="/menu">
          <button
            class="bg-[#3F4F1A] text-white px-6 py-3 rounded-full hover:bg-[#2f3a14] transition shadow font-medium"
          >
            Shop Now
          </button>
        </router-link>
        </div>
      </div>

      <div class="hidden md:block mt-10 md:mt-0">
        <div
          class="w-[400px] h-[400px] rounded-full bg-white/70 backdrop-blur border-4 border-[#3F4F1A] flex items-center justify-center shadow-lg"
        >
          <img
            :src="croissantImg"
            alt="Croissant"
            class="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
    </section>

    <!-- PRODUCTS -->
    <section class="px-8 md:px-12 pb-20">
      <h2 class="font-serif text-4xl font-semibold text-[#3F4F1A] mb-8">
        Featured Products
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          class="bg-white/80 backdrop-blur border border-[#e5e7db] rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition"
        >
          <div class="text-5xl mb-4">🍞</div>
          <h3 class="text-xl font-semibold text-[#3F4F1A] mb-2 font-serif">
            Classic Bread
          </h3>
          <p class="text-gray-600 mb-4">
            Soft, fresh, and baked daily with premium wheat flour.
          </p>
          <span class="font-semibold text-[#2E2E2E]">$3.50</span>
        </div>

        <div
          class="bg-white/80 backdrop-blur border border-[#e5e7db] rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition"
        >
          <div class="text-5xl mb-4">🎂</div>
          <h3 class="text-xl font-semibold text-[#3F4F1A] mb-2 font-serif">
            Chocolate Cake
          </h3>
          <p class="text-gray-600 mb-4">
            Rich chocolate layers with smooth creamy frosting.
          </p>
          <span class="font-semibold text-[#2E2E2E]">$12.00</span>
        </div>

        <div
          class="bg-white/80 backdrop-blur border border-[#e5e7db] rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition"
        >
          <div class="text-5xl mb-4">🥐</div>
          <h3 class="text-xl font-semibold text-[#3F4F1A] mb-2 font-serif">
            Butter Croissant
          </h3>
          <p class="text-gray-600 mb-4">
            Flaky, buttery layers baked to golden perfection.
          </p>
          <span class="font-semibold text-[#2E2E2E]">$4.20</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { storeToRefs } from "pinia"
import { useAuthStore } from "@/stores/auth"
import { ShoppingCart, User } from "lucide-vue-next"

const auth = useAuthStore()
const { isLoggedIn } = storeToRefs(auth)

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>
