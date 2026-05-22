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

      <router-link to="/cart" class="relative">
        <ShoppingCart class="w-6 h-6 text-white" />
      </router-link>
    </nav>

    <!-- CONTENT -->
    <div class="px-6 md:px-12 py-10">
      <!-- Breadcrumb -->
      <p class="text-sm text-gray-500 mb-4">
        Cart › <span class="text-[#3F4F1A]">Checkout</span> › Payment
      </p>

      <h1 class="text-3xl font-serif text-[#3F4F1A] mb-8">
        Checkout
      </h1>

      <div class="grid md:grid-cols-3 gap-8">
        <!-- LEFT -->
        <div class="md:col-span-2 space-y-6">
          <!-- DELIVERY METHOD -->
          <div
            class="bg-white/80 border border-[#e5e7db] rounded-2xl p-6 shadow"
          >
            <h2 class="font-semibold text-[#3F4F1A] mb-4">
              Delivery Method
            </h2>

            <div class="grid md:grid-cols-2 gap-4">
              <!-- PICKUP -->
              <div
                @click="deliveryType = 'pickup'"
                :class="[
                  'p-4 rounded-xl border cursor-pointer transition',
                  deliveryType === 'pickup'
                    ? 'border-[#3F4F1A] bg-[#EEF2E6]'
                    : 'border-gray-200'
                ]"
              >
                <p class="font-medium text-[#3F4F1A]">Store Pickup</p>
                <p class="text-sm text-gray-500">
                  Collected at Amalia Bakery Jakarta Selatan
                </p>
                <span class="text-xs text-green-600">Free</span>
              </div>

              <!-- DELIVERY -->
              <div
                @click="deliveryType = 'delivery'"
                :class="[
                  'p-4 rounded-xl border cursor-pointer transition',
                  deliveryType === 'delivery'
                    ? 'border-[#3F4F1A] bg-[#EEF2E6]'
                    : 'border-gray-200'
                ]"
              >
                <p class="font-medium text-[#3F4F1A]">
                  Home Delivery
                </p>
                <p class="text-sm text-gray-500">
                  Rp 15.000 delivery fee
                </p>
                <span class="text-xs text-[#3F4F1A] font-semibold">
                  Rp 15.000
                </span>
              </div>
            </div>
          </div>

          <!-- ADDRESS -->
          <div
            class="bg-white/80 border border-[#e5e7db] rounded-2xl p-6 shadow"
          >
            <h2 class="font-semibold text-[#3F4F1A] mb-4">
              Delivery Address
            </h2>

            <div class="space-y-4">
              <input
                type="text"
                placeholder="Street Address"
                class="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3F4F1A]"
              />

              <div class="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  class="p-3 rounded-xl border border-gray-200"
                />
                <input
                  type="text"
                  placeholder="Province"
                  class="p-3 rounded-xl border border-gray-200"
                />
              </div>

              <input
                type="text"
                placeholder="ZIP Code"
                class="p-3 rounded-xl border border-gray-200"
              />

              <textarea
                placeholder="Delivery Notes"
                class="w-full p-3 rounded-xl border border-gray-200"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- RIGHT SUMMARY -->
        <div
          class="bg-white/90 border border-[#e5e7db] rounded-2xl p-6 shadow h-fit"
        >
          <h2 class="text-xl font-semibold text-[#3F4F1A] mb-4">
            Order Summary
          </h2>

          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span>Sourdough Loaf</span>
              <span>Rp 45.000</span>
            </div>

            <div class="flex justify-between">
              <span>Rustic Brown Bread</span>
              <span>Rp 38.000</span>
            </div>
          </div>

          <hr class="my-4" />

          <div class="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>Rp {{ format(subtotal) }}</span>
          </div>

          <div class="flex justify-between text-sm">
            <span>Delivery</span>
            <span>Rp {{ format(deliveryCost) }}</span>
          </div>

          <hr class="my-4" />

          <div class="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span class="text-[#3F4F1A]">
              Rp {{ format(total) }}
            </span>
          </div>

          <button
            class="w-full mt-6 bg-[#3F4F1A] text-white py-3 rounded-full hover:bg-[#2f3a14] transition"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { ShoppingCart } from "lucide-vue-next";

const deliveryType = ref("delivery");

const subtotal = 83000;

const deliveryCost = computed(() =>
  deliveryType.value === "delivery" ? 15000 : 0
);

const total = computed(() => subtotal + deliveryCost.value);

const format = (num) => num.toLocaleString("id-ID");
</script>