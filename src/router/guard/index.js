/*
 * @Description:
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-24 22:40:25
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-26 19:51:21
 */
import { createProgress } from './progressGuard'
import { createPermission } from './permissionGuard'
import { createPageLoadingGuard } from './pageLoadingGuard'
export function setupGuard (router) {
  createPermission(router)
  createProgress(router)
  createPageLoadingGuard(router)
}
