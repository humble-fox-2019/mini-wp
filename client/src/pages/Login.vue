<template>
  <div class="w-full flex-col h-full">
    <Loading :isLoading="isLoading" :fullPage="fullPage"></Loading>
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
          <i class="fab fa-google text-2xl mt-1"></i>
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
import Loading from '../helper/Loading'

export default {
  components: {
    Loading
  },
  data() {
    return {
      email: '',
      password: '',
      falseLogin: false,
      googleSignInParams: {
        client_id: '160776637941-dnr0nh9hfm26894b08ld9as9232v6ofk.apps.googleusercontent.com'
      },
      isLoading: false,
      fullPage: true
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
      this.isLoading = true
      axios({
        method: 'post',
        url: 'http://35.187.235.228/users/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          this.isLoading = false

          const payload = {
            token: data.token
          }
          EventBus.$emit('login', payload)
          EventBus.$emit('changePage', { page: 'dashboard' })
        })
        .catch(error => {
          this.isLoading = false
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
      this.isLoading = true
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const id_token = googleUser.getAuthResponse().id_token
      console.log(id_token)
      axios({
        method: 'post',
        url: 'http://35.187.235.228/users/google',
        headers: { id_token }
      })
        .then(({ data }) => {
          this.isLoading = false
          localStorage.setItem('token', data.token)
          EventBus.$emit('checkToken')
        })
        .catch(err => {
          this.isLoading = false
          console.log(err, 'axios err')
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
