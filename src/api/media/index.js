/*
 * @Description:
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-06-03 20:48:23
 * @LastEditors: ZMT
 * @LastEditTime: 2021-06-03 21:10:59
 */
import http from '@/utils/http/axios'

// /device/media/delete 删除媒体信息
export function deleteMedia (id, params) {
  return http({
    url: `/device/media/delete/${id}`,
    method: 'POST',
    params
  })
}

// /device/media/info/{id}
// 根据id获取详情
export function infoMedia (id) {
  return http({
    url: `/device/media/info/${id}`,
    method: 'GET'
  })
}

// /device/media/length
// length
export function lengthMedia (params) {
  return http({
    url: '/device/media/length',
    method: 'GET',
    params
  })
}

// /device/media/list
// 媒体基本信息的分页查询
export function listMedia (params) {
  return http({
    url: '/device/media/list',
    method: 'GET',
    params
  })
}

// /device/media/publish
// 媒体发布
export function publishMedia (params) {
  return http({
    url: '/device/media/publish',
    method: 'POST',
    params
  })
}

// /device/media/recall
// 撤回媒体
export function recallMedia (params) {
  return http({
    url: '/device/media/recall',
    method: 'POST',
    params
  })
}

// /device/media/save
// 新增媒体信息
export function saveMedia (data) {
  return http({
    url: '/device/media/save',
    method: 'POST',
    data
  })
}

// sys/oss/upload
export function uploadMedia (data) {
  return http({
    url: '/sys/oss/upload',
    method: 'POST',
    data
  })
}
