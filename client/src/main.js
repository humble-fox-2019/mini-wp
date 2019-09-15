import Vue from 'vue'
import App from './App.vue'
import VueQuillEditor from 'vue-quill-editor'
import GSignInButton from "vue-google-signin-button";

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.component('vue-multiselect', window.VueMultiselect.default);

Vue.use(GSignInButton);
Vue.use(VueQuillEditor)
new Vue(App).$mount('#app')