import http from '@/utils/http/axios'

// /device/device/delete
// delete

export function deleteDevice (params) {
  return http({
    url: '/device/device/delete',
    method: 'POST',
    params
  })
}

// /device/device/direction/{devid}
// 设置屏幕播放方向
export function directionDevice (params, devid) {
  return http({
    url: `/device/device/direction/${devid}`,
    method: 'POST',
    params
  })
}

// /device/device/info/{id}
// 根据id获取详情
export function infoDevice (id) {
  return http({
    url: `/device/device/info/${id}`,
    method: 'GET'
  })
}

// /device/device/light/{devid}
// 设置光源
export function lightDevice (params, devid) {
  return http({
    url: `/device/device/info/${devid}`,
    method: 'POST',
    params
  })
}

// /device/device/list
// 设备基本信息的分页查询
export function listDevice (params) {
  return http({
    url: '/device/device/list',
    method: 'GET',
    params
  })
}

// /device/device/list/publish
// 媒体已发布设备列表
export function publishDevice (params) {
  return http({
    url: '/device/device/list/publish',
    method: 'GET',
    params
  })
}

// /device/device/list/unpublish
// 媒体未发布设备列表
export function unpublishDevice (params) {
  return http({
    url: '/device/device/list/unpublish',
    method: 'GET',
    params
  })
}

// /device/device/register/check/{code}
// 终端注册码验证
export function registerDevice (params, code) {
  return http({
    url: `/device/device/register/check/${code}`,
    method: 'GET'
  })
}

// /device/device/save
// 新增设备和修改设备调用同一个接口
export function saveDevice (data) {
  return http({
    url: '/device/device/save',
    method: 'POST',
    data
  })
}

// /device/device/statistics
// 统计当前终端用户所有的设备状态
export function statisticsDevice () {
  return http({
    url: '/device/device/statistics',
    method: 'GET'
  })
}

// /device/device/time/{devid}
// 设置设备时间，时间格式HH:mm
export function timeDevice (params, devid) {
  return http({
    url: `/device/device/time/${devid}`,
    method: 'GET',
    params
  })
}
