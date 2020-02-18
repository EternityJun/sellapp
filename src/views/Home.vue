<template>
    <!-- 首页 -->
  <div class="home">
    <div class="mask" v-show="mask" @click="maskClick"></div>
    <!-- header -->
    <div class="header">
      <!-- 头像部分 -->
      <div class="header-info">
         <Avatar :src="headerInfo.avatar" shape="square" icon="ios-person" size="70" />
         <div class="info-title">
           <p class="ti-p1"><img :src="src" alt="" class="tit-img">{{headerInfo.name}}</p>
           <p>{{headerInfo.description}}/{{headerInfo.deliveryTime}}分钟送达</p>
           <p><img :src="src2" alt="" class="tit-descr"><span v-if="headerInfo.supports">{{headerInfo.supports[0].description}}</span></p>
         </div>
         <a href="#">{{some}}个 ></a>
      </div>
      <!-- 横条广告 -->
      <div class="header-banner">
        <img :src="src3" alt="" class="banner-img">
        {{headerInfo.bulletin}}
      </div>
    </div>
    <!-- 主体部分 -->
    <div class="main">
      <div class="nav">
        <router-link to="/commodity" :class="{selected:curSelectedLab==0}"><span @click="clickTitle(0)">商品</span></router-link>
        <router-link to="/evaluate" :class="{selected:curSelectedLab==1}"><span @click="clickTitle(1)">评价</span></router-link>
        <router-link to="/business" :class="{selected:curSelectedLab==2}"><span @click="clickTitle(2)">商家</span></router-link>
      </div>
      <!-- 路由出口 -->
      <div>
        <router-view></router-view> 
      </div>
      
    </div>
    <!-- 底部部分 -->
    <div class="footer">
      <!-- 左边购物车图标 -->
      <div class="shopcarIcon" @click="shopcarshowBtn">
        <span><Icon class="shopicon" type="md-cart" size="40"/></span> 
      </div>
      <div> ￥{{getshopcarCount}} </div>
      <div> 另需配送费￥{{money.delivery}}元</div>
      <Button class="placeOrder">￥{{money.start}}起送</Button>
    </div>
    <!-- 购物车 -->
    <transition name="slide-fade">
      <div class="shopcar" v-show="shopcarshow">
        <shopcar/>
      </div>
    </transition>
  </div>
</template>

<script>
import brand from "@/assets/images/brand@2x.png";
import decrease from "@/assets/images/decrease_1@2x.png";
import bulletin from "@/assets/images/bulletin@2x.png";

import shopcar from "./commodity/shopcar"
import {business} from "@/api/index.js"
export default {
  data() {
    return {
      curSelectedLab: 0, //当前选中选项卡的序号
      some: 5,
      src: brand,
      src2: decrease,
      src3: bulletin,
      /* 头部数据 */
      headerInfo: [{}],
      money: {
        totalPrice: 10,
        delivery: 4,
        start: 20
      },
      shopcarshow:false,
      mask:false
    };
  },
  created(){
    //一进入页面，立即初始化vuex的表数据
      this.$store.dispatch('initContMemu')

    /* 请求数据 */
    business(this.headerInfo).then(data=>{
      this.headerInfo=data.data
    })
  },
  methods: {
    clickTitle(val) {
      this.curSelectedLab = val;
    },
    shopcarshowBtn(){
      this.shopcarshow=!this.shopcarshow;
      this.mask=!this.mask;
    },
    maskClick(){
      this.mask=!this.mask;
      this.shopcarshow=!this.shopcarshow;
    }
  },
  components:{
    shopcar
  },
  computed:{
    getshopcarCount(){
      return this.$store.getters.getshopcarCount;
    },
  }
};
</script>
<style lang="less" scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .6s ease;
}
.slide-fade-leave-active {
  transition: all .6s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(50px);
  opacity: 0;
}
.home {
  display: flex;
  flex-direction: column;
  .mask{
    width: 100%;
    height: 800px;
    position: fixed;
    background:rgba(0, 0, 0, 0.5);
    z-index: 99999;
  }
  /* 头部部分 */
  .header {
    width: 100%;
    background: #55585a;
    display: flex;
    flex-direction: column;
    .header-info {
      padding: 24px;
      display: flex;
      position: relative;
      color: #fff;
      .info-title {
        margin: 0 10px;
        .ti-p1 {
          font-size: 18px;
          .tit-img {
            width: 30px;
            position: relative;
            top: 3px;
            margin-right: 5px;
          }
        }
        .tit-descr {
          width: 20px;
          position: relative;
          top: 3px;
        }
      }
      a {
        position: absolute;
        right: 10px;
        bottom: 20px;
        width: 50px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-radius: 50px;
        background: #454c4f;
        color: #fff;
      }
    }
    /*广告条  */
    .header-banner {
      background: #454c4f;
      color: #fff;
      padding: 5px;
      //文本超出部分3个点结尾
      text-overflow: ellipsis;
      white-space:nowrap;
      overflow: hidden;
      .banner-img {
        width: 30px;
        position: relative;
        top: 2px;
      }
    }
  }
  /* 主体 */
  .main {
    flex-grow: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    .nav {
      padding: 15px;
      display: flex;
      justify-content: space-around;
      border-bottom:1px solid #ddd;
      .selected {
        color: red;
      }
      a {
        color: #2a343c;
      }
    }
  }
  /* 底部 */
  .footer {
    width: 100%;
    height: 55px;
    position: fixed;
    bottom: 10px;
    border-radius:30px 30px; 
    display: flex;
    justify-content: space-between;
    background: #131d27;
    padding-top: 20px;
    z-index: 9999999;
    .shopcarIcon {
      width: 66px;
      height: 50px;
      border-radius: 50%;
      position: relative;
      top: -30px;
      left: 20px;
      background: #131d27;
      span {
        width: 50px;
        height: 50px;
        display: inline-block;
        border-radius: 50%;
        background: #2a343c;
        position: relative;
        top: 10px;
        left: 9px;
        .shopicon {
          text-indent: 5px;
          line-height: 50px;
        }
      }
    }
    .placeOrder {
      background: #2a353a;
      border: 0;
      position: relative;
      top: -20px;
      right: 0px;
      height: 55px;
      border-radius:0 30px 30px 0;
      
    }
  }
  /* 购物车 */
  .shopcar{
    width: 100%;
    background: #fff;
    position: fixed;
    border-radius:20px 20px 0 0; 
    padding-bottom:65px; 
    bottom:0;
    z-index: 99999;
  }
}
</style>
