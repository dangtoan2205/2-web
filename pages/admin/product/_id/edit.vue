<template>
  <form class="mr-10" enctype="multipart/form-data" @submit.prevent="updateProduct">
    <div class="mb-6">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Product name</label>
      <input v-model="product.name" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter product name"/>
      <div v-if="error.name" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span class="block sm:inline">{{ error.name[0] }}</span>
      </div>
    </div>
    <div class="mb-6">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Code</label>
      <input v-model="product.code" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter product code"/>
      <div v-if="error.code" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span class="block sm:inline">{{ error.code[0] }}</span>
      </div>
    </div>
    <div class="mb-6">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Price</label>
      <input v-model="product.price" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter product price"/>
      <div v-if="error.price" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span class="block sm:inline">{{ error.price[0] }}</span>
      </div>
    </div>
    <div class="mb-6">
      <label for="categories" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
        Product category
      </label>
      <select id="categories" v-model="product.category_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option selected="">Choose category</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>

    <div class="mb-6">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Tag</label>
      <multiselect v-model="productTag" :options="tags" :close-on-select="false" label="name" :multiple="true" :clear-on-select="false" track-by="id">
      </multiselect>
    </div>

    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700"> Photo </label>
      <div class="mt-1 flex items-center">
        <img v-if="product.image_url" :src="product.image_url" class="w-64 h-48 object-cover"/>
        <span v-if="!product.image_url" class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
          <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
        </span>
        <input id="image" ref="create-product-input-image" type="file" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @change="onImage"/>
      </div>
    </div>
    <div class="mb-6">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
      <textarea v-model="product.description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter product description"></textarea>

      <div v-if="error.description" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span class="block sm:inline">{{ error.description[0] }}</span>
      </div>
    </div>

    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Update
    </button>
    <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
      Cancel
    </button>
  </form>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  name: 'ProductEdit',
  layout: 'admin',
  components: {
    Multiselect,
  },
  data() {
    return {
      product: {
        name: '',
        code: '',
        description: '',
        price: '',
        slug: '',
        image_url: '',
        category_id: '',
      },
      error: {},
      categories: [],
      tags: [],
      productTag: [],
      changeImage: false,
      oldImage: '',
    }
  },
  head() {
    return {
      title: 'Edit Product',
    }
  },
  mounted() {
    this.getEditProduct()
    this.getCategory()
    this.getTag()
  },
  methods: {
    async getCategory() {
      await this.$axios
        .$get(`category/get`)
        .then((res) => {
          this.categories = res
        })
        .catch(() => {
          this.$toast.error('Server error')
        })
    },
    async getTag() {
      await this.$axios
        .$get(`tag/get`)
        .then((res) => {
          this.tags = res
        })
        .catch(() => {
          this.$toast.error('Server error')
        })
    },
    onImage(e) {
      this.changeImage = true
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        this.product.image_url = reader.result
      }
      reader.readAsDataURL(file)
    },
    async getEditProduct() {
      await this.$axios.$get(`product/${this.$route.params.id}`).then((res) => {
        this.product = res.product
        this.productTag = res.product.tags
      })
    },
    async updateProduct() {
      const form = new FormData()
      form.append('name', this.product.name)
      form.append('price', this.product.price)
      form.append('description', this.product.description)
      form.append('code', this.product.code)
      form.append('category_id', this.product.category_id)
      if (this.changeImage) {
        form.append('image_url', this.product.image_url)
      }
      for (let i = 0; i < this.productTag.length; i++) {
        const tags = this.productTag.map((tag) => tag.id)
        form.append('tags[]', tags[i])
      }
      form.append('_method', 'PUT')
      await this.$axios
        .$post(`product/${this.$route.params.id}`, form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          this.$toast.success('Successfully update product')
          this.$router.push({ name: 'admin-product' })
        })
        .catch((e) => {
          this.error = e.response.data.errors
          console.log(e.response)
        })
    },
  },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
