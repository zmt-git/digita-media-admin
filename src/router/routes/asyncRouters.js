import { lazyComponent } from '@/utils/lazyComponent'
import layout from '@/layout/index.vue'

export const asyncRoutes = [
  {
    path: '/device',
    hidden: false,
    name: 'device',
    meta: {
      title: '设备',
      auth: [0, 1, 2],
      icon: 'icon-touyingyi'
    },
    component: layout,
    redirect: '/device/deviceList',
    children: [
      {
        name: 'deviceList',
        path: 'deviceList',
        hidden: false,
        meta: {
          title: '设备',
          auth: [0, 1, 2],
          icon: 'icon-touyingyi1'
        },
        component: () => import('@/views/device/index.vue')
      },
      {
        name: 'deviceDetail',
        path: 'deviceDetail',
        hidden: true,
        meta: {
          title: '设备详情',
          auth: [0, 1, 2],
          icon: 'icon-meitiliebiao'
        },
        component: () => import('@/views/device/deviceDetail.vue')
      },
      {
        name: 'add',
        path: 'add',
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
    path: '/media',
    hidden: false,
    name: 'media',
    meta: {
      title: '媒体',
      auth: [0, 1, 2],
      icon: 'icon-duomeit'
    },
    component: layout,
    redirect: '/media/mediaList',
    children: [
      {
        name: 'mediaList',
        path: 'mediaList',
        hidden: false,
        meta: {
          title: '媒体',
          auth: [0, 1, 2],
          icon: 'icon-liumeitimeitiliebiao'
        },
        component: () => lazyComponent(import('@/views/media/index.vue'))
      },
      {
        name: 'mediaDetail',
        path: 'mediaDetail',
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
    path: '/task',
    hidden: false,
    name: 'task',
    meta: {
      title: '任务',
      auth: [0, 1, 2],
      icon: 'icon-renwu'
    },
    component: layout,
    redirect: '/task/taskList',
    children: [
      {
        name: 'taskList',
        path: 'taskList',
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
    path: '/system',
    name: 'system',
    hidden: false,
    meta: {
      title: '系统',
      icon: 'icon-xitongpeizhi',
      auth: [2]
    },
    component: layout,
    redirect: '/system/user',
    children: [
      {
        name: 'user',
        path: 'user',
        hidden: false,
        meta: {
          title: '用户',
          icon: 'icon-yonghuliebiao',
          auth: [2],
          btn: ['删除']
        },
        component: () => lazyComponent(import('@/views/user/index.vue'))
      },
      {
        name: 'suggest',
        path: 'suggest',
        hidden: false,
        meta: {
          title: '意见建议',
          icon: 'icon-yijianliebiao',
          auth: [2]
        },
        component: () => lazyComponent(import('@/views/suggest/index.vue'))
      },
      {
        name: 'server',
        path: 'server',
        hidden: false,
        meta: {
          title: '服务器配置',
          icon: 'icon-fuwuqi1',
          auth: [2]
        },
        component: () => lazyComponent(import('@/views/server/index.vue'))
      }
    ]
  }
]
