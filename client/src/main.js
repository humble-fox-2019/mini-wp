import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import wysiwyg from "vue-wysiwyg";
import App from './App.vue';
import "vue-wysiwyg/dist/vueWysiwyg.css";

Vue.use(BootstrapVue)
Vue.use(wysiwyg, {
   
}); // config is optional. more below
new Vue(App).$mount('#app');