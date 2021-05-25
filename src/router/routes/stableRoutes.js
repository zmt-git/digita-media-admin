/*
 * @Description: 静态路由表
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-24 22:41:04
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-24 22:49:15
 */
import { lazyComponent } from '@/utils/lazyComponent'

export const stableRoutes = [
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登录'
    },
    component: () => lazyComponent(import('@/views/system/login.vue'))
  }
]
