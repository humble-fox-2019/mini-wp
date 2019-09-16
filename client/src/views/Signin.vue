<template>
  <div class="wrapper">
    <div class="header">
      <div class="logo">
        <img src="@/assets/logo-green.png" alt="" srcset="">
      </div>
    </div>
    <div class="signin">
      <div class="right">
        <div class="form">
          <h1>Sign in to MiniWordpress</h1>
          <div class="another-login">
            <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure" :renderParams="renderParams"><i class="fab fa-google"></i></GoogleLogin>
          </div>
          <p>Or use your email for signin</p>
          <transition name="shake">
            <div class="error" v-if="errors.length > 0">
              <ul>
                <li v-for="(error, index) in errors" :key="index"> {{ error }} </li>
              </ul>
            </div>
          </transition>
          <form @submit.prevent="signin()">
            <div class="input-group">
              <label for="email"><i class="far fa-envelope"></i></label>
              <input type="email" placeholder="Email" v-model="email">
            </div>
            <div class="input-group">
              <label for="password"><i class="fas fa-unlock-alt"></i></label>
              <input type="password" placeholder="Password" v-model="password">
            </div>
            <div class="input-submit">
              <button type="submit" id="button-signin">SIGN IN</button>
            </div>
          </form>
        </div>
      </div>
      <div class="left">
        <div>
          <h1>Hello There</h1>
          <p>Create your account in miniwordpress and spread the world</p>
          <router-link to='/'>Signup</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import GoogleLogin from 'vue-google-login'
import axios from '@/api/server.js'

export default {
  name: 'signup',
  components: {
    GoogleLogin
  },
  data() {
    return {
      params: {
        client_id: '698119016211-689asq70q6cq1m90kh87pbn6ikr5l5gq.apps.googleusercontent.com'
      },
      renderParams: {
        width: 120,
        height: 40
      },
      email: '',
      password: '',
      errors: []
    }
  },
  methods: {
    onSuccess(googleUser) {
      axios.post('/user/signinGoogle', null, {
        headers: {
          idtoken: googleUser.Zi.id_token
        }
      })
      .then(({data}) => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', data.username)
        this.$router.push('/dashboard')
      })
      .catch(err => {
        console.log(err.response.data)
      })
    },
    onFailure(err) {
      console.log(err)
    },
    signin() {
      document.getElementById('button-signin').innerHTML = "Loading..."
      document.getElementById('button-signin').setAttribute('disabled', true)
      axios.post('user/signin', {
        email: this.email,
        password: this.password
      })
      .then(({data}) => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', data.username)
        this.$router.push('/dashboard')
      })
      .catch(err => {
        this.errors = err.response.data.errors
        setTimeout( () => {
          this.errors = []
        }, 4000)
      })
      .finally(() => {
        document.getElementById('button-signin').innerHTML = "SIGN IN"
        document.getElementById('button-signin').removeAttribute('disabled')
      })
    }
  }
}
</script>
