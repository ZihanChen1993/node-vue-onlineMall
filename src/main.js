import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'


Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueLazyLoad, {
  loading:"/loading-svg/loading-bubbles.svg"
})
Vue.use(infiniteScroll)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
