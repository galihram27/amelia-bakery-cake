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

    <!-- 🔥 HEADER (FULL WIDTH HERO STYLE) -->
    <section class="relative px-12 py-20 text-white overflow-hidden">

      <!-- background gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#3f4f1a] via-[#4b5f1f] to-[#2f3b14]"></div>

      <!-- glow effect -->
      <div class="absolute w-[500px] h-[500px] bg-[#f5f3e7]/10 blur-3xl rounded-full top-[-100px] left-[-100px]"></div>
      <div class="absolute w-[400px] h-[400px] bg-[#f5f3e7]/10 blur-3xl rounded-full bottom-[-100px] right-[-100px]"></div>

      <!-- content -->
      <div class="relative z-10 max-w-4xl">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 text-[#f5f3e7]">
          Our Menu
        </h1>

        <p class="text-[#e6e2c3] mb-8">
          Freshly baked every morning — pick your favourite
        </p>

        <!-- search + sort -->
        <div class="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search breads, cakes, pastries..."
            class="w-full md:w-1/2 px-4 py-3 rounded-xl bg-white/10 border border-white/20 
            placeholder-[#e6e2c3] text-white focus:outline-none focus:ring-2 focus:ring-[#f5f3e7]"
          />

          <select
            class="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white"
          >
            <option class="text-black">Sort: Default</option>
            <option class="text-black">Price Low to High</option>
            <option class="text-black">Price High to Low</option>
          </select>
        </div>

        <!-- category -->
        <div class="flex flex-wrap gap-3 mt-6">
          <button class="bg-[#f5f3e7] text-[#3f4f1a] px-4 py-2 rounded-full text-sm font-semibold">
            All Items (12)
          </button>
          <button class="border border-white/30 px-4 py-2 rounded-full text-sm hover:bg-white/10">
            🍞 Bread
          </button>
          <button class="border border-white/30 px-4 py-2 rounded-full text-sm hover:bg-white/10">
            🎂 Cakes
          </button>
          <button class="border border-white/30 px-4 py-2 rounded-full text-sm hover:bg-white/10">
            🥐 Pastries
          </button>
        </div>
      </div>
    </section>

    <!-- 🔥 PRODUCT SECTION (DIFFERENT BACKGROUND) -->
    <section class="px-12 py-16 bg-[#f9f6ee]">

      <p class="text-gray-600 mb-6">Showing 12 products</p>

      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">

        <!-- card -->
        <div
          v-for="item in products"
          :key="item.id"
          class="bg-white rounded-2xl shadow-md overflow-hidden 
          hover:shadow-xl hover:-translate-y-1 transition duration-300"
        >
          <div class="relative">
            <img :src="item.image" class="h-48 w-full object-cover" />

            <!-- badge -->
            <span class="absolute top-3 left-3 text-xs bg-white px-2 py-1 rounded-full shadow">
              {{ item.category }}
            </span>
          </div>

          <div class="p-4">
            <h3 class="font-bold text-[#3f4f1a]">{{ item.name }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ item.desc }}</p>

            <div class="flex items-center justify-between mt-4">
              <span class="font-bold text-[#b45309]">{{ item.price }}</span>

              <button
                class="bg-[#3f4f1a] text-white px-4 py-1 rounded-full text-sm 
                hover:bg-[#2f3b14] hover:scale-105 transition"
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
import { ref } from "vue";
import { ShoppingCart, User } from "lucide-vue-next";
import { storeToRefs } from "pinia"
import { useAuthStore } from "@/stores/auth"

const auth = useAuthStore()
const { isLoggedIn } = storeToRefs(auth)

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const products = ref([
  {
    id: 1,
    name: "Sourdough Loaf",
    desc: "Classic sourdough with crispy crust",
    price: "Rp 45.000",
    category: "Bread",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73"
  },
  {
    id: 2,
    name: "Rustic Brown Bread",
    desc: "Hearty bread with crunchy seeds",
    price: "Rp 38.000",
    category: "Bread",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff"
  },
  {
    id: 3,
    name: "Artisan Bread Basket",
    desc: "Selection of fresh artisan breads",
    price: "Rp 85.000",
    category: "Bread",
    image: "https://images.unsplash.com/photo-1514516870926-2059896f3a84"
  },
  {
    id: 4,
    name: "Whole Wheat Loaf",
    desc: "Healthy whole wheat bread",
    price: "Rp 32.000",
    category: "Bread",
    image: "https://images.unsplash.com/photo-1585478259715-1c1f93bdfd69"
  },
  {
    id: 5,
    name: "Chocolate Cake",
    desc: "Rich chocolate layered cake",
    price: "Rp 120.000",
    category: "Cake",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587"
  },
  {
    id: 6,
    name: "Strawberry Cake",
    desc: "Fresh cream with strawberries",
    price: "Rp 110.000",
    category: "Cake",
    image: "https://images.unsplash.com/photo-1559622214-f8a9850965bb"
  },
  {
    id: 7,
    name: "Cheesecake",
    desc: "Smooth creamy cheesecake",
    price: "Rp 95.000",
    category: "Cake",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187"
  },
  {
    id: 8,
    name: "Croissant",
    desc: "Flaky buttery croissant",
    price: "Rp 25.000",
    category: "Pastry",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff"
  },
  {
    id: 9,
    name: "Almond Croissant",
    desc: "Croissant with almond filling",
    price: "Rp 30.000",
    category: "Pastry",
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b"
  },
  {
    id: 10,
    name: "Pain au Chocolat",
    desc: "Chocolate filled pastry",
    price: "Rp 28.000",
    category: "Pastry",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec"
  },
  {
    id: 11,
    name: "Cinnamon Roll",
    desc: "Sweet cinnamon swirl",
    price: "Rp 27.000",
    category: "Pastry",
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3"
  },
  {
    id: 12,
    name: "Blueberry Muffin",
    desc: "Soft muffin with blueberries",
    price: "Rp 22.000",
    category: "Pastry",
    image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707"
  }
]);
</script>