import http from '@/utils/http/axios'

// /sys/config/delete
// 删除配置
export function deleteConfig (params) {
  return http({
    url: '/sys/config/delete',
    method: 'POST',
    params
  })
}

// /sys/config/info/{id}
// 根据id获取配置详情
export function infoConfig (id) {
  return http({
    url: `/sys/config/info/${id}`,
    method: 'GET'
  })
}

// /sys/config/list
// 所有配置列表，参数params：{page:当前查询页数,limit:每页显示条数}
export function listConfig (params) {
  return http({
    url: '/sys/config/list',
    method: 'GET',
    params
  })
}

// /sys/config/save
// 保存配置
export function saveConfig (data) {
  return http({
    url: '/sys/config/save',
    method: 'POST',
    data
  })
}

// /sys/config/update
// 修改配置
export function updateConfig (data) {
  return http({
    url: '/sys/config/update',
    method: 'POST',
    data
  })
}
