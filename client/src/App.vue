<template>
  <div class="h-full">
    <!-- <a href="" id="logout-btn" @click.prevent="signOut">Logout</a> -->
    <Header class="shadow-lg bg-gray-100" :isLogin="isLogin"></Header>

    <div v-if="!isLogin">
      <login v-if="activePage === 'login-page'"></login>
      <Registration v-if="activePage === 'signup-page'"></Registration>
    </div>

    <div v-if="isLogin">
      <Dashboard v-if="activePage === 'dashboard'"></Dashboard>
      <Articles v-if="activePage === 'articles'" :token="token"></Articles>
      <NewArticle v-if="activePage === 'new-article'" :token="token"></NewArticle>
      <EditArticle v-if="activePage === 'edit-article'" :token="token"></EditArticle>
    </div>
  </div>
</template>

<script>
import EventBus from './eventBus.js'

import Header from './header/Header'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Articles from './pages/Articles'
import NewArticle from './pages/NewArticle'
import EditArticle from './pages/EditArticle'

export default {
  components: {
    Header,
    Registration,
    Login,
    Dashboard,
    Articles,
    NewArticle,
    EditArticle
  },
  data: {
    isLogin: false,
    token: '',
    activePage: 'login-page'
  },
  methods: {
    changePage(page) {
      this.activePage = page
    },
    updateToken(token) {
      this.token = token
    },
    signOut() {
      console.log('masuk')
      var auth2 = gapi.auth2.getAuthInstance()
      auth2.signOut().then(function() {
        // localStorage.removeItem('token')
        console.log('User signed out.')
      })
    }
  },
  mounted() {
    EventBus.$on('changePage', payload => {
      this.activePage = payload.page
    })
    EventBus.$on('login', payload => {
      localStorage.setItem('token', payload.token)
      this.isLogin = true
      this.token = payload.token
    })
    EventBus.$on('logout', payload => {
      this.isLogin = false
      localStorage.removeItem('token')
    })
    EventBus.$on('checkToken', payload => {
      const token = localStorage.getItem('token')
      if (token) {
        this.isLogin = true
        this.token = token
        this.activePage = 'dashboard'
      }
    })
  },
  created() {
    const token = localStorage.getItem('token')
    if (token) {
      this.isLogin = true
      this.token = token
      this.activePage = 'dashboard'
    }
  }
}
</script>

<style></style>
