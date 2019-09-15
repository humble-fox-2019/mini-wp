<template>
  <div class="flex">
    <div class="w-1/2 flex justify-center items-center">
      <img class="w-4/5" src="../../resources/undraw_services_5tv9.svg" alt="" />
    </div>

    <div class="w-1/2 flex items-center justify-center">
      <form class="my-32 w-1/2">
        <h1 class="text-3xl capitalize font-bold tracking-tight mb-4">Join us for great things!</h1>
        <div class="mt-3">
          <label class="font-bold tracking-tight text-gray-800" for="full-name">Full Name</label>
          <br />
          <input
            class="w-full px-4 py-3 mt-2 border border-gray-400 rounded focus:border-blue-500 focus:outline-none"
            type="text"
            id="full-name"
            v-model="name"
          />
        </div>

        <div class="mt-3">
          <label class="font-bold tracking-tight text-gray-800" for="email">Email</label>
          <br />
          <input
            class="w-full px-4 py-3 mt-2 border border-gray-400 rounded focus:border-blue-500 focus:outline-none"
            type="email"
            id="email"
            v-model="email"
          />
        </div>

        <div class="mt-3">
          <label class="font-bold tracking-tight text-gray-800" for="password">Password</label>
          <br />
          <input
            class="w-full px-4 py-3 mt-2 border border-gray-400 rounded focus:border-blue-500 focus:outline-none"
            type="password"
            id="password"
            v-model="password"
          />
        </div>

        <div class="mt-4" v-if="falseRegister">
          <div class="text-red-600" v-for="err in falseRegister">
            {{ err }}
          </div>
        </div>

        <button
          class="w-full py-4 mt-6 bg-purple-600 rounded text-white font-bold"
          @click.prevent="register"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      falseRegister: false
    }
  },
  methods: {
    register() {
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/register',
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          this.falseRegister = false

          const payload = {
            token: data.token
          }
          EventBus.$emit('login', payload)
          EventBus.$emit('changePage', { page: 'dashboard' })
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data)
            if (error.response.data.errors) {
              this.falseRegister = error.response.data.errors
              console.log(this.falseRegister)
            } else {
              this.falseRegister = [error.response.data.message]
              console.log(this.falseRegister)
            }
          } else if (error.request) {
            console.log(error.request)
          } else {
            console.log('Error', error.message)
          }
        })
    }
  }
}
</script>

<style></style>
