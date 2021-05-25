/*
 * @Description: 路由配置
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-24 20:30:36
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-25 20:38:18
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import { stableRoutes } from './routes/stableRoutes'
import { setupGuard } from './guard'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes: stableRoutes
})

setupGuard(router)

export default router
