const path = require('path')
const merge = require('webpack-merge')
const { getEntries, htmlPlugin, setPages } = require('./build/utils')
const baseUrl = '/'

htmlPlugin()
// getEntries()
module.exports = {
  baseUrl: '/',

  configureWebpack: conf => {
    conf.entry = getEntries()

    // 返回 plugins 进行merge合并
    return {
      plugins: [
        ...htmlPlugin({
          // 自定义配置
          // htmlWebpackPlugin.options 获取自定义配置对象并输出
          addScript() {
            if (process.env.NODE_ENV !== 'production') {
              return `<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>`
            }
          }
        })
      ]
    }
  },

  devServer: {
    historyApiFallback: {
      // 服务器路由重定向
      rewrites: [
        {
          from: new RegExp(baseUrl + 'page1'),
          to: baseUrl + 'page1.html'
        },
        {
          from: new RegExp(baseUrl + 'page2'),
          to: baseUrl + 'page2.html'
        },
        {
          from: new RegExp(baseUrl + 'page3'),
          to: baseUrl + 'page3.html'
        },
      ]
    }
  }
}