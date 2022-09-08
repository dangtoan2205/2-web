<template>
  <div>
    <div class="py-4 container flex gap-3 items-center">
      <nuxt-link :to="{ name: 'index' }">
        <a href="#" class="text-primary text-base">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
        </a>
      </nuxt-link>
      <span class="text-sm text-gray-400">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </span>
      <p class="text-gray-600 font-medium uppercase">Đặt hàng</p>
    </div>
    <div class="container lg:grid grid-cols-12 gap-6 items-start pb-16 pt-4">
      <!-- checkout form -->
      <div class="lg:col-span-8 border border-gray-200 px-4 py-4 rounded">
        <form action="">
          <h3 class="text-lg font-medium capitalize mb-4">Điền thông tin đặt hàng</h3>
          <div class="space-y-4">
            <div>
              <label class="text-gray-600 mb-2 block">Họ và tên <span class="text-primary">*</span></label>
              <input v-model="customer_name" type="text" class="input-box" />
              <div v-if="errors.customer_name" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span class="block sm:inline">
                  {{errors.customer_name[0]}}
                </span>
              </div>
            </div>
            <div>
              <label class="text-gray-600 mb-2 block">Địa chỉ nhận hàng <span class="text-primary">*</span></label>
              <input v-model="customer_address" type="text" class="input-box" />
              <div v-if="errors.customer_address" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span class="block sm:inline">
                  {{errors.customer_address[0] }}
                </span>
              </div>
            </div>
            <div>
              <label class="text-gray-600 mb-2 block">
                Email thông báo <span class="text-primary">*</span>
              </label>
              <input v-model="customer_email" type="text" class="input-box" />
              <div v-if="errors.customer_email" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span class="block sm:inline">
                  {{errors.customer_email[0]}}
                </span>
              </div>
            </div>
            <div>
              <label class="text-gray-600 mb-2 block">
                Số điện thoại đặt hàng <span class="text-primary">*</span>
              </label>
              <input v-model="customer_phone" type="text" class="input-box" />
              <div v-if="errors.customer_phone" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span class="block sm:inline">
                  {{errors.customer_phone[0] }}</span>
              </div>
            </div>
          </div>
        </form>
      </div>
      <!-- checkout form end -->

      <!-- order summary -->
      <div class="lg:col-span-4 border border-gray-200 px-4 py-4 rounded mt-6 lg:mt-0">
        <h4 class="text-gray-800 text-lg mb-4 font-medium uppercase">
          Đơn hàng đã đặt
        </h4>
        <div class="space-y-2">
          <div v-for="item in getCart" :key="item.id" class="flex justify-between">
            <div>
              <h5 class="text-gray-800 font-medium">{{ item.name }}</h5>
              <p class="text-sm text-pink-600">Size: M</p>
            </div>
            <p class="text-gray-600">x{{ item.quantity }}</p>
            <p class="text-gray-800 font-medium">
              {{
                new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(item.price * item.quantity)
              }}
            </p>
          </div>
        </div>
        <div class="flex justify-between border-b border-gray-200">
          <h4 class="text-gray-800 font-medium my-3 uppercase">Vận chuyển: </h4>
          <h4 class="text-gray-800 font-medium my-3 uppercase">Miễn phí</h4>
        </div>
        <div class="flex justify-between">
          <h4 class="text-gray-800 font-semibold my-3 uppercase">Tổng tiền: </h4>
          <h4 class="text-gray-800 font-semibold my-3 uppercase">
            {{
              new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(totalPrice)
            }}
          </h4>
        </div>
        <a href="#" class="bg-primary border border-primary text-white px-4 py-3 font-medium rounded-md uppercase hover:bg-transparent hover:text-primary transition text-sm w-full block text-center" @click.prevent="checkOut">
          Đặt hàng
        </a>
        <!-- checkout end -->
      </div>
      <!-- order summary end -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Checkout',
  data() {
    return {
      customer_name: '',
      customer_phone: '',
      customer_address: '',
      customer_email: '',
      errors: {},
    }
  },
  head() {
    return {
      title: 'Checkout',
    }
  },
  computed: {
    ...mapGetters(['getCart', 'totalPrice', 'userID']),
  },
  methods: {
    async checkOut() {
      const data = {
        customer_name: this.customer_name,
        customer_phone: this.customer_phone,
        customer_address: this.customer_address,
        customer_email: this.customer_email,
        total: this.totalPrice,
        user_id: this.userID,
        cart: this.getCart,
      }
      await this.$axios
        .$post(`checkout`, data)
        .then(() => {
          this.$store.dispatch('clearCart')
          this.$toast.success('Successfully checkout!!')
          this.$router.push({ name: 'shop' })
        })
        .catch((e) => {
           this.errors = e.response.data.errors
        })
    },
  },
}
</script>
