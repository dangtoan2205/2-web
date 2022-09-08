<template>
  <form class="mr-10" @submit.prevent="updateCategory">
    <div class="mb-6">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Category name</label>
      <input v-model="category.name" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter category name"/>
      <div v-if="error.name" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span class="block sm:inline">{{ error.name[0] }}</span>
      </div>
    </div>

    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Update
    </button>
    <nuxt-link :to="{ name: 'admin-category' }">
      <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        Cancel
      </button>
    </nuxt-link>
  </form>
</template>

<script>
export default {
  name: 'CategoryEdit',
  layout: 'admin',
  data() {
    return {
      category: {
        name: '',
      },
      error: {},
    }
  },
  head() {
    return {
      title: 'Edit Category',
    }
  },
  mounted() {
    this.getEditCategory()
  },
  methods: {
    async getEditCategory() {
      await this.$axios
        .$get(`category/${this.$route.params.id}`)
        .then((res) => {
          this.category = res
        })
    },
    async updateCategory() {
      await this.$axios
        .$put(`category/${this.$route.params.id}`, this.category)
        .then(() => {
          this.$toast.success('Successfully update category')
          this.$router.push({ name: 'admin-category' })
        })
        .catch((e) => {
          this.error = e.response.data.errors
        })
    },
  },
}
</script>
