<template>
  <div class="evaluate">
    <div class="bscroll_box">
      <ul class="content">
        <!-- 评分服务态度 -->
        <div class="service">
          <!-- 评分 -->
          <div class="score">
            <h1>3.9</h1>
            <h3>综合评分</h3>
            <p>高于周边商家69.2%</p>
          </div>
          <div class="attitude">
            <p><span>服务态度</span><Rate show-text allow-half disabled v-model="valueCustomText1">
                    <span style="color: #f5a623">{{ valueCustomText1 }}</span>
                </Rate>
                </p>
            <p><span>服务态度</span><Rate show-text allow-half disabled v-model="valueCustomText2">
                    <span style="color: #f5a623">{{ valueCustomText2 }}</span>
                </Rate></p>
            <p>送达时间 44分钟</p>
          </div>
        </div>
        <!-- 评论消息 -->
        <div class="evaluateInfo">
          <p class="info-btn">
            <Button type="primary" class="btnInfo">全部57</Button>
            <Button type="info" class="btnInfo">满意47</Button>
            <Button class="btnInfo">不满意10</Button>
          </p>
          <p class="readMsg">
            <span><Icon type="ios-checkmark-circle-outline" />只看有内容的评价</span>
          </p>
          <!-- 评论区 -->
          <div class="eList" v-for="(item,i) in evaluateList" :key="i">
            <p class="avatarBox"><Avatar icon="ios-person" :src="item.avatar" class="avatar"/></p>
            <div class="EvaluateInfo">
              <div class="Info_box">
                <div>{{item.username}}</div>
                <div>{{item.rateTime | momentTime}}</div>
              </div>
              <p>
                <Rate v-model="item.score" disabled class="stars"/>
                <span v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
              </p>
              <p>{{item.text}}</p>
              <div class="recommendBox" v-show="item.recommend.length">
                <Icon type="ios-thumbs-up" class="recomIcon"/>
                <p class="recomInfo" v-for="j in item.recommend" :key="j">{{j}}</p>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import {ratings} from "@/api/index.js"
import Bscroll from 'better-scroll'
import moment from 'moment'

export default {
  data() {
    return {
      valueHalf1: 0,
      valueCustomText1: 3.8,
      valueHalf2: 2.5,
      valueCustomText2: 3.8,
      evaluateList:[]
    };
  },
  created(){
    ratings().then(data=>{
      this.evaluateList=data.data;
    })
  },
  mounted(){
    new Bscroll('.bscroll_box')
  },
  filters:{
    momentTime(val){
      if(val) return moment(val).format("YYYY-MM-DD hh:mm:ss")
    }
  }
};
</script>

<style lang="less" scoped>
.evaluate{
  height: 100%;
  background: #f3f6f6;
  .bscroll_box{
    height: 500px;
    overflow: auto;
  }
  /* 评分服务态度 */
  .service {
    display: flex;
    justify-content: space-around;
    background: #fff;
    border-bottom: 1px solid #ddd;
    /* 评分 */
    .score {
      text-align: center;
      h1{
        font-size: 32px;
        font-weight: normal;
        color:#fe9b00;
      }
      h3{
        font-weight: normal;
      }
      p{
        font-size: 11px;
        color:#aaa;
      }
    }
    .attitude{
      width: 230px;
    }
  }
  /* 评论消息 */
  .evaluateInfo{
    margin-top: 10px;
    background: #fff;
    border-top: 1px solid #ddd;
    padding: 0 10px 0 0;
    .info-btn{
      padding: 20px;
      border-bottom: 1px solid #ddd;
      .btnInfo{
        margin-right: 10px;
      }
    }
    .readMsg{
      padding: 15px;
      border-bottom:1px solid #ddd; 
    }
    .eList{
      display: flex;
      border-bottom: 1px solid #ddd;
      padding: 15px 0;
      .avatarBox{
        width: 50px;
        margin:0 5px 0 15px;
      }
      .EvaluateInfo{
        width: 100%;
        .Info_box{
          display: flex;
          padding: 0 5px;
          justify-content: space-between;
          }
        .stars{
          font-size: 12px;
        }
      }
      .recommendBox{
        display: flex;
        .recomIcon{
          color: #00A0DC;
        }
        .recomInfo{
          margin-left:5px; 
          width: 50px;
          font-size: 11px;
          text-align: center;
          border-radius: 10px;
          border:1px solid #ddd;
          text-overflow: ellipsis;
          white-space:nowrap;
          overflow: hidden;
        }
      }
    }
  }
}
</style>