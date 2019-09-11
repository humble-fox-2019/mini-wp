import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import VueFroala from 'vue-froala-wysiwyg'

import './registerServiceWorker'


Vue.config.productionTip = false
Vue.use(VueFroala)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
