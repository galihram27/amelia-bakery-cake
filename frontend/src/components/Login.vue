<template>
  <div class="min-h-screen w-full pt-24 bg-gradient-to-b from-[#F7F5EE] via-white to-[#EEF2E6]">
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
            2
          </span>
        </router-link>

        <router-link v-if="!auth.isLoggedIn" to="/login"> Sign In </router-link>

        <router-link v-else to="/profile">
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

    <!-- 🔹 background glow (soft bakery vibe) -->
    <div
      class="absolute w-[500px] h-[500px] bg-[#3F4F1A]/10 blur-3xl rounded-full top-20 right-10"
    ></div>
    <div
      class="absolute w-[400px] h-[400px] bg-[#3F4F1A]/10 blur-3xl rounded-full bottom-10 left-10"
    ></div>

    <!-- 🔹 LOGIN CARD -->
    <div class="flex items-center justify-center px-6 pt-12 pb-12">
      <div
        class="relative w-full max-w-md bg-white/70 backdrop-blur-xl border border-[#e5e7db] rounded-2xl p-8 shadow-xl"
      >
        <h1 class="text-3xl font-serif font-semibold text-[#3F4F1A] text-center mb-2">
          Welcome Back
        </h1>

        <p class="text-center text-gray-600 mb-8 text-sm">
          Sign in to continue your bakery experience
        </p>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <input
            v-model="username"
            type="text"
            placeholder="Username"
            class="w-full px-4 py-3 rounded-xl bg-white border border-[#e5e7db] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3F4F1A]"
          />

          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              class="w-full px-4 py-3 pr-10 rounded-xl bg-white border border-[#e5e7db] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3F4F1A]"
            />

            <!-- ICON TOGGLE -->
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <component :is="showPassword ? EyeOff : Eye" class="w-5 h-5" />
            </button>
          </div>

          <!-- ERROR MESSAGE -->
          <p v-if="errorMessage" class="text-red-500 text-sm mt-1 ml-4">
            {{ errorMessage }}
          </p>

          <button
            type="submit"
            class="w-full mt-4 bg-[#3F4F1A] text-white font-medium py-3 rounded-full hover:bg-[#2f3a14] hover:shadow-lg transition"
          >
            Login
          </button>

          <p class="text-center text-sm text-gray-600 mt-4">
            Don't have an account?
            <router-link to="/register" class="text-[#3F4F1A] font-semibold hover:underline">
              Create account
            </router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { Eye, EyeOff } from "lucide-vue-next"
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const showPassword = ref(false);

const router = useRouter()

const auth = useAuthStore()

watch([username, password], () => {
  errorMessage.value = ''
})

const handleLogin = async () => {
  try {
    errorMessage.value = '' // reset error

    const res = await axios.post('http://localhost:3200/api/auth/login', {
      username: username.value.trim().toLowerCase(),
      password: password.value,
    })

    auth.login(res.data.token)
    router.push('/')
  } catch (err) {
    console.log("FULL ERROR:", err);
    console.log("RESPONSE:", err.response);
    errorMessage.value = err.response?.data?.message || 'Username atau password salah'
  }
}
</script>
