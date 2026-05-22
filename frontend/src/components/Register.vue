<template>
  <div class="min-h-screen w-full pt-24 bg-gradient-to-b from-[#F7F5EE] via-white to-[#EEF2E6] flex items-center justify-center px-6">

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

    <!-- 🔹 background glow (dibikin lebih soft) -->
    <div class="absolute w-[500px] h-[500px] bg-[#3F4F1A]/10 blur-3xl rounded-full top-10 left-10"></div>
    <div class="absolute w-[400px] h-[400px] bg-[#3F4F1A]/10 blur-3xl rounded-full bottom-10 right-10"></div>

    <!-- 🔹 register card -->
    <div
      class="relative w-full max-w-md bg-white/70 backdrop-blur-xl border border-[#e5e7db] rounded-2xl p-8 shadow-xl"
    >
      <!-- title -->
      <h1 class="text-3xl font-serif font-semibold text-[#3F4F1A] text-center mb-2">
        Create Account
      </h1>

      <p class="text-center text-gray-600 mb-8 text-sm">
        Join Amalia Bakery and enjoy fresh artisan products
      </p>

      <form class="space-y-4">

        <input
          type="text"
          placeholder="Full Name"
          class="w-full px-4 py-3 rounded-xl bg-white border border-[#e5e7db] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3F4F1A]"
        />

        <input
          type="text"
          placeholder="Username"
          class="w-full px-4 py-3 rounded-xl bg-white border border-[#e5e7db] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3F4F1A]"
        />

        <input
          type="password"
          placeholder="Password"
          class="w-full px-4 py-3 rounded-xl bg-white border border-[#e5e7db] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3F4F1A]"
        />

        <input
          type="number"
          placeholder="Phone Number"
          class="w-full px-4 py-3 rounded-xl bg-white border border-[#e5e7db] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3F4F1A]"
        />

        <div class="flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" class="accent-[#3F4F1A]" />
          <span>I agree to the terms & conditions</span>
        </div>

        <button
          type="submit"
          class="w-full bg-[#3F4F1A] text-white font-medium py-3 rounded-full hover:bg-[#2f3a14] hover:shadow-lg transition"
        >
          Create Account
        </button>

        <p class="text-center text-sm text-gray-600 mt-4">
          Already have an account?
          <router-link
            to="/login"
            class="text-[#3F4F1A] font-semibold hover:underline"
          >
            Sign in
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ShoppingCart, User } from "lucide-vue-next";
import croissantImg from "@/assets/croissant.jpg";

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>