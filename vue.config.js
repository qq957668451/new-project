const path = require('path');
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/common/global.less')
      ]
    }
  },
  // 关闭eslint
  lintOnSave: false,
  devServer: {
    // 配置端口号
    port: 8888,
  },
}