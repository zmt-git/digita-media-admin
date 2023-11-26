import http from '@/utils/http/axios'
import Qs from 'qs'
// 获取播放列表
export function getPlaylist(devid) {
  return http({
    url: `/device/playlist/list/${devid}`,
    method: 'GET'
  })
}
// /device/playlist/update/content
// 批量修改播放列表内容
export function updateContent(params) {
  return http({
    url: '/device/playlist/update/content',
    method: 'POST',
    params,
    paramsSerializer: function(params) {
      return Qs.stringify(params, { indices: false })
    }
  })
}

export function updateContentV2(params) {
  return http({
    url: '/device/playlist/update/all',
    method: 'POST',
    params,
    paramsSerializer: function(params) {
      return Qs.stringify(params, { indices: false })
    }
  })
}

// 设置颜色
export function setColor(id, params) {
  return http({
    url: `/device/playlist/color/${id}`,
    method: 'POST',
    params
  })
}
