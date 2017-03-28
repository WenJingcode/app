<template>
<div class="shoppingCat">
    <div class="leftCart">
        <div class="logoWrap">
            <div class="red">{{amount}}</div>
            <div class="iconWrap" :class="{overCart:over}">
                <i class="icon-shopping_cart"></i>
            </div>
        </div>
        <div class="cartPrice">
            <span>￥{{cny}}</span>
        </div>
        <div class="sendPrice">
            <span>另需配送费￥4元</span>
        </div>
    </div>
    <div class="rightCart" :class="{green:over}">
        <span v-show="see">￥20起送</span>
        <!--未达到起送价-->
        <span v-show="seen">还差￥{{last}}元起送</span>
        <!--已达到起送价-->
        <span v-show="sow">去结算</span>
    </div>
</div>
</template>
<script>
 export default{
     name:'shoppingCart',
     data(){
         return{
             amount:2,
             cny:15,
             last:4,
             see:true,
             seen:false,
             sow:false
         }
     },
     computed:{
         over(){
//             未达到起送费
             if(this.cny>0 && this.cny<20){
                 this.see=false;
                 this.seen=true;
                 this.sow=false;
                 return true;
             }else if(this.cny>=20){
                 this.see=false;
                 this.seen=false;
                 this.sow=true;
                 return true;
             }else{
                 this.see=true;
                 this.seen=false;
                 this.sow=false;
                 return false;
             }
         }
     }
 }
</script>
<style scoped>
/*购物车*/
.shoppingCat{
    width: 100%;
    height: 48px;
    background-color: #08121c;
    position: fixed;
    bottom:0;
    left: 0;
    display: flex;
}
.leftCart{
    flex: 1;
    height: 100%;
    position: relative;
}
.logoWrap{
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: #141d27;
    margin: 0 12px 8px 18px;
    position:relative ;
    top:-10px;
    padding: 6px;
    box-sizing:border-box;
    display: inline-block;
}
.red{
    width:24px ;
    font-size: 9px;
    font-weight: 700;
    color: rgb(255,255,255);
    line-height: 16px;
    text-align: center;
    border-radius: 12px;
    background-color:rgb(240,20,20);
    box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.4);
    position: absolute;
    top: 0;
    right: 0;
}
.logoWrap  .overCart{
    background-color: #00a0dc;
    color: #ffffff;
}
.iconWrap{
    width: 44px;
    height: 44px;
    border-radius: 50%;
    font-size: 24px;
    color:rgba(255,255,255,0.4);
    line-height: 44px;
    text-align: center;
    background-color: rgba(0,0,0,0.2);
}
.cartPrice {
    width: 16px;
    height: 24px;
    display: inline-block;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.4);
    font-weight: 700;
    line-height: 24px;
    padding-right: 24px;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    vertical-align: top;
    margin-top: 12px;
}
.sendPrice{
    display: inline-block;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.4);
    line-height: 24px;
    vertical-align: top;
    margin-top: 12px;
}
.rightCart{
    flex: 0 0 105px;
    width: 105px;
    height: 100%;
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    font-weight: 700;
    line-height: 24px;
    display: flex;
    align-items: center;
    background-color:#2b333b;
}
.shoppingCat .green{
    background-color: #00b43c;
}
.rightCart span{
    display: inline-block;
    width: 89px;
    margin: 0 8px;
    text-align: center;
}
</style>