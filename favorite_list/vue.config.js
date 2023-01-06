const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave:false,

  // 代理服务器
  devServer:{
    proxy:{
      '/api':{
        target: 'http://127.0.0.1:4523/m1/1451467-0-default/',
        // http://127.0.0.1:4523/m1/1451467-0-default/api/favoriteList/tagList/
        changeOrigin: true,
        // 路径重写
        // pathRewrite:{'api':''}
      },
      '/user':{
        target: 'http://localhost:8081/',
        changeOrigin: true
      }
    }
  }
})
