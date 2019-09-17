import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import wysiwyg from "vue-wysiwyg";
import App from './App.vue';
import "vue-wysiwyg/dist/vueWysiwyg.css";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(BootstrapVue)
Vue.use(wysiwyg, {
   
}); // config is optional. more below
Vue.use(VueSweetalert2);
new Vue(App).$mount('#app');