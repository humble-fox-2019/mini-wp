'use strict'

import Vue from 'vue'
import App from '../src/App.vue'

const app = new Vue({
  render: createElement => createElement(App)
}).$mount('#app')
