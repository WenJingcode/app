<template>
  <div id="app">
    <v-header></v-header>
    <ul class="listApp">
      <li><router-link to="/goods">商品</router-link></li>
      <li><router-link to="/rating">评价</router-link></li>
      <li><router-link to="/seller">商家</router-link></li>
    </ul>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: 'app'
}
</script>

<style>

.listApp{
  width: 100%;
  height: 40px;
  border-bottom:1px solid  rgba(7,17,27,0.1);
  display: flex;
  justify-content: space-around;
}
 .listApp li a{
    font-size: 14px;
    color: rgb(77,85,93);
    line-height: 40px;
  }
   .router-link-active{
    color:rgb(240,20,20);
  }
</style>
