<template>
  <div>
    <!-- 商品 -->
    <div class="mealBox" >
        <div class="Bscroll-left">
          <!-- 左侧菜单 -->
          <ul class="content">
            <p :class="{aside:true,selected:curSelectedLab===i}" v-for="(item,i) in contMemu" :key="i" @click="contMemuClick(i)">{{item.name}}</p>
          </ul>
        </div>
          <!--右边菜单数据  -->
        <div class="Bscroll-cont">
          <ul class="content">
            <div :id="i" class="cont-memu" v-for="(its,i) in contMemu" :key="its.name">
              <h4>{{its.name}}</h4>
              <div class="cont-product"  v-for="it in its.foods" :key="it.name">
                <img :src="it.image" class="cont-img">
                <div class="pro-info">
                  <h3>{{it.name}}</h3>
                  <p>{{it.description}}</p>
                  <p><span>月售{{it.sellCount}}份</span>
                  &emsp;&emsp;<span>好评率{{it.rating}}%</span></p>
                  <p><strong class="strongPrice">￥<span class="price">{{it.price}}</span></strong>
                  <strong><del>{{it.oldPrice=="" ? "":'￥'+it.oldPrice}}</del></strong> </p>
                </div>
                <div class="operationbox">
                  <div class="operation subCount" v-show="it.count>0" @click="addCountClick(-1,it.name)"><span>-</span></div>
                  <span class="counts"  v-show="it.count>0">{{it.count}}</span>
                  <div class="operation addCount" @click="addCountClick(1,it.name)"><span>+</span></div>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
  </div>
</template>
<script>
import Bscroll from 'better-scroll'
  export default {
    data(){
      return{
      curSelectedLab:0//当前默认选中
      }
    },
    mounted(){
     this.leftScroll=new Bscroll('.Bscroll-left',{
       click:true
     })
     this.rightScroll=new Bscroll('.Bscroll-cont',{
       click:true,
       probeType:3 //让BetterScroll实时派发滚动事件
     })
    //监听滚动事件，使用实例对象.on('事件名')
    //参数1：事件名 参数2：回调函数
    this.rightScroll.on('scroll',obj=>{
      let _y=Math.abs(obj.y)
      
      for(var i of this.getDivHeight){
        if(_y<i.max && _y>=i.min){
          this.curSelectedLab=i.index;
          break;
        }
      }
    })
    },
    methods:{
      contMemuClick(i){
        this.curSelectedLab=i;
        //让右侧面板调用scrollToElementg滚动到指定元素上面
        this.rightScroll.scrollToElement(document.getElementById(i),2000)
      },
      addCountClick(count,name){
        
        this.$store.commit("addCountClick",{count,name})
      }
    },
    computed:{
      getDivHeight(){
        let arr=[]
        //计算高度
        for(var i=0;i<this.contMemu.length;i++){
          arr.push(document.getElementById(i).offsetHeight)
        }
        // 循环arr数组  转换为{max: ,min: ,index: }
        let totalHeight=0;
        let newArr=[]
        for(var j=0;j<arr.length;j++){

          newArr.push({max: arr[j] + totalHeight ,min: totalHeight,index: j})
          totalHeight+=arr[j]
        }

        return  newArr;
      },
      contMemu(){
        return this.$store.state.contMemu;
      }
    }
  }
</script>

<style lang="less" scoped>
  .selected{
    background: #fff;
  }
  .mealBox{
      display: flex;
      background: #f3f6f6;
      .Bscroll-left{
        width: 80px;
        height: 400px;
        overflow: auto;
        .aside{
          height: 60px;
          padding: 0 8px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #ddd;
        }
      }
      /* 右边菜单数据 */
      .Bscroll-cont{
        flex: 1;
        height: 500px;
        overflow: auto;
        .cont-memu{
          padding-top: 10px;
          h4{
            text-indent: 10px;
            font-size: 14px;
          }
          .cont-product{
            display: flex;
            background: #fff;
            padding: 5px 10px;
            .cont-img{
              width: 70px;
              height: 70px;
              border: 1px solid #ddd;
            }
            .pro-info{
              margin:0 10px;
              width: 130px;
              p{
                font-size: 12px;
                .strongPrice{
                  margin-right:15px;
                  color:red;
                  .price{
                    font-size: 14px;
                  }
                }
              }
            }
            .operationbox{
              width: 60px;
              display: flex;
              position: relative;
              .operation{
                width: 20px;
                height: 20px;
                border-radius: 50%;
                text-align: center;
                font-size: 12px;
                align-self: flex-end;
              }
              .counts{
                display: inline-block;
                width: 16px;
                text-align: center;
                align-self: flex-end;
              }
              .subCount{
                color: #aaa;
                border: 1px solid #aaa;
              }
              .addCount{
                position: absolute;
                right: 0;
                color: rgb(131, 131, 131);
                border: 1px solid #aaa;
                background: #55585A;
              }
            }
          }
          .addNumber{
            width: 50px;
            align-self: flex-end;
          }
        }
      }
    }
</style>