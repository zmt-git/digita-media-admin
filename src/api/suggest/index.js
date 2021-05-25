import http from '@/utils/http/axios'

// /ops/suggest/info/{id}
// 根据id获取详情
export function infoSuggest (id) {
  return http({
    url: `/ops/suggest/info/${id}`,
    method: 'GET'
  })
}

// /ops/suggest/list
// 意见建议基本信息的分页查询
export function listSuggest (params) {
  return http({
    url: '/ops/suggest/list',
    method: 'GET',
    params
  })
}

// /ops/suggest/save
// 新增意见建议
export function saveSuggest (data) {
  return http({
    url: '/ops/suggest/save',
    method: 'POST',
    data
  })
}
