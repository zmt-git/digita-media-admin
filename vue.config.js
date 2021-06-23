/*
 * @Description: vue-cli 配置文件
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-24 22:11:32
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-24 22:12:39
 */
const path = require('path')

module.exports = {
  // 基本路径
  publicPath: './',
  // outputDir: "dist", 构建时输出目录 默认dist
  // 放置静态资源目录
  assetsDir: 'static',
  // indexPath: "index.html", html输出路径 默认 index.html
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      }
    }
  }
}
