/*
 * @Description: 全局路由守卫
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-24 22:40:07
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-24 22:40:18
 */
import { getToken, removeToken } from '@/utils/cache/cacheToken'
import { asyncRoutes } from '@/router/routes/asyncRouters'
import { routesFilter } from '@/utils/auth'
import { getPageTitle } from '@/utils/getPageTitle'
import store from '@/store'
const WHITE_LIST = ['/login', '/404', '/401', '/500', '/register', '/userAgreement']

export function createPermission (router) {
  router.beforeEach(async (to, from, next) => {
    document.title = getPageTitle(to.meta.title)
    if (getToken()) {
      if (store.getters.load) {
        if (to.path === 'login') {
          next({ path: '/' })
        } else {
          next()
        }
      } else {
        try {
          await store.dispatch('infoUserActions')
          const routes = routesFilter(asyncRoutes, store.getters.userType)
          store.commit('set_routes', routes)
          routes.forEach(route => {
            router.addRoute(route)
          })
          next({ path: to.path })
        } catch (e) {
          console.log(e)
          removeToken()
          store.commit('set_load', false)
          next('/login')
        }
      }
    } else {
      if (WHITE_LIST.includes(to.path)) {
        next()
      } else {
        await store.dispatch('logoutActions')
          .catch(e => {
            console.log(e)
          })
        removeToken()
        next('/login')
      }
    }
  })
}
