<template>
  <div>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="w-3/5 bg-white shadow-lg">
        <div class="w-full h-0.5 bg-indigo-500"></div>
        <div class="flex justify-between p-4">
          <div>
            <h6 class="font-bold">
              Order Date :
              <span class="text-sm font-medium"> {{ order.order_date }}</span>
            </h6>
            <h6 class="font-bold">
              Order Number :
              <span class="text-sm font-medium"> {{ order.order_number }}</span>
            </h6>
          </div>
          <div class="w-40">
            <address class="text-sm">
              <span class="font-bold"> Billed To : </span>
              {{ order.customer_name }} - Phone: {{ order.customer_phone }}
            </address>
          </div>
          <div class="w-40">
            <address class="text-sm">
              <span class="font-bold">Ship To :</span>
              {{ order.customer_address }}
            </address>
          </div>
          <div></div>
        </div>
        <div class="flex justify-center p-4">
          <div class="border-b border-gray-200 shadow">
            <table class="">
              <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-2 text-xs text-gray-500">#</th>
                <th class="px-4 py-2 text-xs text-gray-500">Product Name</th>
                <th class="px-4 py-2 text-xs text-gray-500">Quantity</th>
                <th class="px-4 py-2 text-xs text-gray-500">Subtotal</th>
              </tr>
              </thead>
              <tbody class="bg-white">
              <tr
                v-for="(product, index) in products"
                :key="index"
                class="border-b-2 whitespace-nowrap"
              >
                <td class="px-6 py-4 text-sm text-gray-500">
                  {{ ++index }}
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">
                    {{ product.name }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-500">
                    {{ product.quantity }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  {{
                    new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(product.price)
                  }}
                </td>
              </tr>
              <!--end tr-->
              <tr class="text-white bg-gray-800">
                <th colspan="2"></th>
                <td class="text-sm font-bold"><b>Total</b></td>
                <td class="text-sm font-bold">
                  <b>
                    {{
                      new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(order.total)
                    }}</b
                  >
                </td>
              </tr>
              <!--end tr-->
              </tbody>
            </table>
          </div>
        </div>
        <div class="flex justify-between p-4">
          <div>
            <h3 class="text-xl">Terms And Condition :</h3>
            <ul class="text-xs list-disc list-inside">
              <li>
                All accounts are to be paid within 7 days from receipt of
                invoice.
              </li>
              <li>
                To be paid by cheque or credit card or direct payment online.
              </li>
              <li>
                If account is not paid within 7 days the credits details
                supplied.
              </li>
            </ul>
          </div>
          <div class="p-4">
            <h3>Signature</h3>
            <div class="text-4xl italic text-indigo-500">AAA</div>
          </div>
        </div>
        <div class="w-full h-0.5 bg-indigo-500"></div>

        <div class="p-4">
          <div class="flex items-center justify-center">
            Thank you very much for doing business with us.
          </div>
          <div class="flex items-end justify-end space-x-3">
            <button class="px-4 py-2 text-sm text-green-600 bg-green-100">
              Print
            </button>
            <button class="px-4 py-2 text-sm text-blue-600 bg-blue-100">
              Save
            </button>
            <button class="px-4 py-2 text-sm text-red-600 bg-red-100">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      order: {},
      products: [],
    }
  },
  head() {
    return {
      title: 'Customer Invoice',
    }
  },
  created() {
    this.getOrderDetails()
  },
  methods: {
    async getOrderDetails() {
      await this.$axios
        .$get(`order/${this.$route.params.id}`)
        .then((res) => {
          this.order = res.detail
          this.products = res.products
        })

    },
  },
}
</script>
