/*
 * @Description: 进度条守卫
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-24 22:38:55
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-24 22:39:52
 */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

export function createProgress (router) {
  router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
  })

  router.afterEach((to, from) => {
    NProgress.done()
  })
}
