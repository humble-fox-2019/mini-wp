'use strict'

import Vue from 'vue'
import App from '../src/App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import GSignInButton from 'vue-google-signin-button'

Vue.use(GSignInButton)
Vue.use(BootstrapVue)

const app = new Vue({
  render: createElement => createElement(App)
}).$mount('#app')
