
<template>
    <div>
        <navbar @selectNav="selectNav" :isLogin="isLogin" :user="user" @logout="logout"></navbar>
        <div v-if="isLogin === false">
            <login v-if="isRegistered === true" @toRegisterPage="toLoginPage" @login="login" :alert="alert"></login>
            <register v-else-if="isRegistered === false" @toLoginPage="toLoginPage"></register>
        </div>
        <div v-else-if="isLogin === true">
            <sidebar @selectNav="selectNav"></sidebar>
            <contentarea :selectedNav="selectedNav" @editPost="editPost" :selectedArticle="selectedArticle" @save="save" :user="user"></contentarea>
        </div>
    </div>
</template>

<script>
import navbar from './components/navbar'
import sidebar from './components/sidebar'
import contentarea from './components/contentarea'
import login from './components/login'
import register from './components/register'

export default {
    components: {
       navbar,
       sidebar,
       contentarea,
       login,
       register
    },
    data() {
       return {
           selectedNav: 'dashboard',
           articles: [],
           selectedArticle: {},
           isLogin: false,
           isRegistered: true,
           user: {},
           alert: {}
       }
    },
    methods: {
       selectNav(selectedNav) {
           this.selectedNav = selectedNav
           this.selectedArticle = {}
       },
       editPost(selectedArticle) {
           this.selectedArticle = selectedArticle
           this.selectedNav = 'postdetail'
       },
       save() {
           this.selectedNav = 'posts'
       },
       toLoginPage(alert) {
           this.isRegistered = !this.isRegistered
           this.alert = alert
       },
       login(user) {
           this.isLogin = true
           this.user = user
       },
       logout() {
           this.isLogin = false
           this.alert.status = 'bye'
       }
    },
    created: function() {
        if(localStorage.getItem('token')) this.isLogin = true
    }
}
</script>

<style>

</style>