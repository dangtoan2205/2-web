<template>
  <div class="max-w-md w-full space-y-8">
    <div>
      <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow"/>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign up to login
      </h2>
    </div>
    <form class="mt-8 space-y-6" @submit.prevent="register">
      <input type="hidden" name="remember" value="true" />
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="email-address" class="sr-only">User name</label>
          <input v-model="user.name" name="name" type="text" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="User name"/>
          <div v-if="error.name" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span class="block sm:inline">{{ error.name[0] }}</span>
          </div>
        </div>
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input v-model="user.email" name="email" type="email" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address"/>
          <div v-if="error.email" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span class="block sm:inline">{{ error.email[0] }}</span>
          </div>
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input v-model="user.password" name="password" type="password" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"/>
          <div v-if="error.password" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span class="block sm:inline">{{ error.password[0] }}</span>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="text-sm">
          <nuxt-link :to="{ name: 'login' }">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
              Already have an account?
            </a>
          </nuxt-link>
        </div>
      </div>
      <div>
        <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3"></span>
          Sign up
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Register',
  layout: 'blank',
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
      },
      error: {},
    }
  },
  head() {
    return {
      title: 'Register page',
    }
  },
  methods: {
    register() {
      axios
        .post('http://127.0.0.1:8000/register', this.user)
        .then(() => {
          this.$toast.success('Successfully register')
          this.$router.push({ name: 'login' })
        })
        .catch((e) => {
          this.error = e.response.data.errors
        })
    },
  },
}
</script>
