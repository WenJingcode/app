// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Header from './components/header/Header'
import Star from './components/star/Star'
import Icon from './components/icon/Icon'
import ShoppingCat from './components/shoppingCart/ShoppingCart'
import Add from './components/add&remove/Add&remove'
import Food from './components/food/Food'
import RatingSelect from './components/ratingSelect/RatingSelect'

Vue.config.productionTip = false
Vue.component('v-header',Header);
Vue.component('v-star',Star);
Vue.component('v-icon',Icon);
Vue.component('v-shoppingCart',ShoppingCat);
Vue.component('v-add',Add);
Vue.component('v-food',Food);
Vue.component('v-ratingSelect',RatingSelect);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
