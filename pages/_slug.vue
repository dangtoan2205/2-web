<template>
  <div>
    <div class="py-4 container flex gap-3 items-center">
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
      <nuxt-link :to="{ name: 'shop' }">
          Shop
      </nuxt-link>
      <span class="text-sm text-gray-400">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
      </span>
      <p class="text-gray-600 font-medium uppercase">{{ product.name }}</p>
    </div>
    <div class="container pt-4 pb-6 grid lg:grid-cols-2 gap-6">
      <!-- product image -->
      <div class="w-96">
        <img id="main-img" :src="`${imageURL}images/${product.image_url}`" class="w-96"/>
      </div>


      <div style="margin-left: -60px">
        <h2 class="md:text-3xl text-2xl font-medium uppercase mb-2">
          {{ product.name }}
        </h2>

        <div class="space-y-2">
<!--          <p class="space-x-2">-->
<!--            <span class="text-gray-800 font-semibold">Tags: </span>-->
<!--            <label v-for="tag in tags" :key="tag.id" class="w-14 bg-primary text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">-->
<!--              {{ tag.name }}-->
<!--            </label>-->

<!--          </p>-->
<!--          <p class="space-x-2">-->
<!--            <span class="text-gray-800 font-semibold">Category: </span>-->
<!--&lt;!&ndash;            <span class="text-gray-600">{{ category.name }}</span>&ndash;&gt;-->
<!--          </p>-->
          <p class="space-x-2">
            <span class="text-gray-800 font-semibold">Mã sản phẩm: </span>
            <span class="text-gray-600">{{ product.code }}</span>
          </p>
        </div>
        <div class="mt-4 flex items-baseline gap-3">
          <span class="text-primary font-semibold text-xl">
            {{Intl.NumberFormat().format(product.price)}} đồng
          </span>
        </div>
        <p class="mt-4 text-gray-600">
          <span class="text-gray-800 font-semibold">Mô tả: </span>
          <br>
          <span class="text-gray-600">{{ product.description }}</span>
        </p>

        <div class="mt-4">
          <h3 class="text-base text-gray-800 mb-1">Màu sắc: </h3>
          <div class="flex items-center gap-2">

            <div class="color-selector">
              <input type="radio" name="color" class="hidden" checked />
              <label for="color-red" style="background-color: #fc3d57" class="text-xs border border-gray-200 rounded-sm h-5 w-5 flex items-center justify-center cursor-pointer shadow-sm">
              </label>
            </div>

            <div class="color-selector">
              <input type="radio" name="color" class="hidden" />
              <label for="color-white" style="background-color: #fff" class="text-xs border border-gray-200 rounded-sm h-5 w-5 flex items-center justify-center cursor-pointer shadow-sm"></label>
            </div>

            <div class="color-selector">
              <input type="radio" name="color" class="hidden" />
              <label for="color-black" style="background-color: #000" class="text-xs border border-gray-200 rounded-sm h-5 w-5 flex items-center justify-center cursor-pointer shadow-sm"></label>
            </div>

          </div>
        </div>

        <div class="mt-4">
          <h3 class="text-base text-gray-800 mb-1">Số lượng: </h3>
          <div class="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
            <div class="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
              <a @click="quantity--">-</a>
            </div>
            <div class="h-8 w-10 flex items-center justify-center">
              {{ quantity }}
            </div>
            <div class="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
              <a @click="quantity++">+</a>
            </div>
          </div>
        </div>

        <div class="flex gap-3 border-b border-gray-200 pb-5 mt-6">
          <a href="#" class="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase hover:bg-transparent hover:text-primary transition text-sm flex items-center" @click.prevent="addToCart">
            Thêm sản phẩm vào giỏ hàng
          </a>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  layout: 'home',
  data() {
    return {
      product: {},
      quantity: 1,
      imageURL: this.$axios.defaults.baseURL.slice(0, 40),
      tags: {},
      category: {},
    }
  },
  head() {
    return {
      title: 'Shopping now',
    }
  },
  created() {
    this.getProductDetails()
  },
  methods: {
    async getProductDetails() {
      await this.$axios
        .$get(`${this.$route.params.slug}/product/get`)
        .then((res) => {
          this.product = res
          this.tags = res.tags
          this.category = res.category

        })
        .catch(() => {
          this.$toast.error('Server ERROR!!')
        })
    },
    addToCart() {
      if (this.quantity > 0) {
        this.$store.dispatch('addToCart', {
          id: this.product.id,
          name: this.product.name,
          code: this.product.code,
          description: this.product.description,
          category_id: this.product.category_id,
          image_url: this.product.image_url,
          price: this.product.price,
          slug: this.product.slug,
          quantity: this.quantity,
        })
        this.$toast.success('Successfully add product to cart')
        this.$router.push({ name: 'cart' })
      }
      if (this.quantity <= 0) {
        this.$toast.error('Failed add to cart!!Choose product quantity again')
      }
    },
  },
}
</script>
