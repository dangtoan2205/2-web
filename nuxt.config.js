export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Shop ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' },

      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800&display=swap' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Lora:400,400i,700,700i&display=swap' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Amatic+SC:400,700&display=swap' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/open-iconic-bootstrap.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/animate.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/owl.carousel.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/owl.theme.default.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/magnific-popup.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/aos.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/ionicons.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/bootstrap-datepicker.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/bootstrap.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/jquery.timepicker.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/flaticon.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/icomoon.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/main.css' },
      // { rel: 'stylesheet', type: 'text/css', href: '/css/css/bootstrap-reboot.css' },
      // { rel: 'stylesheet', type: 'text/css', href: '/css/css/mixins/_text-hide.css' },
    ],
    script: [
      {
        type: 'text/javascript',
        src: '/js/jquery.min.js',
      },
      {
        type: 'text/javascript',
        src: '/js/jquery-migrate-3.0.1.min.js',
      },
      {
        type: 'text/javascript',
        src: '/js/popper.min.js',
      },
      {
        type: 'text/javascript',
        src: '/js/bootstrap.min.js',
      },
      {
        type: 'text/javascript',
        src: '/js/jquery.easing.1.3.js',
      },
      {
        type: 'text/javascript',
        src: '/js/jquery.waypoints.min.js',
      },
      {
        type: 'text/javascript',
        src: 'js/jquery.stellar.min.js',
      },
      {
        type: 'text/javascript',
        src: '/js/owl.carousel.min.js',
      },
      {
        type: 'text/javascript',
        src: '/js/jquery.magnific-popup.min.js',
      },
      {
        type: 'text/javascript',
        src: '/js/aos.js',
      },
      {
        type: 'text/javascript',
        src: 'js/jquery.animateNumber.min.js',
      },
      {
        type: 'text/javascript',
        src: '/js/bootstrap-datepicker.js',
      },
      {
        type: 'text/javascript',
        src: '/js/scrollax.min.js',
      },
      {
        type: 'text/javascript',
        src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBVWaKrjvy3MaE7SQ74_uJiULgl1JY0H2s&sensor=false',
      },
      {
        type: 'text/javascript',
        src: '/js/google-map.js',
      },
      {
        type: 'text/javascript',
        src: '/js/main.js',
      },
      {
        type: 'text/javascript',
        src: '/js/jquery-3.2.1.min.js',
      },
      {
        type: 'text/javascript',
        src: '/js/range.js',
      },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/style.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
      { src: '~/plugins/persistedState.client.js' },
      { src: '~/plugins/axios.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
     '@nuxtjs/toast',
  ],

  toast: {
      position: 'top-center',
      duration: 3000
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://127.0.0.1:8000/api/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
