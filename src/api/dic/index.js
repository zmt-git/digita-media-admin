import http from '@/utils/http/axios'

// /sys/dic/list
// list
export function dicList (params) {
  return http({
    url: '/sys/dic/list',
    method: 'GET',
    params
  })
}
