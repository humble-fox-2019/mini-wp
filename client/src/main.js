import Vue from 'vue';
import App from './App.vue';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Toasted from 'vue-toasted';
import GSignInButton from 'vue-google-signin-button';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret);
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(GSignInButton);
Vue.use(Toasted, {
    duration: 9000,
    action : {
        text : 'OK',
        onClick : (e, toastObject) => {
            toastObject.goAway(0);
        }
    }
});

new Vue(App).$mount('#app');