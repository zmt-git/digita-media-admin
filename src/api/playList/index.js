import http from '@/utils/http/axios'

// 获取播放列表
export function getPlaylist (devid) {
  return http({
    url: `/device/playlist/list/${devid}`,
    method: 'GET'
  })
}
// /device/playlist/update/content
// 批量修改播放列表内容
export function updateContent (params) {
  return http({
    url: '/device/playlist/update/content',
    method: 'POST',
    params
  })
}
