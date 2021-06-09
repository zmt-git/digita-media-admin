import http from '@/utils/http/axios'

// 获取播放列表
export function getPlaylist (devid) {
  return http({
    url: `/device/playlist/list/${devid}`,
    method: 'GET'
  })
}
