<template>
  <div class="w-full flex-col h-full">
    <form class="w-1/4 my-32 mx-auto">
      <h1 class="text-3xl capitalize font-bold mb-4">Login to Mini WP</h1>

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

      <div class="mt-4" v-if="falseLogin">
        <div class="text-red-600" v-for="err in falseLogin">
          {{ err }}
        </div>
      </div>

      <button
        class="w-full py-4 mt-6 bg-purple-600 rounded text-white font-bold focus:outline-none"
        @click.prevent="login"
      >
        Login
      </button>

      <div>
        <h1 class="capitalize font-bold mt-6">Login In With Another Account</h1>
        <g-signin-button
          :params="googleSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError"
        >
          Google
        </g-signin-button>
      </div>

      <div class="div text-sm text-right mt-2">
        <a href="" class="text-purple-500" @click.prevent="changePage('signup-page')"
          >Not a member yet? <span class="font-bold text-purple-600">Sign up for free</span></a
        >
      </div>
    </form>
  </div>
</template>

<script>
import EventBus from '../eventBus'
import axios from 'axios'
import { eventNames } from 'cluster'

export default {
  data() {
    return {
      email: '',
      password: '',
      falseLogin: false,
      googleSignInParams: {
        client_id: '250484679063-cb34pi8qsjc1dvfmdmgegu5vo2mpan32.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    changePage(page) {
      const payload = {
        page
      }

      EventBus.$emit('changePage', payload)
    },
    login() {
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          this.falseLogin = false

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
              this.falseLogin = error.response.data.errors
              console.log(this.falseLogin)
            } else {
              this.falseLogin = [error.response.data.message]
              console.log(this.falseLogin)
            }
          } else if (error.request) {
            console.log(error.request)
          } else {
            console.log('Error', error.message)
          }
        })
    },
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const id_token = googleUser.getAuthResponse().id_token
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/google',
        headers: { id_token }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          EventBus.$emit('checkToken')
        })
        .catch(err => {
          console.log(err)
        })
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
    }
  }
}
</script>

<style></style>
