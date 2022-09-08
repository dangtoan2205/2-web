<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class="relative shadow-md sm:rounded-lg">
    <nuxt-link :to="{ name: 'admin-category-create' }">
      <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style="float: left;margin-bottom: 10px">
        + Add
      </button>
    </nuxt-link>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="py-3 px-6">Category ID</th>
          <th scope="col" class="py-3 px-6">Category name</th>
          <th scope="col" class="py-3 px-6">Edit</th>
          <th scope="col" class="py-3 px-6">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id" class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
          <td scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ category.id }}
          </td>
          <td scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ category.name }}
          </td>
          <td class="py-4 px-6">
            <nuxt-link :to="`/admin/category/${category.id}/edit`">
              <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
              </a>
            </nuxt-link>
          </td>
          <td class="py-4 px-6">
            <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline" @click="deleteCategory(category.id)"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </a>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="mt-4">
      <nav aria-label="Page navigation example">
        <ul class="inline-flex -space-x-px">
          <li v-if="currentPage > 1">
            <a href="#" class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" @click.prevent="currentPage--">Previous</a>
          </li>
          <li v-for="page in totalPage" :key="page">
            <a :class="{ 'bg-blue-100': currentPage == page }" href="#" class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" @click.prevent="currentPage = page">{{ page }}</a>
          </li>
          <li v-if="currentPage < totalPage">
            <a href="#" class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" @click.prevent="currentPage++">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryList',
  layout: 'admin',
  data() {
    return {
      categories: [],
      totalPage: 0,
      currentPage: 1,
      modalShow: false,
    }
  },
  head() {
    return {
      title: 'Category List',
    }
  },
  watch: {
    currentPage() {
      this.getCategory()
    },
  },
  created() {
    this.getCategory()
  },
  methods: {
    async getCategory() {
      await this.$axios
        .$get(`category?page=${this.currentPage}`)
        .then((res) => {
          this.categories = res.data
          this.totalPage = res.last_page
        })
        .catch((e) => {
          this.$toast.error('Server error')
        })
    },
    async deleteCategory(id) {
      if (confirm('Are you sure to delete this category')) {
        await this.$axios.$delete(`category/${id}`).then(() => {
          this.$toast.success('Successfully delete category')
          this.getCategory()
        })
      }
    },
  },
}
</script>
