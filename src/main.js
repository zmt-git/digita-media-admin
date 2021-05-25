/*
 * @Description: 打包入口文件
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-24 20:12:55
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-24 22:36:49
 */

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/reset.scss'
import 'animate.css'
import './styles/resetAnimate.scss'
Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
