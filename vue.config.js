const path = require('path')
const merge = require('webpack-merge')
const { getEntries, htmlPlugin, setPages } = require('./build/utils')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const baseUrl = '/'

const isProd = process.env.NODE_ENV === 'production'

const resolve = dir => path.join(__dirname, dir)

module.exports = {
  baseUrl: '/',

  configureWebpack: conf => {
    conf.entry = getEntries()

    const pluginsOptions = []

    // 在生产环境下开启Gzip压缩
    const compressConfig = {
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(js|css)$'
      ),
      threshold: 10240,
      minRatio: 0.7
    }
    if (isProd) {
      pluginsOptions.push(new CompressionWebpackPlugin(compressConfig))
    }

    // 返回 plugins 进行merge合并
    return {
      plugins: [
        ...pluginsOptions,
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

  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
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