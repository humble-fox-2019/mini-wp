<template>
  <div class="wrapper">
    <div class="header">
      <div class="logo">
        <img src="@/assets/logo-white.png" alt="" srcset="">
      </div>
    </div>
    <div class="signup">
      <div class="left">
        <div>
          <h1>Welcome Back!</h1>
          <p>Hello guest, start writing today and keep your idea is spread to the world</p>
          <router-link to='/signin'>Signin</router-link>
        </div>
      </div>
      <div class="right">
        <div class="form">
          <h1>Create Account</h1>
          <div class="another-login">
            <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure" :renderParams="renderParams"></GoogleLogin>
          </div>
          <p>Or use your email for registration</p>
          <transition name="shake">
            <div class="error" v-if="errors.length > 0">
              <ul>
                <li v-for="(error, index) in errors" :key="index"> {{ error }} </li>
              </ul>
            </div>
          </transition>
          <form @submit.prevent="signup()">
            <div class="input-group">
              <label for="username"><i class="far fa-user"></i></label>
              <input type="text" placeholder="Username" v-model="username" required>
            </div>
            <div class="input-group">
              <label for="email"><i class="far fa-envelope"></i></label>
              <input type="email" placeholder="Email" v-model="email" required>
            </div>
            <div class="input-group">
              <label for="password"><i class="fas fa-unlock-alt"></i></label>
              <input type="password" placeholder="Password" v-model="password" required>
            </div>
            <div class="input-submit">
              <button type="submit" id="button-signup">SIGN UP</button>
            </div>
          </form>
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
      username: '',
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
        console.log(data)
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
    signup() {
      document.getElementById('button-signup').innerHTML = "Loading..."
      document.getElementById('button-signup').setAttribute('disabled', true)
      axios.post('/user/signup', {
        username: this.username,
        email: this.email,
        password: this.password
      })
      .then(({data}) => {
        this.$router.push('/signin')
      })
      .catch(err => {
        if(err.response.status === 400) {
          this.errors = err.response.data.errors
          setTimeout( () => {
            this.errors = []
          }, 4000)
        }
      })
      .finally(() => {
        document.getElementById('button-signup').innerHTML = "SIGN UP"
        document.getElementById('button-signup').removeAttribute('disabled')
      })
    }
  }
}
</script>
