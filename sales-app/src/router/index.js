import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Goods from '../components/goods/Goods'
import Rating from '../components/rating/Rating'
import Seller from '../components/seller/Seller'

Vue.use(Router)
Vue.use(Resource)

export default new Router({
  routes: [
      {path: '/goods',component: Goods},
      {path: '/rating',component: Rating},
      {path: '/seller',component: Seller},
      {path:'*',redirect:'/goods'}
  ]
})
