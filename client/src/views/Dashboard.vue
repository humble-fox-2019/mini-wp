<template>
  <div class="dashboard">
    <div class="side-bar">
      <div class="logo">
        <img src="@/assets/logo-white.png" alt="" srcset="">
      </div>
      <div class="menu">
        <h2>Menu</h2>
        <router-link to="/dashboard">My Articles</router-link>
        <router-link to="/dashboard/new-article">Add new article</router-link>
      </div>
      <div class="signout">
        <GoogleLogin :params="params" :onSuccess="signOut" :logoutButton="true" >Signout</GoogleLogin>
      </div>
    </div>
      <div class="content">
        <transition name="fade">
          <router-view @update-article="updateArticle"></router-view>
        </transition>
      </div>
  </div>
</template>

<script>

import GoogleLogin from 'vue-google-login'
import axios from '../api/server'

export default {
  name: 'Dashboard',
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
    signOut() {
      localStorage.clear()
      this.$router.push('/signin')
    },
    updateArticle(id) {
      this.$router.push(`/dashboard/article/${id}`)
    }
  },
  beforeCreate() {
    let token = localStorage.getItem('token')
    if(!token) {
      this.$router.push('/signin')
    }
  }
}
</script>

<style>
.signout button{
  padding: 10px 20px;
  background-color: transparent;
  border: 2px solid #ffffff;
  border-radius: 5px;
}
</style>