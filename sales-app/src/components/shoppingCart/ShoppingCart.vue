<template>
<div>
    <div class="shoppingCartWrap">
        <div class="shoppingCat">
            <div class="leftCart">
                <div class="logoWrap" @click="slideList" >
                    <div class="red" v-show="amount>0">{{amount}}</div>
                    <div class="iconWrap" :class="{cartBuy:amount>0}">
                        <i class="icon-shopping_cart"></i>
                    </div>
                </div>
                <!--价钱-->
                <div class="cartPrice">
                    <span>￥{{totalPrice}}</span>
                </div>
                <div class="sendPrice">
                    <span>另需配送费￥{{sendPrice}}元</span>
                </div>
            </div>
            <div class="rightCart" :class="{green:this.totalPrice-this.minPrice>=0}">
                <span class="pay" :class="{payClass:totalPrice-minPrice >=0}">{{payText}}</span>
            </div>
        </div>
        <div class="shoppingList" v-show="listShow">
            <div class="detailHeader">
                <span class="gwc">购物车</span>
                <span class="emptyCart" @click="cartEmpty">清空</span>
            </div>
            <div class="detailList" id="detailList">
                <ul>
                    <li v-for="sFoods in selectedFoods" >
                        <div class="detailName">
                            <span>{{sFoods.name}}</span>
                        </div>
                        <div class="detailInfo">
                            <span class="detailPrice"><span class="dollar">￥</span>{{sFoods.price}}</span>
                            <v-add :food="sFoods" class="detailAdd"></v-add>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="maskWrap" v-show="listShow"></div>
</div>
</template>
<script>
import BScroll from 'better-scroll'
 export default{
     name:'shoppingCart',
     props: {//从父组件获得的数据
        selectedFoods:{
            type:Array,
            default(){
                return [];
            }
        },
        sendPrice:{
            type:Number,
            default:0
        },
         minPrice:{
             type:Number,
             default:0
         }
     },
     data(){
         return{
            fold:true
         }
     },
     computed:{
         amount(){
             let count = 0;
             this.selectedFoods.forEach((food)=>{
                count+=food.count;
             });
             return count;
         },
         totalPrice(){
             let total=0;
             this.selectedFoods.forEach((food)=>{
                 total+= food.price * food.count;
             });
             return total;
         },
         payText(){
             if(this.amount==0){
                 return '￥'+this.minPrice+'起送';
             }else if(this.totalPrice<this.minPrice){
                 let diff=this.minPrice-this.totalPrice;
                 return '还差￥'+diff+'元起送';
             }else{
                 return '去结算';
             }
         },
         listShow(){
             if(!this.amount){
                 this.fold=true;
                 return false;
             }
             let show =!this.fold;
             if(show){
                 this.$nextTick(function(){
                    if(!this.ListScroll){
                        this.ListScroll = new BScroll(document.getElementById("detailList"),{
                            click:true
                        });
                    }else{
                        this.ListScroll.refresh();
                    }
                 });
             }
             return show;
         }
     },
     methods:{
         slideList(){
             if(this.amount){
                 return;
             }
             this.fold=!this.fold;
         },
         cartEmpty(){
             this.selectedFoods.forEach((food)=>{
                food.count=0;
             });
         }
     }
 }
</script>
<style scoped>
    /*购物车详情*/
.shoppingList{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 257px;
    z-index: 20;
    overflow: hidden;
}
.detailHeader{
    width: 100%;
    height: 40px;
    background-color: #f3f5f7;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    display: flex;
    justify-content: space-between;
}
.gwc{
    font-size: 14px;
    font-weight: 200;
    color: rgb(7,17,27);
    line-height: 40px;
    margin-left: 18px;
}
.emptyCart{
    font-size: 12px;
    color: rgb(0,160,220);
    line-height: 40px;
    margin-right: 18px;
}
.detailList{
    width: 100%;
    height: 217px;
    padding: 0 18px;
    background-color: #FFFFFF;
}
.detailList ul{
    display: flex;
    flex-direction:column-reverse;
    height: auto;
}
.detailList li{
    width: 100%;
    height: 48px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    display: flex;
    justify-content: space-between;
}
.detailName,.detailInfo{
    display: inline-block;
}
.detailName{
    font-size: 14px;
    color: rgb(7,17,27);
    line-height: 48px;
    flex: 1;
    margin-left: 18px;
}
.detailInfo{
    flex: 0 0 118px;
    width: 118px;
    margin-right: 36px;
    position: relative;
}
.detailPrice,.detailAdd{
    display: inline-block;
}
.detailPrice{
    position: absolute;
    left: 0;
    font-size: 14px;
    font-weight:700;
    color: rgb(240,20,20);
    line-height: 48px;
}
.dollar{
    font-size: 10px;
    font-weight: normal;
}
.detailAdd{
    width: 72px;
    height: 48px;
    position: absolute;
    right: 0;
    color: rgb(7,17,27);
    display: flex;
    align-items: center;
}
.shoppingMask{

}
/*购物车遮罩*/
.maskWrap{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color:rgba(7,17,27,0.6);
    z-index:10;
}
/*购物车*/
.shoppingCat{
    width: 100%;
    height: 48px;
    background-color: #08121c;
    position: fixed;
    bottom:0;
    left: 0;
    display: flex;
    z-index: 30;
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
.logoWrap  .cartBuy{
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