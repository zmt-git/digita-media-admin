/*
 * @Description: axios封装，(拦截处理异常错误)
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-24 20:53:05
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-24 22:23:08
 */
import axios from 'axios'
import { getToken, removeToken } from '@/utils/cache/cacheToken'
import { removeEmptyParams } from './helper'
import router from '@/router'
import { Notification } from 'element-ui'

const CancelToken = axios.CancelToken

let axiosResultStatus = 1
let cancel

const service = axios.create({
  baseURL: '/api' /* window.globalConfig.api_url */,
  CancelToken: new CancelToken(function executor (c) {
    cancel = c
  })
})

service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers.token = getToken()
    }
    config.headers['Content-Type'] = 'application/json'

    removeEmptyParams(config)

    if (axiosResultStatus) {
      cancel()
    }

    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    // eslint-disable-next-line no-debugger
    debugger
    const code = response.data.code
    if (code === 200) {
      axiosResultStatus = 1
      return response.data
    } else {
      if (code === 404) {
        axiosResultStatus = 0
        router.push('/404')
      } else if (code === 401) {
        axiosResultStatus = 0
        removeToken()
        router.push('/login')
        location.reload()
      }
      Notification.error({
        title: response.data.msg,
        duration: 2500,
        offset: 50
      })
      return Promise.reject(response)
    }
  },
  error => {
    let code = 0
    try {
      code = error.data.status
    } catch (e) {
      if (error.toString().indexOf('Cancel') >= 0) {
        return Promise.reject(error)
      } else if (error.toString().indexOf('timeout') >= 0) {
        Notification.error({
          title: '请求超时',
          duration: 2500,
          offset: 50
        })
        return Promise.reject(error)
      }
    }

    if (code === 404) {
      axiosResultStatus = 0
      router.push('/404')
    } else if (code === 401) {
      axiosResultStatus = 0
      router.push('/login')
      location.reload()
    } else {
      Notification.error({
        title: error.response.data.msg || '系统错误！',
        duration: 2500,
        offset: 50
      })
    }
    return Promise.reject(error)
  }
)

export default service
