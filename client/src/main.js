import Vue from 'vue'
import App from './App.vue'
import GSignInButton from 'vue-google-signin-button'

Vue.use(GSignInButton)

new Vue(App).$mount('#app')