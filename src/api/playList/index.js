import http from '@/utils/http/axios'

// /device/playlist/alllist/{devid}
// 获取终端全部播放列表
export function allListPlaylist (devid) {
  return http({
    url: `/device/playlist/alllist/${devid}`,
    method: 'GET'
  })
}

// /device/playlist/delete
// delete
export function deletePlaylist (params) {
  return http({
    url: '/device/playlist/delete',
    method: 'POST',
    params
  })
}

// /device/playlist/list/{devid}
// 分页查询播放列表，只返回list不返回page信息
export function listPlaylist (params, devid) {
  return http({
    url: `/device/playlist/list/${devid}`,
    method: 'GET',
    params
  })
}

// /device/playlist/update/sort/{id}
// 修改播放列表排序
export function updatePlaylist (params, id) {
  return http({
    url: `/device/playlist/update/sort/${id}`,
    method: 'POST',
    params
  })
}

// /device/playlist/update/sorts
// 批量修改播放列表排序
export function updateSortsPlaylist (params) {
  return http({
    url: '/device/playlist/update/sorts',
    method: 'POST',
    params
  })
}

// /device/playlist/update/state/{id}
// 修改播放列表状态
export function updateStatePlaylist (params) {
  return http({
    url: '/device/playlist/update/sorts',
    method: 'POST',
    params
  })
}
