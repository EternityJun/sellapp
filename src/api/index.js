/* 引入request文件 */
import $http from "@/utils/request.js"
// import qs from "qs"

/* 商家详情 */
export const business=(data)=>{
  return $http.get('/api/seller',{
    params:data
  }).then(data=>data.data)
}
/* 商品列表 */
export const goods=(data)=>{
  return $http.get('/api/goods',{
    params:data
  }).then(data=>data.data)
}
/* 评论列表 */
export const ratings=(data)=>{
  return $http.get('/api/ratings',{
    params:data
  }).then(data=>data.data)
}

