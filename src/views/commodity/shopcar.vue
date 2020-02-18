<template>
  <div class="shopcarBox">
    <p class="info">还差<span>5元</span>就能起送  <Button class="CDbtn" type="error" size="small">去凑单</Button></p>
    <p class="shopcarTitle"><span><Icon class="pretendIcon" type="md-radio-button-on" />装入口袋1（包装费￥<strong>2.6</strong>）</span><span><Icon type="ios-trash-outline" />清空购物车</span></p>
      <div v-for="(item,i) in getshopcarList" :key="i">
        <div class="memuList">
          <div class="image"><img :src="item.image" alt=""></div>
          <div class="name">{{item.name}}</div>
          <div class="memuList-money">￥{{item.price*item.count}}</div>
          <div class="operationbox">
            <div class="operation subCount" @click="clickChangeCount(-1,item.name)"><span>-</span></div>
            <span class="counts">{{item.count}}</span>
            <div class="operation addCount" @click="clickChangeCount(1,item.name)"><span>+</span></div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    methods:{
     clickChangeCount(count,name){
       this.$store.commit('addCountClick',{count,name})
     }
    },
    computed:{
      getshopcarList(){
        return this.$store.getters.getshopcarList;
      }
    }
  }
</script>

<style lang="less" scoped>
.shopcarBox{
  border-radius: 20px 20px;
  .CDbtn{
      height: 18px;
      padding: 0 3px;
      font-size: 11px;
      border-radius: 5px;
  }
  .info{
    background: #FFF1D0;
    padding: 4px;
    text-align: center;
    border-radius: 20px 20px 0 0;
    font-size: 12px;
    span{
      color: red;
    }
  }
  .shopcarTitle{
    display: flex;
    justify-content: space-between;
    background: #F4F4F4;
    padding: 4px 8px;
    span{
      color: #6D6D6D;
      font-size: 12px;
    }
    .pretendIcon{
      color: rgb(255, 235, 188);
      font-size: 14px;
    }
    strong{
      color: red;
      font-weight: normal;
    }
  }
  .memuList{
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    border-bottom:1px solid #ddd;
    .image{
      img{
        width: 60px;
      }
    }
    .name{
      width: 60px;
    }
    .memuList-money{
      color:red;
    }
    .operationbox{
      width: 60px;
      display: flex;
      .operation{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        text-align: center;
        font-size: 12px;
      }
      .counts{
        display: inline-block;
        width: 16px;
        text-align: center;
      }
      .subCount{
        color: #aaa;
        border: 1px solid #aaa;
      }
      .addCount{
        color: rgb(131, 131, 131);
        border: 1px solid #aaa;
        background: #55585A;
      }
    }
  }
}
</style>