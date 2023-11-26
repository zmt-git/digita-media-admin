import http from '@/utils/http/axios'

// /mobile/exist
// 检查手机号是否存在
export function existMobile (params) {
  return http({
    url: '/mobile/exist',
    method: 'GET',
    params
  })
}
// /mobile/login/code/{mobile}
// 发送短信【登录】验证码
export function codeLogin (mobile) {
  return http({
    url: `/mobile/login/code/${mobile}`,
    method: 'GET'
  })
}

// /mobile/login/sms
// 手机短信验证码登录
export function smsLogin (params) {
  return http({
    url: '/mobile/login/sms',
    method: 'POST',
    params
  })
}

// /mobile/register
// 用户注册并登录
export function registerLogin (params) {
  return http({
    url: '/mobile/register',
    method: 'POST',
    params
  })
}

// /mobile/register/code/{mobile}
// 发送短信【注册】验证码
export function registerCode (mobile) {
  return http({
    url: `/mobile/register/code/${mobile}`,
    method: 'GET'
  })
}

// /mobile/reset/code/{mobile}
// 发送短信【重置密码】验证码
export function resetCode (mobile) {
  return http({
    url: `/mobile/reset/code/${mobile}`,
    method: 'GET'
  })
}

// /sys/code/{time}
// captcha
export function timeCode (time) {
  return http({
    url: `/sys/code/${time}`,
    method: 'GET'
  })
}

// /sys/login
// login

export function login (params) {
  return http({
    url: '/sys/login',
    method: 'POST',
    params
  })
}

// /sys/logout
// 注销，并删除token信息
export function logout () {
  return http({
    url: '/sys/logout',
    method: 'POST'
  })
}

// /sys/unauthorized
// unauthorized
export function unauthorized () {
  return http({
    url: '/sys/unauthorized',
    method: 'POST'
  })
}

// /sys/welcome
// 获取初始界面的欢迎语，不拦截
export function welcome () {
  return http({
    url: '/sys/welcome',
    method: 'GET'
  })
}

// /sys/user/password/reset
// 使用短信验证码重置用户密码
export function reset (params) {
  return http({
    url: '/sys/user/password/reset',
    method: 'POST',
    params
  })
}
