import http from '@/utils/http/axios'

// /sys/user/delete
// delete
export function deleteUser (params) {
  return http({
    url: '/sys/user/delete',
    method: 'POST',
    params
  })
}

// /sys/user/info
// info
export function infoUser () {
  return http({
    url: '/sys/user/info',
    method: 'GET'
  })
}

// /sys/user/info/{userId}
// info
export function infoUserId (params, userId) {
  return http({
    url: `/sys/user/info/${userId}`,
    method: 'GET',
    params
  })
}

// /sys/user/list
// list
export function listUser (params) {
  return http({
    url: '/sys/user/list',
    method: 'GET',
    params
  })
}

// /sys/user/password
// 修改登录用户密码
export function passwordUser (params) {
  return http({
    url: '/sys/user/password',
    method: 'POST',
    params
  })
}

// /sys/user/password/exist
// passwordExist
// export function existPasswordUser () {
//   return http({
//     url: '/sys/user/password/exist',
//     method: 'GET'
//   })
// }

// /sys/user/password/reset
// 使用短信验证码重置用户密码
export function existPasswordUser (params) {
  return http({
    url: '/sys/user/password/exist',
    method: 'POST',
    params
  })
}
// /sys/user/save
// save
export function saveUser (data) {
  return http({
    url: '/sys/user/save',
    method: 'POST',
    data
  })
}

// /sys/user/update
// update
export function updateUser (data) {
  return http({
    url: '/sys/user/update',
    method: 'POST',
    data
  })
}
