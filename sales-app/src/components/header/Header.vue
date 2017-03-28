<template>
<div id="header">
    <!--信息区-->
    <div class="header-wrap">
        <!--图片-->
        <div class="avatar">
            <img :src="sellers.avatar" alt="">
        </div>
        <!--内容区-->
        <div class="content">
                <!--店名-->
                <div class="name">
                    <img src="./img/brand@2x.png" alt="">
                    <span class="name-text">{{sellers.name}}</span>
                </div>
                <!--店信息-->
                <div class="description">
                    <span>{{sellers.description}} / {{sellers.deliveryTime}}分钟送达</span>
                </div>
                <!--店内优惠-->
            <!--"-->
                <div class="supports">
                    <span id="image" :class="classObj[mainSupport.type]"></span>
                  <span class="supports-text">{{mainSupport.description}}</span>
                </div>
            </div>
            <!--优惠信息个数-->
            <div class="sellCount" @click="sellerInfo">
                {{supportCount}}个<span class="icon-keyboard_arrow_right icon-right"></span>
            </div>
        </div>
    <!--公告区-->
    <div class="sellerInfo" @click="sellerInfo">
        <img src="./img/bulletin@2x.png" alt="">
        <span class="bulletin">{{sellers.bulletin}}</span>
        <span class="icon icon-keyboard_arrow_right"></span>
    </div>
    <!--背景-->
    <div class="bg">
        <img :src="sellers.avatar" alt="">
    </div>
    <!--公告遮罩  v-show="seen"-->
    <transition enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
        <div class="detailMask" v-show="seen">
            <div class="detailWrap">
                <div class="detailMain">
                    <span class="maskName">{{sellers.name}}</span>
                    <div class="star">
                        <v-star :size="48" :score="sellers.score"></v-star>
                    </div>
                </div>
                <div class="youhui">
                    <span class="maskLine lineLeft"></span>
                    <span class="masktitle">优惠信息</span>
                    <span class="maskLine lineRight"></span>
                </div>
                <ul>
                    <li v-for="(support,index) in sellers.supports">
                        <span id="maskImg" :class="classObj[support.type]" ></span>
                        <span class="maskSupport">{{support.description}}</span>
                    </li>
                </ul>
                <div class="sellInfo">
                    <span class="maskLine lineLeft"></span>
                    <span class="masktitle">商家公告</span>
                    <span class="maskLine lineRight"></span>
                </div>
                <div class="maskInfo">
                    <span>{{sellers.bulletin}}</span>
                </div>
            </div>
            <div class="detailClose" @click="close">
                <span class="icon-close"></span>
            </div>
        </div>
    </transition>
</div>
</template>
<script>
    export default {
        name:'header',
        data () {
            return {
                sellers:{},
                mainSupport:{},
                seen:false,
                supportCount:0,
                classObj:['decrease','discount','special','invoice','guarantee']
            }
        },
        mounted(){
            this.$http.get('/api/seller'
            ).then(function(res){
                console.log(res.data);
                this.sellers=res.data.data;
                this.mainSupport=this.sellers.supports[0];
                this.supportCount=this.sellers.supports.length;
            },function(res){
                console.log('失败');
            });
        },
        methods:{
            sellerInfo(){
                this.seen=true;
            },
            close(){
                this.seen=false;
            }
        }

    }
