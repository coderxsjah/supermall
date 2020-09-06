import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store";

import Toast from "./components/common/toast/";//导入插件Toast
Vue.use(Toast)

import FastClick from "fastclick"//导入并使用fastClick,解决300ms延迟问题
FastClick.attach(document.body)

import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()//事务总线

Vue.use(VueLazyLoad, {
  preLoad: 1,
  loading: require('./assets/img/common/placeholder.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
}).$mount('#app')

