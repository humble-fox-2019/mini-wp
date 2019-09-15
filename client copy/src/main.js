
import Vue from 'vue';
import App from './App.vue';

import vueWysiwyg from '../js/vueWysiwyg'
import '../css/vueWysiwyg'

Vue.use(vueWysiwyg)
new Vue(App).$mount('#app');