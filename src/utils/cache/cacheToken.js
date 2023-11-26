/*
 * @Description: token cache
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-24 20:47:42
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-24 21:02:46
 */

const TOKEN_KEY = 'DigitalMediaManager'

/**
 * @Description 设置token
 * @param {String} token
 */
export function setToken (token) {
  localStorage.setItem(TOKEN_KEY, token)
}

/**
 * @Description 获取token
 * @return {String}
 */
export function getToken () {
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * @Description 删除 token
 */
export function removeToken () {
  localStorage.removeItem(TOKEN_KEY)
}
