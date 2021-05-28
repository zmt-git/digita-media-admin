import { lazyComponent } from '@/utils/lazyComponent'
import layout from '@/layout/index.vue'

export const asyncRoutes = [
  {
    path: '/media',
    hidden: false,
    meta: {
      title: '媒体',
      auth: [0, 1, 2],
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
          auth: [0, 1, 2],
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
          auth: [0, 1, 2],
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
      auth: [0, 1, 2],
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
          auth: [0, 1, 2],
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
          auth: [0, 1, 2],
          icon: 'icon-meitiliebiao'
        },
        component: () => lazyComponent(import('@/views/device/deviceDetail.vue'))
      },
      {
        name: 'add',
        path: '/device/add',
        hidden: true,
        meta: {
          auth: [0, 1, 2],
          title: '设备添加',
          icon: ''
        },
        component: () => lazyComponent(import('@/views/device/deviceAdd.vue'))
      }
    ]
  },
  {
    path: '/task',
    hidden: false,
    meta: {
      title: '任务',
      auth: [0, 1, 2],
      icon: 'icon-renwu'
    },
    component: layout,
    children: [
      {
        name: 'task',
        path: '/',
        hidden: false,
        meta: {
          title: '任务',
          auth: [0, 1, 2],
          icon: 'icon-renwu1'
        },
        component: () => lazyComponent(import('@/views/job/index.vue'))
      }
    ]
  },
  {
    path: '/user',
    hidden: false,
    meta: {
      title: '用户',
      icon: 'icon-yonghu',
      auth: [2]
    },
    component: layout,
    children: [
      {
        name: 'user',
        path: '/',
        hidden: false,
        meta: {
          title: '用户',
          icon: 'icon-yonghuliebiao',
          auth: [2],
          btn: ['删除']
        },
        component: () => lazyComponent(import('@/views/user/index.vue'))
      }
    ]
  }
]
