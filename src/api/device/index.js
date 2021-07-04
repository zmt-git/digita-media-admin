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
export function directionDevice (devid, params) {
  return http({
    url: `/device/device/direction/${devid}`,
    method: 'POST',
    params
  })
}

// /device/device/info/{devid}
// 设置信息提示
export function infoDevicePost (id, params) {
  return http({
    url: `/device/device/info/${id}`,
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
export function lightDevice (devid, params) {
  return http({
    url: `/device/device/light/${devid}`,
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

// /device/device/logo/{devid}
// 设置开机动画
export function logoDevice (devid, params) {
  return http({
    url: `/device/device/logo/${devid}`,
    method: 'POST',
    params
  })
}

// /device/device/rebootAll/{devid}
// 重启智能终端
export function rebootAllDevice (devid, params) {
  return http({
    url: `/device/device/rebootAll/${devid}`,
    method: 'POST',
    params
  })
}

// /device/device/rebootApp/{devid}
// 重启核心程序
export function rebootAppDevice (devid, params) {
  return http({
    url: `/device/device/rebootApp/${devid}`,
    method: 'POST',
    params
  })
}

// /device/device/check
// check
// 终端注册码验证
export function registerDevice (params) {
  return http({
    url: 'device/device/check',
    method: 'POST',
    params
  })
}

// /device/device/reset/{devid}
// 恢复出厂设置
export function resetDevice (devid, params) {
  return http({
    url: `/device/device/reset/${devid}`,
    method: 'POST',
    params
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
export function timeDevice (devid, params) {
  return http({
    url: `/device/device/time/${devid}`,
    method: 'GET',
    params
  })
}

// /device/device/uploadLog/{devid}
// 上传工作日志
export function uploadLogDevice (devid, params) {
  return http({
    url: `/device/device/uploadLog/${devid}`,
    method: 'POST',
    params
  })
}

// /device/device/volume/{devid}
// 设置媒体音量
export function volumeDevice (devid, params) {
  return http({
    url: `/device/device/volume/${devid}`,
    method: 'POST',
    params
  })
}

// 切换场景
// deviceCode playListNumber
export function orderNumber (devid, params) {
  return http({
    url: `/device/device/ordernumber/${devid}`,
    method: 'POST',
    params
  })
}
