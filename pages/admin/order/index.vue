<template>
  <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <h2 style="float: left;margin-bottom: 10px">Order </h2>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
      <tr>
        <th scope="col" class="py-3 px-6">ID</th>
        <th scope="col" class="py-3 px-6">Customer name</th>
        <th scope="col" class="py-3 px-6">Phone number</th>
        <th scope="col" class="py-3 px-6">Date</th>
        <th scope="col" class="py-3 px-6">Address</th>
        <th scope="col" class="py-3 px-6">Total</th>
        <th scope="col" class="py-3 px-6">View details</th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="order in orders"
        :key="order.id"
        class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
      >
        <td
          scope="row"
          class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {{ order.id }}
        </td>
        <td
          scope="row"
          class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {{ order.customer_name }}
        </td>
        <td
          scope="row"
          class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {{ order.customer_phone }}
        </td>
        <td
          scope="row"
          class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {{ order.order_date }}
        </td>
        <td
          scope="row"
          class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {{ order.customer_address }}
        </td>
        <td
          scope="row"
          class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {{
            new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(order.total)
          }}
        </td>
        <td class="py-4 px-6">
          <nuxt-link :to="`/admin/order/${order.id}`">
            <a
              href="#"
              class="font-medium text-pink-700 dark:text-red-500 hover:underline"
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              ></path></svg
            ></a>
          </nuxt-link>
        </td>
      </tr>
      </tbody>
    </table>

    <div class="mt-4">
      <nav aria-label="Page navigation example">
        <ul class="inline-flex -space-x-px">
          <li v-if="currentPage > 1">
            <a
              href="#"
              class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              @click.prevent="currentPage--"
            >Previous</a
            >
          </li>
          <li v-for="page in totalPage" :key="page">
            <a
              :class="{ 'bg-blue-100': currentPage == page }"
              href="#"
              class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              @click.prevent="currentPage = page"
            >{{ page }}</a
            >
          </li>
          <li v-if="currentPage < totalPage">
            <a
              href="#"
              class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              @click.prevent="currentPage++"
            >Next</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminOrder',
  layout: 'admin',
  data() {
    return {
      user: {},
      orders: [],
      totalPage: 0,
      currentPage: 1,
    }
  },
  head() {
    return {
      title: 'Order',
    }
  },
  created() {
    this.getUser()
    this.getOrder()
  },
  methods: {
    async getUser() {
      await this.$axios
        .$get(`user`)
        .then((res) => {
          this.user = res
        })
        .catch((e) => {
          // if (e.response.status === 403) {
          //   this.$toast.error(e.response.data.msg)
          // }
          // this.$router.push({ name: 'login' })
        })
    },
    async getOrder() {
      await this.$axios
        .$get(`order?page=${this.currentPage}`)
        .then((res) => {
          this.orders = res.data
          this.totalPage = res.last_page
        })
        .catch(() => {
          this.$toast.error('Server error')
        })
    },
  },
}
</script>
