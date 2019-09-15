import Vue from 'vue';
import App from './App.vue';
// import wysiwyg from './vueWysiwyg.js';
import wysiwyg from "vue-wysiwyg";
Vue.use(wysiwyg); // config is optional. more below

// Vue.use(wysiwyg, {
//     hideModules: { "table": true, "image": true },
//     maxHeight: "500px",
//     maxWidth : "600px",
//     forcePlainTextOnPaste: false
// });

new Vue(App).$mount('#app');