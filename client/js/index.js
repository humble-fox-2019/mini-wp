import Vue from 'vue';
import App from './App.vue';

import wysiwyg from 'vue-wysiwyg'
import "vue-wysiwyg/dist/vueWysiwyg.css";

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)
Vue.use(wysiwyg, {})

Vue.config.productionTip = false

new Vue(App).$mount('#app');