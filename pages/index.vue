<template>
  <client-only>
    <div class="container py-4 flex justify-between" style="display: grid">
      <div class="col-md-12" style="margin-bottom: 20px;display: flex">
        <h2>
          Sản phẩm hiện có:
        </h2>
        <h2 style="margin-left: 20px;color: darkcyan;font-weight: 500;">
          {{products.length}} sản phẩm
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
  </client-only>
</template>

<script>
export default {
  layout: 'home',
  data() {
    return {
      products: {},
      quantity: 1
    }
  },
  head() {
    return {
      title: 'Trang chủ',
    }
  },
  created() {
    this.getProduct()
  },
  methods: {
    async getProduct() {
      await this.$axios
        .get(`user/product/get`)
        .then((res) => {
          this.products = res.data
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
      this.$router.push({ name: 'index' })
    },
  },
}
</script>
