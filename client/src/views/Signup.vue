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
            <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure"><i class="fab fa-google"></i></GoogleLogin>
            <button><i class="fab fa-facebook-f"></i></button>
          </div>
          <p>Or use your email for registration</p>
          <form>
            <div class="input-group">
              <label for="username"><i class="far fa-user"></i></label>
              <input type="text" placeholder="Username">
            </div>
            <div class="input-group">
              <label for="email"><i class="far fa-envelope"></i></label>
              <input type="email" placeholder="Email">
            </div>
            <div class="input-group">
              <label for="password"><i class="fas fa-unlock-alt"></i></label>
              <input type="password" placeholder="Password">
            </div>
            <div class="input-submit">
              <button type="submit">SIGN UP</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import GoogleLogin from 'vue-google-login'

export default {
  name: 'signup',
  components: {
    GoogleLogin
  },
  data() {
    return {
      params: {
        client_id: '698119016211-689asq70q6cq1m90kh87pbn6ikr5l5gq.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    onSuccess(googleUser) {
      console.log(googleUser)
    },
    onFailure(err) {
      console.log(err)
    }
  }
}
</script>
