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
        class="text-2xl font-serif font-bold flex items-center gap-2 tracking-wide"
      >
        🌿 AMALIA BAKERY
      </router-link>

      <div class="hidden md:flex gap-10 font-medium -ml-30">
        <router-link to="/">Home</router-link>
        <router-link to="/menu">Menu</router-link>
        <router-link to="/about">About</router-link>
      </div>

      <div class="flex items-center gap-4">
        <router-link to="/cart" class="relative">
          <ShoppingCart class="w-6 h-6" />
        </router-link>

        <router-link to="/profile">
          <User class="w-6 h-6" />
        </router-link>
      </div>
    </nav>

    <!-- PROFILE SECTION -->
    <section class="px-6 md:px-12 py-12">
      <div
        class="max-w-4xl mx-auto bg-white/80 backdrop-blur border border-[#e5e7db] rounded-3xl shadow-lg p-8"
      >
        <!-- HEADER -->
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div
            class="w-32 h-32 rounded-full bg-[#EEF2E6] border-4 border-[#3F4F1A] flex items-center justify-center overflow-hidden"
          >
            <img
              src="https://i.pravatar.cc/150"
              alt="Profile"
              class="w-full h-full object-cover"
            />
          </div>

          <div class="text-center md:text-left">
            <h2 class="text-3xl font-serif text-[#3F4F1A] font-semibold">
              {{ user?.name }}
            </h2>
            <p class="text-gray-600">{{ user?.email }}</p>

            <button
              class="mt-4 bg-[#3F4F1A] text-white px-5 py-2 rounded-full hover:bg-[#2f3a14] transition"
            >
              Edit Profile
            </button>
          </div>
        </div>

        <!-- INFO -->
        <div class="mt-10 grid md:grid-cols-2 gap-6">
          <div
            class="bg-[#F7F5EE] p-6 rounded-2xl border border-[#e5e7db]"
          >
            <h3 class="font-serif text-xl text-[#3F4F1A] mb-3">
              Personal Info
            </h3>
            <p><strong>Name:</strong> {{ user?.name }}</p>
            <p><strong>Email:</strong> {{ user?.email }}</p>
            <p><strong>Phone:</strong> {{ user?.phone }}</p>
          </div>

          <div
            class="bg-[#F7F5EE] p-6 rounded-2xl border border-[#e5e7db]"
          >
            <h3 class="font-serif text-xl text-[#3F4F1A] mb-3">
              Address
            </h3>
            <p>{{ user?.address }}</p>
          </div>
        </div>

        <!-- ORDER HISTORY -->
        <div class="mt-10">
          <h3 class="font-serif text-2xl text-[#3F4F1A] mb-6">
            Order History
          </h3>

          <div class="space-y-4">
            <div
              v-for="order in orders"
              :key="order.id"
              class="bg-white border border-[#e5e7db] rounded-xl p-4 shadow-sm flex justify-between items-center hover:shadow-md transition"
            >
              <div>
                <p class="font-semibold text-[#3F4F1A]">
                  Order #{{ order.id }}
                </p>
                <p class="text-sm text-gray-600">
                  {{ order.date }}
                </p>
              </div>

              <div class="text-right">
                <p class="font-semibold">${{ order.total }}</p>
                <span
                  class="text-xs px-3 py-1 rounded-full"
                  :class="{
                    'bg-green-100 text-green-700': order.status === 'Completed',
                    'bg-yellow-100 text-yellow-700': order.status === 'Pending'
                  }"
                >
                  {{ order.status }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- LOGOUT -->
        <div class="mt-10 text-center">
          <router-link to="/">
            <button
              @click="logout"
              class="cursor-pointer bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
            >
              Logout
            </button>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import { storeToRefs } from "pinia"
import { useAuthStore } from "@/stores/auth"

const auth = useAuthStore()
const { user } = storeToRefs(auth)

onMounted(() => {
  auth.fetchUser()
})

const logout = () => {
  auth.logout()
}
</script>