</script>
<style scoped>
#header{
    width: 100%;
    height: 134px;
    background-color:rgba(7,17,27,0.5);
    position: relative;
}
.header-wrap{
    font-size: 0;
}
/*商家图片*/
.avatar img{
    width: 64px;
    height: 64px;
    margin: 24px 0 12px 24px;
    border-radius: 2px;
}
.avatar{
    display: inline-block;


}
/*内容区*/
.content{
    display: inline-block;
    vertical-align: top;
    margin-left: 16px;
    margin-top: 26px;
}
.name img{
    width: 30px;
    height: 18px;
}
.name .name-text{
    font-size: 16px;
    color: rgb(255,255,255);
    font-weight: bold;
    line-height: 18px;
    display: inline-block;
    vertical-align: top;
    margin-left: 6px;
}
.description{
    font-size: 12px;
    color: rgb(255,255,255);
    font-weight: 200;
    line-height: 12px;
    margin-top: 7px;
}
.supports{
    margin-top: 10px;
}
#image,#maskImg{
    display: inline-block;
    width: 12px;
    height: 12px;
    background-size:12px 12px;
    background-repeat: no-repeat;
}
.decrease{
    background-image:url(./img/decrease_1@2x.png);
}
.discount{
    background-image:url(./img/discount_1@2x.png);
}
.special{
    background-image:url(./img/special_1@2x.png);
}
.invoice{
    background-image:url(./img/invoice_1@2x.png);
}
.guarantee{
    background-image:url(./img/guarantee_1@2x.png);
}
.supports-text{
    font-size: 10px;
    color: rgb(255,255,255);
    font-weight: 200;
    line-height: 12px;
    margin-top: 10px;
    margin-left: 4px;
}
.sellCount{
    width:40px ;
    height: 24px;
    border-radius: 14px 14px 16px 16px;
    font-size: 10px;
    text-align: center;
    color: rgb(255,255,255);
    font-weight: 200;
    line-height: 24px;
    position: absolute;
    top:68px;
    right:12px;
    background-color: rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
}
.icon-right{
    margin-left: 1px;
    font-size: 16px;
}
.sellerInfo{
    width: 100%;
    height: 28px;
    background-color: rgba(7,17,27,0.2);
    display: flex;
    align-items: center;
    position:absolute ;
    bottom:0;
    left:0;
}
.sellerInfo img{
    width:30px ;
    margin-left: 12px;
}
.sellerInfo .bulletin{
    font-size: 10px;
    color: rgb(255,255,255);
    font-weight: 200;
    line-height: 28px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 4px;
    margin-right: 4px;
}
.sellerInfo .icon{
    font-size: 22px;
    margin-right: 12px;
    color: rgb(255,255,255);
}
/*背景*/
.bg img{
    width: 100%;
    height: 100%;
    z-index: -1;
    filter:blur(10px);
    position: absolute;
    top: 0;
    left: 0;
}
/*公告遮罩*/
.detailMask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color:rgba(7,17,27,0.8);
    z-index:100;
    overflow: auto;
}
.detailWrap{
    min-height: 100%;
}
.detailMain{
    padding-top: 64px;
    text-align: center;
}
/*星星*/
.star{
    with:50%;
    height: 24px;
    margin-top: 16px;
}
/*优惠信息*/
.maskName{
    font-size: 16px;
    font-weight: 700;
    color: rgb(255,255,255);
    line-height: 16px;
    text-align: center;
}
.youhui{
    margin-top: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.maskLine{
    display: inline-block;
    width: 31%;
    height: 2px;
    background-color: rgba(255,255,255,0.2);
}
.lineLeft{
    margin-left: 36px;
}
.lineRight{
    margin-right: 36px;
}
.masktitle{
    font-size: 14px;
    font-weight: 700;
    color: rgb(255,255,255);
    line-height: 14px;
    margin: 0 12px;
    display: inline-block;
    width: 70px;

}
ul{
    width: 80%;
    height: auto;
    display: flex;
    flex-direction: column;
    text-align: left;
    margin:24px auto 16px auto;
}
li{
    width: auto;
    height:16px ;
    margin-bottom: 12px;
    margin-left: 12px;
}
.maskSupport{
    font-size: 12px;
    font-weight: 200;
    color: rgb(255,255,255);
    line-height:16px;
    vertical-align: top;
    margin-left: 6px;
}
.sellInfo{
    display: flex;
    align-items: center;
}
.maskInfo{
    margin: 24px auto 64px auto;
    width: 67%;
    height: auto;
    font-size: 12px;
    font-weight: 200;
    color: rgb(255,255,255);
    line-height: 24px;
    text-align: left;
}
.detailClose{
    position: relative;
    width: 32px;
    height: 32px;
    color: rgba(255,255,255,0.5);
    font-size: 32px;
    margin: -64px auto 0 auto;
}
</style>