import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import GAuth from 'vue-google-oauth2'
import wyiwyg from '../vueWysiwyg'

const gauthOption = {
    clientId: '397136974634-6vtomnfvs20gm65r8g1sp3hprhvufhjl.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'select_account'
}





Vue.use(GAuth, gauthOption)
Vue.use(wyiwyg, {
    hideModules: {
        "table": true,
        "image": true
    }
})

Vue.use(BootstrapVue);
new Vue(App).$mount('#app');