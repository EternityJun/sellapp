<template>
  <div class="BusinessBox">
    <div class="BscrollBus">
      <ul class="content">
        <div class="businessInfo">
            <!-- 店铺评分信息 -->
              <div class="busInfo-name">
                <p>
                  {{businessList.name}}<br>
                  <Rate v-model="businessList.score"  allow-half disabled/>
                  <span>月售{{businessList.sellCount}}单</span>
                </p>
                <p>
                  <Icon class="heart" type="md-heart"/><br>
                  <span>已收藏</span>
                </p>
              </div>
              <!-- 服务信息 -->
              <div class="serviceInfo">
                <p>
                  <span>起送价</span><br>
                  <span>20</span>元
                </p>
                <p class="startPrace">
                  <span>商家配送</span><br>
                  <span>4</span>元
                </p>
                <p>
                  <span>平均配送时间</span><br>
                  <span>29</span>分钟
                </p>
              </div>
              <!-- 公告和活动 -->
              <div class="notice">
                <h3>公告与活动</h3>
                <div class="notice-msg">
                  <p class="p1"> {{businessList.bulletin}}</p>
                  <p class="p2" v-for="(it,i) in businessList.supports" :key="i">
                    <img :src="decrease" alt="">
                    {{it.description}}
                  </p>
                </div>
              </div>
              <!-- 商家实景 -->
              <div class="realScenebox">
                <h3>商家实景</h3>          
                <div class="realScene">
                  <div  v-for="(pic,i) in businessList.pics" :key="i">
                    <img :src="pic" alt="">
                  </div>
                </div>
              </div>
              <!-- 商家信息 -->
              <div class="businessInfos">
                <h3>商家信息</h3>
                <p class="businessInfos-msg" v-for="(infos,i) in businessList.infos" :key="i">
                  {{infos}}
                </p>
              </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
  import Bscroll from 'better-scroll'
  import {business} from "@/api/index.js"

  import decrease from "@/assets/images/decrease_3@2x.png"

  export default {
    data(){
      return{
        businessList:[],
        decrease:decrease
      }
    },
    created(){
      business().then(data=>{
        this.businessList=data.data;
        console.log(data.data)
      })
    },
    mounted(){
      new Bscroll('.BscrollBus')
    }
  }
</script>

<style lang="less" scoped>
.BusinessBox{
  background: #F4F5F7;
  .BscrollBus{
    height: 400px;
    overflow: auto;
    .businessInfo{
      display: flex;
      flex-direction: column;
      .busInfo-name{
        display: flex;
        padding: 10px;
        background: #fff;
        justify-content: space-around;
        .heart{
          font-size: 20px;
          text-indent:10px;
          color: red;
        }
      }
      /* 服务信息 */
      .serviceInfo{
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: space-around;
        padding: 10px 0;
        margin-bottom:20px; 
        background: #fff;
        p{
          width: 100px;
          text-align: center;
        }
        .startPrace{
          padding: 0 15px;
          border-left: 1px solid #ddd;
          border-right: 1px solid #ddd;
        }
      }
      /* 公告和活动 */
      .notice{
        padding: 10px 0;
        background: #fff;
        margin-bottom: 30px;  
        border-top: 1px solid #ddd;      
        border-bottom: 1px solid #ddd;      
        h3{
          margin: 0 10px;
        }
        .notice-msg{
          padding: 0 20px;
          .p1{
            line-height: 30px;
            color: red;
          }
          .p2{
            padding: 10px 0;
            border-top: 1px solid #ddd;
          }
        }
  
      }
      /* 商家实景 */
      .realScenebox{
          padding:10px 15px ;
          background: #fff;
          margin-bottom:30px; 
          border-top: 1px solid #ddd;    
          border-bottom: 1px solid #ddd;      
        .realScene{
          display: flex;
          flex-direction: row;
          overflow-x: scroll;
          img{
            width: 100px;
            height: 75px;
          }
        }
      }
      /* 商家信息 */
      .businessInfos{
        background: #fff;
        padding: 10px 0;
        border-top: 1px solid #ddd;    
        border-bottom: 1px solid #ddd;  
        h3{
          margin: 0 10px;
        }
        .businessInfos-msg{
          margin: 0 20px;
          padding: 10px;
          border-top: 1px solid #ddd;
        }
      }
    }
  }
}

</style>