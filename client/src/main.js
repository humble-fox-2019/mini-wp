import Vue from 'vue';
import App from './App.vue';
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import wysiwyg from "vue-wysiwyg";
import GSignInButton from 'vue-google-signin-button'
Vue.use(GSignInButton)

Vue.use(Vuesax)
Vue.use(wysiwyg, {
    hideModules: { "table": true, "image": false },
    image: {
      uploadURL: "/api/myEndpoint",
      dropzoneOptions: {}
    },
    maxHeight: "500px",
    forcePlainTextOnPaste: false
});
new Vue(App).$mount('#app');