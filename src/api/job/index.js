import http from '@/utils/http/axios'

// /ops/job/clean
// 清空任务
export function cleanJob () {
  return http({
    url: '/ops/job/clean',
    method: 'POST'
  })
}

// /ops/job/info/{id}
// 根据id获取详情
export function infoJob (id) {
  return http({
    url: `/ops/job/info/${id}`,
    method: 'GET'
  })
}

// /ops/job/list
// 执行任务基本信息的分页查询
export function listJob (params) {
  return http({
    url: '/ops/job/list',
    method: 'GET',
    params
  })
}
