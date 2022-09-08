<template>
  <div>
    <Navbar />
    <div class="col-md-12 text-center min-h-screen">
        <Nuxt />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '../components/admin/Navbar.vue'

export default {
  components: {
    Navbar
  },
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
