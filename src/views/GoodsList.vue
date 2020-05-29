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
          <a href="javascript:void(0)" class="price" @click="sortGoods">
            Price
            <svg class="icon icon-arrow-short" v-bind:class="{'set-up': sortFlag}">
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
                      <img v-lazy="'/img/' + good.productImage" alt />
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{good.productName}}</div>
                    <div class="price">{{good.salePrice}}</div>
                    <div class="btn-area">
                      <a
                        href="javascript:;"
                        class="btn btn--m"
                        @click="addCart(good.productId)"
                      >加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div
                class="load-more"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="busy"
                infinite-scroll-distance="20"
              >
                <img src="/loading-svg/loading-cubes.svg" v-show="loading" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    </div>
    <modal :mdShow="mdShow" @closeModal="closeModal">
      <p slot="message">请先登录，否则无法加入到购物车中</p>
      <div slot="btnGroup">
        <a class="btn btn--m" @click="closeModal">关闭</a>
      </div>
    </modal>
    <modal :mdShow="mdShowCart" @closeModal="closeModal">
      <p slot="message">
        <span>加入购物成功</span>
        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok" />
        </svg>
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" @click="closeModal">继续购物</a>
        <router-link class="btn btn--m" href="javascript:;" to="/cart">查看购物车</router-link>
      </div>
    </modal>
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
import Modal from 'components/Modal'

export default {
  data() {
    return {
      msg: 'hello vue',
      sortFlag: true,
      page: 1,
      pageSize: 8,
      goodsList: [],
      busy: false,
      loading: false,
      mdShow: false,
      mdShowCart: false,
      priceFilter: [
        {
          startPrice: '0.00',
          endPrice: '100.00'
        },
        {
          startPrice: '100.00',
          endPrice: '500.00'
        },
        {
          startPrice: '500.00',
          endPrice: '1000.00'
        },
        {
          startPrice: '1000.00',
          endPrice: '5000.00'
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
    Modal,
  },
  mounted() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList(flag) {
      let param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1,
        priceLevel: this.priceChecked
      }
      // 将加载图片在数据请求前显示
      this.loading = true;
      this.axios.get("/apis/goods/list", {
        params: param,
      }).then((res) => {
        // 请求结束后，将加载图标隐藏
        this.loading = false;
        let status = res.data.status;
        if (status == "0") {
          if (flag) {
            // 需要累积
            this.goodsList = this.goodsList.concat(res.data.result.list);
            if (res.data.result.count == 0) {
              // 达到最后一条
              //禁用滚动
              this.busy = true;
            } else {
              this.busy = false;
            }
          } else {
            //重新积累
            this.goodsList = res.data.result.list;
            this.busy = true;
          }
        } else {
          this.goodsList = [];
        }
      })
    },
    sortGoods() {
      console.log('sort');
      this.sortFlag = !this.sortFlag;
      this.page = 1;
      this.getGoodsList();
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
      this.page = 1;
      this.getGoodsList();
    },
    loadMore() {
      console.log('load more!');
      this.busy = true;
      setTimeout(() => {
        this.page++;
        this.getGoodsList(true);
        this.busy = false;
      }, 2000);
    },
    addCart(productId) {
      this.axios.post("/apis/goods/addCart", {
        productId: productId
      }).then((res) => {
        if (res.data.status == 0) {
          this.mdShowCart = true;
        } else {
          this.mdShow = true;
        }
      })
    },
    closeModal() {
      this.mdShow = false;
      this.mdShowCart = false;
    }
  }
}
</script>
<style scoped>
.load-more {
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.set-up {
  transform: rotate(180deg);
  transition: all 0.3s ease-out;
}
.icon-arrow-short {
  transition: all 0.3s ease-out;
}

.btn:hover {
  background-color: #ff1516;
  color: #fff;
  transition: all 0.3s ease-out;
}
</style>>

