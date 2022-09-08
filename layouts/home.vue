<template>
  <div class="goto-here" data-aos-easing="slide" data-aos-duration="800" data-aos-delay="0">
    <Navbar />

    <Nuxt />

    <Footer />
  </div>
</template>

<script>
import Footer from '../components/User/Footer.vue'
import Navbar from "~/components/User/Navbar";

export default {
  components: {
    Navbar,
    Footer,
  },
}
</script>
