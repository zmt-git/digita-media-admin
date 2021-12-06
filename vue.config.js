/*
 * @Description: vue-cli 配置文件
 * @version: 1.0
 * @Author: ZMT
 * @Date: 2021-05-24 22:11:32
 * @LastEditors: ZMT
 * @LastEditTime: 2021-05-24 22:12:39
 */
const path = require('path')
const webpackBundleAnalyzer = require('webpack-bundle-analyzer')
module.exports = {
  // 基本路径
  publicPath: './',
  // outputDir: "dist", 构建时输出目录 默认dist
  // 放置静态资源目录
  assetsDir: 'static',
  productionSourceMap: false,
  // indexPath: "index.html", html输出路径 默认 index.html
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      }
    },
    plugins: [
      new webpackBundleAnalyzer.BundleAnalyzerPlugin()
    ]
  },

  chainWebpack (config) {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })

    config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: path.join(__dirname, 'src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')

          config.set('externals', {
            vue: 'Vue',
            vuex: 'Vuex',
            'vue-router': 'VueRouter',
            'element-ui': 'ELEMENT',
            axios: 'axios',
            'video.js': 'videojs'
          })
        }
      )
  }
}
