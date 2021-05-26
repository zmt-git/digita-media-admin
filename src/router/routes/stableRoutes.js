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
      title: '登录'
    },
    component: () => lazyComponent(import('@/views/system/login.vue'))
  },
  {
    path: '/',
    hidden: true,
    meta: {
      title: '首页'
    },
    component: layout,
    children: [
      {
        name: 'index',
        path: '/',
        hidden: true,
        meta: {
          title: '首页'
        },
        component: () => lazyComponent(import('@/views/index.vue'))
      }
    ]
  },
  {
    path: '/media',
    hidden: false,
    meta: {
      title: '媒体',
      icon: 'icon-duomeit'
    },
    component: layout,
    children: [
      {
        name: 'media',
        path: '/',
        hidden: false,
        meta: {
          title: '媒体',
          icon: 'icon-meitiliebiao'
        },
        component: () => lazyComponent(import('@/views/media/index.vue'))
      },
      {
        name: 'player',
        path: '/media/detail',
        hidden: true,
        meta: {
          title: '媒体播放',
          icon: 'icon-meitiliebiao'
        },
        component: () => lazyComponent(import('@/views/media/mediaDetail.vue'))
      }
    ]
  },
  {
    path: '/device',
    hidden: false,
    meta: {
      title: '设备',
      icon: 'icon-touyingyi'
    },
    component: layout,
    children: [
      {
        name: 'device',
        path: '/',
        hidden: false,
        meta: {
          title: '设备',
          icon: 'icon-touyingyi1'
        },
        component: () => lazyComponent(import('@/views/device/index.vue'))
      },
      {
        name: 'detail',
        path: '/device/detail',
        hidden: true,
        meta: {
          title: '设备详情',
          icon: 'icon-meitiliebiao'
        },
        component: () => lazyComponent(import('@/views/device/deviceDetail.vue'))
      },
      {
        name: 'add',
        path: '/device/add',
        hidden: true,
        meta: {
          title: '设备添加'
        },
        component: () => lazyComponent(import('@/views/device/deviceAdd.vue'))
      }
    ]
  },
  {
    path: '/suggest',
    hidden: false,
    meta: {
      title: '意见建议',
      icon: 'icon-jianyi'
    },
    component: layout,
    children: [
      {
        name: 'suggest',
        path: '/',
        hidden: false,
        meta: {
          title: '意见建议',
          icon: 'icon-jianyi1'
        },
        component: () => lazyComponent(import('@/views/suggest/index.vue'))
      }
    ]
  },
  {
    path: '/user',
    hidden: false,
    meta: {
      title: '用户',
      icon: 'icon-yonghu'
    },
    component: layout,
    children: [
      {
        name: 'user',
        path: '/',
        hidden: false,
        meta: {
          title: '用户',
          icon: 'icon-yonghuliebiao'
        },
        component: () => lazyComponent(import('@/views/user/index.vue'))
      }
    ]
  }
]
