// 多入口读取解析

const path = require('path')
const glob = require('glob')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PAGE_PATH = path.resolve(__dirname, '../src/pages')

/**
 * 多入口配置
 * 读取 /src/pages 文件下的所有对应文件夹下的js*的后缀文件
 * 且当该文件夹存在时
 */
exports.getEntries = () => {
  let entryFiles = glob.sync(
    PAGE_PATH + '/*/*.js'
  )
  let map = {}
  entryFiles.forEach(filePath => {
    const filename = getFileName(filePath)
    map[filename] = filePath
  })
  return map
}


/**
 * 多模版配置
 * 读取对应目录下的 html模版文件, 并且通过 HtmlWebpackPlugin进行配置
 * 返回一个数组实例
 * configs 内部的 webpack 配置
 */

exports.htmlPlugin = configs => {
  let entryHtml = glob.sync(
    PAGE_PATH + '/*/*.html'
  )
  let htmlResult = []

  entryHtml.forEach(filePath => {
    let filename = getFileName(filePath)
    let conf = {
      template: filePath,
      filename: filename + '.html',
      chunks: ['manifest', 'vendor', filename],
      inject: true
    }
    if (configs) {
      conf = merge(conf, configs)
    }
    // 如果为生产环境, 对 html文件压缩去空白
    if (process.env.NODE_ENV === 'production') {
      conf = merge(conf, {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
        },
        chunksSortMode: 'manual'
      })
    }
    htmlResult.push(new HtmlWebpackPlugin(conf))
  })
  return htmlResult
}

function getFileName(path) {
  return path.substring(path.lastIndexOf('\/') + 1, path.lastIndexOf('.'))
}


/**
 * pages 多页配置
 */

 exports.setPages = configs => {
   let entryFiles = glob.sync(PAGE_PATH + '/*/*.js')
   let map = {}
   entryFiles.forEach(filePath => {
     let filename = getFileName(filePath)
     let tem = filePath.substring(0, filePath.lastIndexOf('\/'))
     
     let conf = {
       // 入口文件
       entry: filePath,
       // 模版文件
       template: tem + '.html',
       // dist/${filename}.html
       filename: filename + '.html',
       // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
       chunks: ['manifest', 'vendor', filename], 
       inject: true
     }
     
     if (configs) {
        conf = merge(conf, configs)
     }

     // production 优化html结构
     if (process.env.NODE_ENV === 'production') {
        conf = merge(conf, {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
          },
          chunksSortMode: 'manual'
        })
     }

     map[filename] = conf
   })
   return map
 }