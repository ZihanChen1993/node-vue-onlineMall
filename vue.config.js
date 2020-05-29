module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views',
      }
    }
  },
  devServer: {
    port: 8080,
    proxy: {
      '/apis': {
        target: 'http://localhost:3000/', // 对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/apis': '',
        },
      },
    },
  },
}