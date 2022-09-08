<template>
  <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <h2>{{ user.name }} đã đăng nhập</h2>
  </div>
</template>

<script>
export default {
  name: 'AdminHome',
  layout: 'admin',
  data() {
    return {
      user: {},
    }
  },
  head() {
    return {
      title: 'Admin Home',
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    async getUser() {
      await this.$axios
        .$get(`user`)
        .then((res) => {
          this.user = res
        })
        .catch((e) => {
          if (e.response.status === 403) {
            this.$toast.error(e.response.data.msg)
          }
          this.$router.push({ name: 'login' })
        })
    },
  },
}
</script>
