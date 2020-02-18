/* 引入axios */
import axios from 'axios'

/* 创建axios工程化实例 */
const axiosInstance=axios.create({
  //配置项名称：配置项值
  //定义axios的全局请求地址
  // baseURL:'http://192.168.43.176:3000',
  // baseURL:'http://127.0.0.1:3000',
  baseURL:'http://172.16.14.217:3000',

 
  timeout:10000 //请求超时
})

export default axiosInstance;