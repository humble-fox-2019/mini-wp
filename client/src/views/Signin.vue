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
            <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure"><i class="fab fa-google"></i></GoogleLogin>
            <button><i class="fab fa-facebook-f"></i></button>
          </div>
          <p>Or use your email for signin</p>
          <form>
            <div class="input-group">
              <label for="email"><i class="far fa-envelope"></i></label>
              <input type="email" placeholder="Email">
            </div>
            <div class="input-group">
              <label for="password"><i class="fas fa-unlock-alt"></i></label>
              <input type="password" placeholder="Password">
            </div>
            <div class="input-submit">
              <button type="submit">SIGN IN</button>
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
