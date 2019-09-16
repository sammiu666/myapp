// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router' 
import Routes from './routes'
import axios from 'axios'
//全局配置
axios.defaults.baseURL = 'https://vuedemo-1f126.firebaseio.com'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(VueRouter)
//自定义指令
// Vue.directive('rainbow', {
//   bind(el, binding,vnode) {
//     el.style.color = "#" + Math.random().toString(16).slice(2,8);
//   }
// })

// Vue.directive('theme', {
//   bind(el,binding,vnode) {
//     if(binding.value === 'wide') {
//       el.style.maxWidth = "1260px";
//     } else if(binding.value === 'narrow') {
//       el.style.maxWidth = '560px';
//     }

//     if(binding.arg === 'column') {
//       el.style.background = '#6677cc';
//       el.style.padding = '20px';
//     }
//   }
// })
// //自定义过滤器，将title全都变为大写
// Vue.filter("to-uppercase", function(value) {
//   return value.toUpperCase();
// })
// //通过过滤器缩短blog内容的长度。
// Vue.filter('snippet', function(value) {
//   return value.slice(0,100) + "...";
// })
// 创建路由
const router = new VueRouter({
  routes: Routes,
  mode: "history"
})


new Vue({
  el: '#app',
  router: router,
  components: { App },
  template: '<App/>'
})
