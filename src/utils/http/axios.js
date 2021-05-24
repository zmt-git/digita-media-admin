/*
 * @Description: axios封装，(拦截处理异常错误)
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-24 20:53:05
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-24 22:23:08
 */
import axios from 'axios'

const serve = axios.create({
  baseURL: ''
})

serve.interceptors.request.use(config => {

})

serve.interceptors.response.use(res => {

})

export default serve
