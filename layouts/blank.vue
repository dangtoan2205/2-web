<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <Nuxt />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['hasToken']),
  },
  created() {
    this.checkLogin()
  },
  methods: {
    checkLogin() {
      if (this.hasToken === null) {
        this.$router.push({ name: 'login' })
      }
    },
  },
}
</script>
