import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'


Vue.use(Vuex);
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueLazyLoad, {
  loading:"/loading-svg/loading-bubbles.svg"
})
Vue.use(infiniteScroll)

const store = new Vuex.Store({
  state: {
    nickName: '',
    cartCount: 0,
  },
  mutations: {
    updateUserInfo(state, nickName) {
      state.nickName = nickName;
    },
    updateCartCount(state,cartCount) {
      state.cartCount += cartCount;
    },
    initCartCount(state,cartCount) {
      state.cartCount = cartCount;
    }
  } 
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
