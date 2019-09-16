import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import axios from 'axios'
import {routes} from './routes'

import {store} from './store/store'

axios.defaults.baseURL='https://pizza-app-66c27.firebaseio.com/'

// 配置Vue原型(在任何组件中都可以正常使用)
Vue.prototype.axios = axios

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if(savedPosition) {
      return savedPosition
    } else {
      return {x:0,y:0}
    }
  }
})

// router.beforeEach((to,from,next)=> {
//   if(to.path =='/login' || to.path == '/register') {
//     next()
//   } else {
//     alert('请先登录！')
//     next('/login')
//   }
// })
Vue.use(VueRouter)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
