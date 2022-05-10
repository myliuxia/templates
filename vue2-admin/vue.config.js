const { resolve } = require('path')

function createPlugin() {
  return []
}

module.exports = {
  css: {
    loaderOptions: {
      // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true,
      },
    },
  },
  publicPath: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ? './' : '/',
  lintOnSave: true,
  productionSourceMap: false,
  configureWebpack: {
    devtool: 'source-map', // 需要调试则的打开注释
    output: {
      jsonpFunction: 'j',
    },
    plugins: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ? createPlugin() : [],
    entry: {
      app: resolve('src/main.js'),
    },
  },
}
