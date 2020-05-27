const goods = require('./mock/goods.json');
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
    open: true, // 配置自动启动浏览器
    host: 'localhost',
    port: '8080',
    before(app) {
      app.get('/goods', (req, res) => {
        res.json(goods)
      })
    },
  }
}