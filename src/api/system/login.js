import http from '@/utils/http/axios'

export function login (params) {
  return http({
    url: '/system/login',
    method: 'get',
    params
  })
}

export function logout () {
  return http({
    url: '/system/logout',
    method: 'get'
  })
}
