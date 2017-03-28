<template>
    <div class="rating">
        <!--星评分-->
        <div class="ratingTop">
            <div class="topLeft">
                <h2>3.9</h2>
                <h3>综合评分</h3>
                <h4>高于周边商家33.9%</h4>
            </div>
            <div class="topRight">
                <div class="r1">
                    <h3>服务态度</h3>
                    <v-star :size="36" :score="ratingScore"></v-star>
                </div>
                <div class="r2">
                    <h3>服务态度</h3>
                    <v-star :size="36" :score="ratingScore"></v-star>
                </div>
                <div class="r3">
                    <h3>送达时间</h3>
                    <span class="ratingTime">44分钟</span>
                </div>
            </div>
        </div>
        <!--空白栏-->
        <div class="emptyPage"></div>
        <!--评价区-->
        <div>
            <div class="ratingType">
                <v-ratingSelect :ratingTypes="ratingTypes" :ratings="ratings"></v-ratingSelect>
            </div>
            <div class="ratingPageList">
                <ul>
                    <li v-for="rating in ratings">
                        <div class="ratingLeft">
                            <div class="left">
                                <img :src="rating.avatar" width="28" height="28" alt="">
                            </div>
                        </div>
                        <span class="ratingSentTime">{{rating.rateTime}}</span>
                        <div class="ratingRight">
                            <div class="ratingMain">
                                <h4>{{rating.username}}</h4>
                                <div class="ratingStar">
                                    <v-star :size="36" :score="rating.score"></v-star>
                                    <span>{{rating.deliveryTime}}分钟送达</span>
                                </div>
                            </div>
                            <p>{{rating.text}}</p>
                            <div class="ratingTypes">
                                <i class="icon-thumb_up upBlue" v-show="rating.rateType==0"></i>
                                <i class="icon-thumb_down downIcon" v-show="rating.rateType==1"></i>
                                <ul class="recommend">
                                    <li v-for="rec in rating.recommend">
                                        <span>{{rec}}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'rating',
        data(){
            return{
                ratings:[],
                ratingTypes:{
                    all:'全部',
                    up:'满意',
                    down:'不满意'
                },
            }

        },
        mounted(){
            this.$http.get('/api/rating'
            ).then(function(res){
                this.ratings=res.data.data;
            },function(res){
                console.log('失败');
            });
        },
        computed:{
            ratingScore(){
                let scores={};
                let length='';
                this.ratings.forEach((rating)=>{
                    scores+=rating.score;
                    length=scores.length;
                });
                console.log(scores);
                console.log(length);
                return scores/length ;
                console.log(scoreR/length);
            }
        }
    }



</script>
<style scoped>
/*星评分*/
.ratingTop{
    padding: 18px 24px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
}
.topLeft{
    width: 36%;
    text-align: center;
    border-right: 1px solid rgba(7,17,27,0.1);
}
.topLeft h2{
    font-size: 24px;
    color: rgb(255,153,0);
    line-height: 28px;
}
.topLeft h3{
    font-size: 12px;
    color: rgb(7,17,27);
    line-height: 12px;
    margin-top: 6px;
}
.topLeft h4{
    font-size: 10px;
    color: rgb(7,17,27);
    margin-top: 8px;
}
.topRight{
    width: 64%;
    padding-left: 24px;
}
.topRight h3{
    font-size: 12px;
    color: rgb(7,17,27);
    line-height: 18px;
    margin-bottom: 8px;
    margin-right: 12px;
}
.topRight h3:last-child{
    margin-bottom: 0;
}
.r3{
    display: flex;
    flex-direction: row;
}
.ratingTime{
    font-size: 12px;
    color: rgb(147,153,159);
    line-height: 18px;
}
/*空白栏*/
.emptyPage{
    width: 100%;
    height: 16px;
    background-color: #f3f5f7;
    border-top: 2px solid rgba(7,17,27,0.1);
    border-bottom: 2px solid rgba(7,17,27,0.1);
}
/*评价区*/
.ratingType{
    padding: 18px;
    box-sizing: border-box;
    border-bottom: 2px solid rgba(7,17,27,0.1);
}
.upBlue{
    color: rgb(0,160,220);
}
.ratingPageList li{
    padding: 18px;
    box-sizing: border-box;
    display: flex;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    box-sizing: border-box;
    position: relative;
}
.ratingSentTime{
    display: inline-block;
    position: absolute;
    top:18px;
    right: 18px;
}
.ratingLeft{
    flex: 0 0 28px;
    width: 28px;
}
.left img{
    width: 28px;
    height: 28px;
    border-radius: 50%;
}
.ratingStar{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.ratingStar span{
    margin-left: 6px;
    font-size: 10px;
    font-weight: 200;
    color: rgb(147,153,159);
    line-height: 12px;
}
.ratingRight{
    box-sizing: border-box;
    flex:1;
}
.ratingRight p{
    margin-top: 8px;
    font-size: 12px;
    color: rgb(7,17,27);
    line-height: 18px;
    margin-bottom: 8px;
}

.ratingTypes{
    display: flex;
    flex-direction: row;
}
.ratingTypes i{
    margin-right: 8px;
    font-size: 12px;
    line-height:16px;
}
.downIcon{
    color: rgb(183,187,191);
}
.recommend{
    display: flex;
    flex-direction: row;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.recommend li{
    border: 1px solid rgba(7,17,27,0.1);
    background-color:rgb(255,255,255);
    border-radius: 2px;
    margin-right: 8px;
    height: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 6px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
}
.recommend li span{
    font-size: 9px;
    color: rgb(147,153,159);
    line-height: 16px;
}
</style>