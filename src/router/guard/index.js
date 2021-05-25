/*
 * @Description:
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-24 22:40:25
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-24 22:40:26
 */
import { createProgress } from './progressGuard'
import { createPermission } from './permissionGuard'

export function setupGuard (router) {
  createPermission(router)
  createProgress(router)
}
