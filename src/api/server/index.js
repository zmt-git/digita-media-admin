import http from '@/utils/http/axios'

// sys/oss/config 获取媒体服务器配置
export function getMediaConfig () {
  return http({
    url: 'sys/oss/config',
    method: 'GET'
  })
}

// sys/oss/saveConfig 修改媒体服务器配置
export function setMediaConfig (data) {
  return http({
    url: '/sys/oss/saveConfig',
    method: 'POST',
    data
  })
}
