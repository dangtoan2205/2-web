<template>
  <div>
    <!-- breadcum -->
    <div class="container py-4 flex justify-between">
      <div class="flex gap-3 items-center">
        <a href="#" class="text-primary text-base">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
        </a>
        <span class="text-sm text-gray-400">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </span>
        <p class="text-gray-600 font-medium">
          Shop
        </p>
      </div>
    </div>
    <div class="container py-4 flex justify-between" style="display: grid">
      <div class="col-md-12" style="margin-bottom: 20px;display: flex">
        <h2>
          Danh mục:
        </h2>
        <h2 style="margin-left: 20px;color: darkcyan;font-weight: 500;">
          Iphone
        </h2>
      </div>
      <div class="grid lg:grid-cols-6 sm:grid-cols-2 gap-12">
        <div v-for="product in products" :key="product.id" class="group rounded bg-white shadow overflow-hidden">

          <div class="relative">
            <nuxt-link :to="`${product.slug}`">
              <img :src="`https://api-shopping-demo.herokuapp.com/images/${product.image_url}`" class="w-full" style="height: 163px;"/>
            </nuxt-link>
          </div>

          <div class="p-3" style="height: 110px;">
            <nuxt-link :to="`${product.slug}`" style="display: block;height: 50px;">
              {{ product.name }}
            </nuxt-link>
            <div class="flex items-baseline mb-1 space-x-2">
              <p class="text-xl text-primary font-roboto font-semibold">
                {{Intl.NumberFormat().format(product.price)}} đ
              </p>
            </div>
          </div>

          <a href="" @click.prevent="addToCart(product)" class="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition" style="display: block">
            Đặt hàng
          </a>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserShop',
  layout: 'home',
  data() {
    return {
      products: {},
      quantity: 1
    }
  },
  head() {
    return {
      title: 'Shop',
    }
  },
  created() {
    this.getProduct()
  },
  methods: {
    async getProduct() {
      await this.$axios
        .$get(`/user/product/get`)
        .then((res) => {
          this.products = res
        })
        .catch((e) => {
          console.log(e.response)
        })
    },
    addToCart(product) {
      this.$store.dispatch('addToCart', {
        id: product.id,
        name: product.name,
        image_url: product.image_url,
        price: product.price,
        quantity: this.quantity,
      })
      this.$toast.success('Successfully add product to cart')
      this.$router.push({ name: 'shop' })
    },
  },
}
</script>
