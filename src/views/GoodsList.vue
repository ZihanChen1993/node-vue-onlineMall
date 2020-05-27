<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span slot="bread">Goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price">
            Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short" />
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd>
                <a
                  href="javascript:void(0)"
                  :class="{'cur':priceChecked=='all'}"
                  @click="priceChecked=='all'"
                >All</a>
              </dd>
              <dd v-for="(price,index) in priceFilter" :key="index" @click="priceChecked= index">
                <a
                  href="javascript:void(0)"
                  v-bind:class="{'cur':priceChecked==index}"
                  @click="setPriceFilter(index)"
                >{{price.startPrice}} - {{price.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(good, index) in goodsList" :key="index">
                  <div class="pic">
                    <a href="#">
                      <img v-lazy="'/img/' + good.productImg" alt />
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{good.productName}}</div>
                    <div class="price">{{good.productPrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>

import 'assets/css/base.css'
import 'assets/css/login.css'
import 'assets/css/product.css'
import NavHeader from 'components/NavHeader'
import NavFooter from 'components/NavFooter'
import NavBread from 'components/NavBread'

export default {
  data() {
    return {
      msg: 'hello vue',
      goodsList: [],
      priceFilter: [
        {
          startPrice: '0.00',
          endPrice: '500.00'
        },
        {
          startPrice: '500.00',
          endPrice: '1000.00'
        },
        {
          startPrice: '1000.00',
          endPrice: '2000.00'
        },
      ],
      priceChecked: 'all',
      filterBy: false,
      overLayFlag: false
    }
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread,
  },
  mounted() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      this.axios.get("/goods").then((res) => {
        console.log(res);

        this.goodsList = res.data.result;
      })
    },
    showFilterPop() {
      this.filterBy = true;
      this.overLayFlag = true;
    },
    closePop() {
      this.filterBy = false;
      this.overLayFlag = false;
    },
    setPriceFilter(index) {
      this.priceChecked = index;
      this.closePop();
    }
  }
}
</script>
<style>
</style>