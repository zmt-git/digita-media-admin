/*
 * @Description: 打包入口文件
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-24 20:12:55
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-25 21:29:59
 */

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './styles/index'
import hasBtn from '@/directives/button-auth'
Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.use(hasBtn)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
