import Vue from 'vue';
import App from './App.vue';
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css';
import 'vuesax/dist/vuesax.css'
import GSignInButton from 'vue-google-signin-button'

Vue.use(GSignInButton)
Vue.use(Vuesax)
window.Univers = new Vue()

new Vue({
    render: createElement => createElement(App)
}).$mount('#App');