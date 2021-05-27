/*
 * @Description: 工具
 * @Version: 1.0
 * @Author: ZMT
 * @Date: 2021-04-21 14:27:55
 * @LastEditors: ZMT
 * @LastEditTime: 2021-04-21 14:51:24
 */
export function timestampToTime (timestamp, type) {
  if (!timestamp) {
    return ''
  }
  if (timestamp.length === 10) {
    timestamp = timestamp * 1000
  }
  var date = new Date(timestamp)
  const Y = date.getFullYear() + '-'
  const M = (date.getMonth() + 1).toString().padStart(2, '0') + '-'
  const D = date.getDate().toString().padStart(2, '0') + ' '
  const h = date.getHours().toString().padStart(2, '0') + ':'
  let m = date.getMinutes().toString().padStart(2, '0') + ':'
  const s = date.getSeconds().toString().padStart(2, '0')

  if (type === undefined) {
    return Y + M + D + h + m + s
  } else if (type.toLowerCase() === 'hh:mm') {
    m = m.slice(0, -1)
    return h + m
  } else if (type.toLowerCase() === 'hh:mm:ss') {
    return h + m + s
  } else if (type === 'yyyy-MM-dd') {
    return Y + M + D
  } else {
    return Y + M + D + h + m + s
  }
}

export function secondFormat (second, num = 2) {
  if (typeof (second) !== 'number') return '00:00'
  let hh = parseInt(second / 3600) >= 10 ? parseInt(second / 3600) + ':' : '0' + parseInt(second / 3600) + ':'
  const mm = parseInt((second % 3600) / 60) >= 10 ? parseInt((second % 3600) / 60) + ':' : '0' + parseInt((second % 3600) / 60) + ':'
  const ss = parseInt((second % 3600) % 60) >= 10 ? parseInt((second % 3600) % 60) : '0' + parseInt((second % 3600) % 60)
  if (hh === '00:' && num === 2) {
    hh = ''
  }
  return hh + mm + ss
}
