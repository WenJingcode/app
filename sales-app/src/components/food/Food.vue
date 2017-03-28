<template>
<div class="foodPage" v-show="foodShow" id="foodPage">
    <transition enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
        <div >
            <div class="closePage" @click="closePage"><i class="icon-arrow_lift"></i></div>
            <div>
                <img  :src="food.image" width="100%" height="375" alt="">
            </div>
            <div class="foodDetail">
                <h4>{{food.name}}</h4>
                <div class="pageSale">
                    <span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <h5><span class="pageDollar">￥</span>{{food.price}}<span v-show="food.oldPrice" class="pageOldPrice">￥{{food.oldPrice}}</span></h5>
                <div class="pageShoppingCart" @click.stop="addShow($event)" v-show="(!food.count || food.count==0)">
                    <span>加入购物车</span>
                </div>
                <div class="addWrap">
                    <v-add :food="food"></v-add>
                </div>
            </div>
            <!--空白栏-->
            <div class="emptyPage" v-show="food.info"></div>
            <div class="foodShow" v-show="food.info">
                <h3>商品介绍</h3>
                <p>{{food.info}}</p>
            </div>
            <!--空白栏-->
            <div class="emptyPage"></div>
            <div class="foodRatingWrap">
                <div class="foodRating">
                    <h3>商品评价</h3>
                    <div class="ratingType">
                       <v-ratingSelect :ratingTypes="ratingTypes" :ratings="ratings" v-on:allRating="changeAll" v-on:upRating="changeUp" v-on:downRating="changeDown" v-on:toggleChange="toggleText"></v-ratingSelect>
                    </div>
                </div>
                <div class="ratingList">
                    <ul>
                        <li v-for="rating in fdR">
                            <div class="ratingInfo">
                                <span>{{rating.rateTime}}</span>
                                <div class="shopInfo">
                                    <span>{{rating.username}}</span>
                                    <img :src="rating.avatar" alt="">
                                </div>
                            </div>
                            <div class="ratingCon">
                                <i class="icon-thumb_up upBlue" v-show="rating.rateType==0"></i>
                                <i class="icon-thumb_down" v-show="rating.rateType==1"></i>
                                <span>{{rating.text}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </transition>
</div>
</template>
<script>
    import Vue from 'vue'
    import BScroll from 'better-scroll'
    export default{
        name: 'food',
        data(){
            return {
                foodShow:false,
                ratingTypes:{
                    all:'全部',
                    up:'推荐',
                    down:'吐槽'
                },
                fdR:[]

            }
        },
        props:{
            food:{
                type:Object,
                default(){
                    return {

                    }
                }
            }
        },
        methods: {
            showFoodDetail(){
                this.foodShow = true;
                if(this.foodShow){
                    this.$nextTick(function () {
                        this.foodScroll = new BScroll(document.getElementById("foodPage"), {
                            click: true
                        });
                        this.fdR=this.food.ratings;
                    });
                }
            },
            closePage(){
                this.foodShow = false;
            },
            addShow(event){
                if(!event._constructed){
                    return;
                }
                Vue.set(this.food,'count',+1);
            },
            changeAll(){
                this.fdR=this.food.ratings;
            },
            changeUp(){
                this.fdR=this.upRatings;
            },
            changeDown(){
                this.fdR=this.downRatings;
            },
            toggleText(){
                this.fdR=this.ratingText;

            }
        },
        computed:{
            ratings(){
                return this.food.ratings;
            },
            upRatings(){
                let upRatings=[];
                this.ratings.forEach((rating)=>{
                    if(rating.rateType==0){
                        upRatings.push(rating);
                    }
                });
                return upRatings;
            },
            downRatings(){
                let downRatings=[];
                this.ratings.forEach((rating)=>{
                    if(rating.rateType==1){
                        downRatings.push(rating);
                    }
                });
                return downRatings;
            },
            ratingText(){
                let ratingText=[];
                this.ratings.forEach((rating)=>{
                    if(rating.rateType==1){
                        ratingText.push(rating);
                    }
                });
                return ratingText;
            }
        }
    }
</script>
<style scoped>
.foodPage{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 5;
    padding-bottom: 48px;
}
#foodPage{
    height: 100%;

}
/*关闭*/
.closePage{
    position: fixed;
    top:2px;
    left: 2px;
    width:26px ;
    height: 26px;
    border-radius: 50%;
    background-color: rgba(0,0,0,0.2);
    z-index: 6;
}
.closePage i{
    display: inline-block;
    font-size: 18px;
    color:#fff;
    line-height: 26px;
    text-align: center;
}
/*食物信息*/
.foodDetail{
    width: 100%;
    padding: 18px 18px;
    box-sizing: border-box;
    position: relative;
}
.foodDetail h4{
    font-size: 14px;
    font-weight: 700;
    color: rgb(7,17,27);
    line-height: 14px;
    margin-bottom: 8px;
}
.pageSale span{
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 10px;
    margin-right: 12px;
    margin-bottom: 18px;
}
.foodDetail h5{
    font-size: 14px;
    font-weight: 700;
    color: rgb(240,20,20);
    line-height: 24px;
}
.pageDollar{
    font-size: 10px;
    font-weight: normal;
}
.pageOldPrice{
    font-size: 10px;
    font-weight: 700;
    color: rgb(147,153,159);
    line-height: 24px;
    margin-left: 12px;
    text-decoration: line-through;
}
.pageShoppingCart{
    width: 74px;
    height: 24px;
    border-radius: 12px;
    background-color:rgb(0,160,220);
    font-size: 10px;
    color: rgb(255,255,255);
    line-height: 24px;
    position: absolute;
    right: 18px;
    bottom: 18px;
    text-align: center;
    z-index:6;
}
.addWrap{
    position: absolute;
    right: 18px;
    bottom: 18px;
}
/*空白栏*/
.emptyPage{
    width: 100%;
    height: 16px;
    background-color: #f3f5f7;
    border-top: 2px solid rgba(7,17,27,0.1);
    border-bottom: 2px solid rgba(7,17,27,0.1);
}
/*商品介绍*/
.foodShow{
    width: 100%;
    padding: 18px;
    box-sizing: border-box;
}
.foodShow h3，.foodRating h3{
    font-size:14px ;
    color: rgb(7,17,27);
    line-height:14px;
    margin-bottom: 6px;
}
.foodShow p{
    font-size: 12px;
    font-weight: 200;
    color: rgb(77,85,93);
    line-height: 24px;
    margin:6px 33px 0 8px;
}
/*商品评价*/
.ratingList li{
    border-bottom: 1px solid rgba(7,17,27,0.1);
}
.foodRating{
    width: 100%;
    padding: 18px 18px 0 18px;
    box-sizing: border-box;
    border-bottom: 2px solid #e6e7e8;
}
.ratingType{
    margin-top: 18px;
}
.ratingInfo{
    padding:16px 18px;
    position: relative;
}
.ratingInfo span{
    font-size: 10px;
    color: rgb(147,153,159);
    line-height:12px;
}
.shopInfo{
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 12px;
    position: absolute;
    top:16px;
    right: 18px;
}
.shopInfo img{
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-left: 6px;
}
.ratingCon{
    margin-top: 6px;
}
.ratingCon .upBlue{
    color: rgb(0,160,220);
}
.ratingCon i{
    font-size: 12px;
    color: rgb(147,153,159);
    line-height: 24px;
    margin-right: 4px;
}
.ratingCon span{
    font-size: 12px;
    color: rgb(7,17,27);
    line-height: 16px;
}
</style>