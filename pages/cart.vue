<template>
  <div>
    <div class="py-4 container flex gap-3 items-center">
      <a href="#" class="text-primary text-base">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          ></path>
        </svg>
      </a>
      <span class="text-sm text-gray-400"
        ><svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path></svg
      ></span>
      <nuxt-link :to="{ name: 'index' }">
        <a href="#" class="text-primary text-base font-medium uppercase">
          Shop
        </a>
      </nuxt-link>
      <span class="text-sm text-gray-400">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </span>
      <p class="text-gray-600 font-medium uppercase">Giỏ hàng</p>
    </div>
    <div class="container lg:grid grid-cols-12 gap-6 items-start pb-16 pt-4">
      <!-- product cart -->
      <div class="xl:col-span-9 lg:col-span-8">
        <!-- cart title -->
        <div class="bg-gray-200 py-2 pl-12 pr-20 xl:pr-28 mb-4 hidden md:flex">
          <p class="text-gray-600 text-center">Sản phẩm</p>
          <p class="text-gray-600 text-center ml-auto mr-16 xl:mr-24">
            Số lượng
          </p>
          <p class="text-gray-600 text-center">Tổng tiền</p>
        </div>
        <Cart v-for="(item, index) in getCart" :key="item.id" :item="item" :index="index"/>
      </div>
      <!-- order summary -->
      <div
        v-show="cartQuantity > 0"
        class="xl:col-span-3 lg:col-span-4 border border-gray-200 px-4 py-4 rounded mt-6 lg:mt-0">
        <h4 class="text-gray-800 text-lg mb-4 font-medium uppercase">
          Đặt mua
        </h4>
        <div class="space-y-1 text-gray-600 pb-3 border-b border-gray-200">
          <div class="flex justify-between font-medium">
            <p>Tổng tiền</p>
            <p>
              {{
                new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(totalPrice)
              }}
            </p>
          </div>
        </div>
        <div class="flex justify-between my-3 text-gray-800 font-semibold uppercase">
          <h4>Mã giảm giá: </h4>
        </div>

        <!-- searchbar -->
        <div class="flex mb-5">
          <input type="text" class="pl-4 w-full border border-r-0 border-primary py-2 px-3 rounded-l-md focus:ring-primary focus:border-primary text-sm" placeholder="Nhập mã"/>
          <button type="submit" class="bg-primary border border-primary text-white px-5 font-medium rounded-r-md hover:bg-transparent hover:text-primary transition text-sm font-roboto" style="display: flex; justify-content: center; align-items: center;width: 35%;">
            Apply
          </button>
        </div>
        <!-- searchbar end -->

        <!-- checkout -->
        <nuxt-link :to="{ name: 'checkout' }">
          <a href="#" class="bg-primary border border-primary text-white px-4 py-3 font-medium rounded-md uppercase hover:bg-transparent hover:text-primary transition text-sm w-full block text-center">
            Mua sản phẩm
          </a>
        </nuxt-link>
        <!-- checkout end -->
      </div>
      <!-- order summary end -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Cart from '../components/User/Cart.vue'
export default {
  components: {
    Cart,
  },
  layout: 'home',
  data() {
    return {
      imageURL: this.$axios.defaults.baseURL.slice(0, 40),
    }
  },
  head() {
    return {
      title: 'Shopping Cart',
    }
  },
  computed: {
    ...mapGetters(['getCart', 'totalPrice','cartQuantity']),
  },
  watch: {},
}
</script>
