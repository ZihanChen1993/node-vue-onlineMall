import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from './../views/GoodsList'
import Cart from './../views/Cart'
import Address from './../views/Address'
import orderConfirm from './../views/OrderConfirm'
import orderSuccess from './../views/OrderSuccess'
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: GoodsList
  },
  {
    path: '/cart',
    component: Cart,
  },
  {
    path: '/address',
    component: Address
  },
  {
    path: '/orderConfirm',
    component: orderConfirm
  },
  {
    path: '/orderSuccess',
    component: orderSuccess
  },
],
})