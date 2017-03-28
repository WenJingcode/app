<template>
<div id="goods">
    <!--左侧导航-->
    <div class="menuWrap" id="nav">
        <ul class="nav">
            <li v-for="(good,index) in goods"  @click="selectMenu(index,$event)"  :class="{current:currentIndex == index}">
            <span><v-icon :type="good.type" width="12" height="12" v-show="good.type>0"></v-icon>{{good.name}}</span>
            </li>
        </ul>
    </div>
    <!--右侧商品列表-->
    <div class="foodsWrap" id="food">
        <ul class="food">
            <li v-for="good in goods" class="foodsItemHook">
                <h3>{{good.name}}</h3>
                <div class="box" v-for="food in good.foods" @click="selectFood(food)">
                    <div class="images">
                        <img :src="food.icon" alt="">
                    </div>
                    <div class="foodInfo">
                        <h4>{{food.name}}</h4>
                        <p><span class="foodDes" v-show="food.description">{{food.description}}</span></p>
                        <span>月售{{food.sellCount}}份   </span><span>  好评率{{food.rating}}%</span>
                        <h5>￥{{food.price+'  '}}<span v-show="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span></h5>
                        <div class="addAndRemove">
                            <v-add :food="food"></v-add>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <v-shoppingCart :sendPrice="4" :minPrice="20" :selectedFoods="selectedFoods"></v-shoppingCart>
    </div>
    <v-food :food="selectedFood" ref="currentFood"></v-food>
</div>
</template>
<script>
    import BScroll from 'better-scroll'
    export default {
        name:'goods',
        data () {
            return {
                goods:[],
                seen:false,
                scrollY:0,
                listHeight:[],
                selectedFood:{}
            }
        },
        mounted(){
            this.$http.get('/api/goods').then(function(res){
                console.log(res.data);
                this.goods=res.data.data;
                this.$nextTick(function(){
                    this.startScroll();
                    this.calcHeight();
                });
            },function(res){
                console.log('失败');
            });
        },
        methods:{
            selectFood(food){
                this.selectedFood = food;
                this.$refs.currentFood.showFoodDetail();
            },
            selectMenu(index,event) {
                if(!event._constructed){
                    return;
                }
                let foodItems = document.getElementsByClassName("foodsItemHook");
                let el = foodItems[index];
                this.foodsScroll.scrollToElement(el,300); //scrollTo
                console.log(index);
            },
            startScroll() {
                let navScroll = new BScroll(document.getElementById("nav"),{
                    click:true
                });
                this.foodsScroll = new BScroll(document.getElementById("food"),{
                    click:true,
                    probeType: 3
                });
                this.foodsScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                });
            },
            calcHeight() {
                let foodItems = document.getElementsByClassName("foodsItemHook");
                let firstHeight = 0;
                this.listHeight.push(firstHeight);
                for(let i=0;i<foodItems.length;i++){
                    firstHeight+= foodItems[i].clientHeight;
                    this.listHeight.push(firstHeight);
                }
            }
        },
        computed: {
            currentIndex(){
                for (let i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i + 1];
                    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                        return i;
                    }
                }
                return 0;
            },
            selectedFoods(){
                let sFoods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                            sFoods.push(food);
                        }
                    });
                });
                return sFoods;
            }
        }
    }
</script>
<style scoped>
#goods{
    position: absolute;
    top:175px;
    bottom: 44px;
    width: 100%;
    display: flex;
    overflow: hidden;
}
.menuWrap{
    width: 80px;
    flex:0 0 80px;
}
.foodsWrap{
    flex:1;
}
/*左侧*/
.nav{
    height: auto;
    display: flex;
    flex-wrap: wrap;
}
.nav li{
    width: 100%;
    height: 54px;
    font-size: 12px;
    color: rgb(77,85,93);
    font-weight: 200;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    background-color: #f3f5f7;
    padding: 0 12px;
    box-sizing: border-box;
    white-space: pre-wrap;
    text-align:left;
    display: flex;
    align-items: center;
}

.nav .current{
    background-color: #fff;
    font-weight: 700;
    border: none;
    margin-top: -1px;
}
/*右侧*/
.food{
    height: auto;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
}
.food li{
    box-sizing: border-box;
}
.food li .box{
    width: 100%;
    padding-bottom: 18px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    position: relative;
    display: flex;
    flex-direction: row;
}
.food li .box:last-child{
    border:none;
}
.food h3{
    font-size: 12px;
    color: rgb(147,153,159);
    line-height: 26px;
    padding-left: 14px;
    border-left: 3px solid #d9dde1;
    background-color: #f3f5f7;
}
.images img{
    width: 57px;
    height: 57px;
    padding: 18px 10px 0 10px;
}
.foodInfo{
    position: relative;
    width: 70%;
    display: inline-block;
    vertical-align: top;
    padding-top: 18px;
}
.foodInfo h4{
    font-size: 14px;
    color: rgb(7,17,27);
    line-height: 14px;
}
.foodDes{
    display: inline-block;
    width: 98%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis ;
}
.foodInfo span{
    font-size:10px ;
    color: rgb(147,153,159);
    line-height: 10px;
    margin-top: 8px;
    margin-right: 12px;
}
 h5{
    font-size: 14px;
    color:red;
    font-weight: 700;
    line-height: 24px;
}
.foodInfo i{
    font-size: 24px;
    color: rgb(0,160,220);
    line-height: 24px;
}
.foodInfo .addAndRemove{
    position: absolute;
    right: 18px;
    bottom: 0;
}
.foodInfo .oldPrice{
    font-size: 10px;
    color: rgb(147,153,159);
    font-weight: 700;
    line-height: 24px;
    text-decoration: line-through;
}

</style>