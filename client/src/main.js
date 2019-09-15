
import Vue from 'vue';
import App from './App.vue';

import vueWysiwyg from '../js/vueWysiwyg'
import '../css/vueWysiwyg'

import GSignInButton from 'vue-google-signin-button'
Vue.use(GSignInButton)

Vue.use(vueWysiwyg)
new Vue(App).$mount('#app');