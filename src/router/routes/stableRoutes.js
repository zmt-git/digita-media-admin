/*
 * @Description: 静态路由表
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-24 22:41:04
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-25 21:52:12
 */
import { lazyComponent } from '@/utils/lazyComponent'
import layout from '@/layout/index.vue'
export const stableRoutes = [
  {
    name: 'login',
    path: '/login',
    hidden: true,
    meta: {
      title: '登录',
      auth: [0, 1, 2],
      icon: ''
    },
    component: () => lazyComponent(import('@/views/system/login.vue'))
  },
  {
    name: 'register',
    path: '/register',
    hidden: true,
    meta: {
      title: '注册',
      auth: [0, 1, 2],
      icon: ''
    },
    component: () => lazyComponent(import('@/views/system/register.vue'))
  },
  {
    path: '/',
    hidden: true,
    meta: {
      auth: [0, 1, 2],
      title: '首页',
      icon: ''
    },
    component: layout,
    children: [
      {
        name: 'index',
        path: '/',
        hidden: true,
        meta: {
          auth: [0, 1, 2],
          title: '首页',
          icon: ''
        },
        component: () => lazyComponent(import('@/views/index.vue'))
      }
    ]
  }
]
