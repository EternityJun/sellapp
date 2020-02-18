import Vue from 'vue'
import Vuex from 'vuex'

import {goods} from "@/api/"
Vue.use(Vuex)

//1.创建store仓库 vuex把所有交互数据存放在store中
var store=new Vuex.Store({
  //设置要交互的数据
  state:{
    contMemu:[],
    shopcarshow:false
  },
  //改变值只能使用mutation去操作自己的state
  //（不支持任何异步代码，所有请求都不能在此次发送）
  mutations:{
    initContMemu(state,val){
      state.contMemu=val
    },
    //改变商品的数量
    addCountClick(state,data){
      for(let obj of state.contMemu){
        for(let food of obj.foods){
          if(food.name==data.name){
            food.count+=data.count
            return;
          }
        }
      }
    },
    shopcarStatu(state){
      state.shopcarshow=true
    }
  },
  //可以发出请求通知
  actions:{
    initContMemu(context){
      //发送异步请求，拿到数据交给mutations
      goods().then(res=>{
        //前端自己添加必要字段
        for(let obj of res.data){
          for(let food of obj.foods){
            food.count=0
          }
        }
        context.commit('initContMemu',res.data)
      })
    }
  },
  //获取者 计算属性：它就是vuex版的计算属性
  getters:{
    //获取购物车的列表
    getshopcarList(state){
      let arr=[];

      for(let obj of state.contMemu){
        for(let food of obj.foods){
          if(food.count>0){
            arr.push(food)
          }
        }
      }
      return arr;
    },
    /* 总价格处理数据 */
    getshopcarCount(state){
      let totalPrace=0;
      for(let obj of state.contMemu){
        for(let food of obj.foods){
          if(food.count>0){
            totalPrace+=food.count*food.price;
          }
        }
      }
      return totalPrace;
    },
  }


})

export default store;