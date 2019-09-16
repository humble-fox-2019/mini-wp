import Vue from 'vue'
import Router from 'vue-router'
import Signup from './views/Signup'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import(/* webpackChunkName: "signin" */ './views/Signin.vue')
    },
    {
      path: '/dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
      children: [{
          path: '/',
          component: () => import(/* webpackChunkName: "articles" */ './views/Articles.vue')
        },{
          path: 'new-article',
          component: () => import(/* webpackChunkName: "add-article" */ './views/AddArticle.vue')
        },{
          path: 'article/:id',
          component: () => import(/* webpackChunkName: "update-article" */ './views/UpdateArticle.vue')
        }]
    }
  ]
})
