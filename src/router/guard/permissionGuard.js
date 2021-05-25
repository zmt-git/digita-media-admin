/*
 * @Description: 全局路由守卫
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-24 22:40:07
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-24 22:40:18
 */
import { getToken } from '@/utils/cache/tokenCache'
import store from '@/store'
const WHITE_LIST = ['/login', '/404', '/401', '/500']

export function createPermission (router) {
  router.beforeEach(async (to, from, next) => {
    if (getToken()) {
      if (to.path === 'login') {
        next('/')
      } else {
        next()
      }
    } else {
      if (WHITE_LIST.includes(to.path)) {
        next()
      } else {
        await store.dispatch('logoutActions')
        next('/login')
      }
    }
  })
}
