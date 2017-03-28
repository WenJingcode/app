<template>
<div class="sellerPage">
    <div class="sellersName">
        <h2>{{sellers.name}}</h2>
        <div class="sellerStar">
            <v-star :size="36" :score="sellers.score"></v-star>
        </div>
        <div class="sellCount">
            <span>({{sellers.rankRate}})</span>
            <span>月售{{sellers.sellCount}}单</span>
        </div>
        <div class="favorite" @click="isRed">
            <i class="icon-favorite grey" :class="{red:toGrey}"></i><br>
            <span v-show="toRed">收藏</span>
            <span v-show="toGrey">已收藏</span>
        </div>
        <div class="sellerSendDetail">
            <ul>
                <li>
                    <span>起送价</span><br>
                    <i class="sendAll">{{sellers.minPrice}}</i>
                    <i class="sendD">元</i>
                </li>
                <li>
                    <span>商家配送</span><br>
                    <i class="sendAll">{{sellers.deliveryPrice}}</i>
                    <i class="sendD">元</i>
                </li>
                <li>
                    <span>平均配送时间</span><br>
                    <i class="sendAll">{{sellers.deliveryTime}}</i>
                    <i class="sendD">分钟</i>
                </li>
            </ul>
        </div>
    </div>

    <!--空白栏-->
    <div class="emptySeller"></div>
    <!--公告与活动-->
    <div class="bulletinSeller">
        <h2>公告与活动</h2>
        <p>{{sellers.bulletin}}</p>
    </div>
    <div class="sellerSupport">
        <ul>
            <li v-for="(support,index) in sellers.supports">
                <v-icon :type="support.type" class="sellerSupportIcon"></v-icon>
                <span class="maskSupport">{{support.description}}</span>
            </li>
        </ul>
    </div>
    <!--空白栏-->
    <div class="emptySeller"></div>
    <div class="sellerShow">
        <h2>商家实景</h2>
        <div class="sellerImg">
            <ul>
                <li v-for="pic in sellers.pics"><img :src="pic" width="120" height="90" alt=""></li>
            </ul>
        </div>
    </div>
    <!--空白栏-->
    <div class="emptySeller"></div>
    <!--商家信息-->
    <div class="sellerInfo">
        <h2>商家信息</h2>
        <ul>
            <li v-for="info in sellers.infos">{{info}}</li>
        </ul>
    </div>
</div>
</template>
<script>
    export default {
        name: 'seller',
        data(){
            return{
                sellers:{},
                toRed:true,
                toGrey:false
            }
        },
        mounted(){
            this.$http.get('/api/seller'
            ).then(function(res){
                console.log(res.data);
                this.sellers=res.data.data;
            },function(res){
                console.log('失败');
            });
        },
        methods:{
            isRed(){
               this.toRed=!this.toRed;
               this.toGrey=!this.toGrey;
            }
        }
    }



</script>
<style scoped>
.sellerPage{
    width: 100%;
    height: 100%;
}
/*姓名区*/
.sellersName{
    width: 100%;
    padding: 18px;
    box-sizing: border-box;
    position: relative;
}
h2{
    font-size: 14px;
    color: rgb(7,17,27);
    line-height: 14px;
    margin-bottom: 8px;
}
.sellerStar,.sellCount{
    display: inline-block;
}
.sellerStar{
    margin-right: 8px;
    padding-bottom: 18px;
}
.sellCount{
    font-size: 10px;
    color: rgb(77,85,93);
    line-height: 18px;
    margin-right: 12px;
}
/*空白栏*/
.emptySeller{
    width: 100%;
    height: 16px;
    background-color: #f3f5f7;
    border-top: 1px solid rgba(7,17,27,0.1);
    border-bottom: 1px solid rgba(7,17,27,0.1);
}
/*收藏*/
.favorite{
    position: absolute;
    right: 18px;
    top: 18px;
    text-align: center;
}
.favorite .grey{
    font-size: 24px;
    color: #d4d6d9;
    line-height: 24px;
}
.favorite .red{
    color: rgb(240,20,20);
}
/*配送信息*/
.sellerSendDetail{
    border-top: 1px solid rgba(7,17,27,0.1);
    padding-top: 18px;
    padding-bottom: 18px;
}
.sellerSendDetail ul{
    display: flex;
    justify-content: space-around;
}
.sellerSendDetail li{
    display: inline-block;
    font-size: 10px;
    width: 33.33%;
    color: rgb(147,153,159);
    line-height: 10px;
    text-align: center;
    border-right: 1px solid rgba(7,17,27,0.1);
}
.sellerSendDetail li:last-child{
    border-right: none;
}
.sellerSendDetail li .sendAll{
    font-size: 24px;
    font-weight: 200;
    color: rgb(7,17,27);

}
.sellerSendDetail li span{
    display: list-item;
    margin-bottom: 4px;
}
/*公告与活动*/
.bulletinSeller{
    padding: 18px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(7,17,27,0.1);
}
.bulletinSeller p{
    font-size: 12px;
    font-weight: 200;
    color: rgb(240,20,20);
    line-height: 24px;
    margin-left: 12px;
}
.sellerSupport li{
    padding: 16px 30px;
    box-sizing: border-box;
    font-size: 0;
    line-height: 16px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
}
.sellerSupportIcon{
    width: 16px;
    height: 16px;
    margin-right: 6px;
}
.sellerSupport li span{
    font-size: 12px;
    font-weight: 200;
    color: rgb(7,17,27);
    line-height: 16px;
}
/*商家实景*/
.sellerShow{
    padding: 18px 0 18px 18px;
    overflow: hidden;
}
.sellerImg{
    margin-top: 12px;
}
.sellerImg ul{
    display: flex;
    flex-direction: row;
}
.sellerImg ul li{
    width: 120px;
    height: 90px;
    margin-right: 6px;
}
/*商家信息*/
.sellerInfo{
    padding: 18px;
    box-sizing: border-box;
}
.sellerInfo li{
    padding: 16px 12px;
    box-sizing: border-box;
    font-size: 12px;
    font-weight: 200;
    color: rgb(7,17,27);
    line-height: 16px;
    border-top: 1px solid rgba(7,17,27,0.1);
}

</style>