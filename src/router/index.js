import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'commodity',
    component: () => import('@/views/commodity/Commodity.vue')
  },
  {
    path: '/business',
    name: 'business',
    component: () => import('@/views/commodity/Business.vue')
  },
  {
    path: '/commodity',
    name: 'commodity',
    component: () => import('@/views/commodity/Commodity.vue')
  },
  {
    path: '/evaluate',
    name: 'evaluate',
    component: () => import('@/views/commodity/Evaluate.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
