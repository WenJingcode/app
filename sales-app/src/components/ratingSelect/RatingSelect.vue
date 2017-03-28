<template>
<div class="ratingSelect">
    <div class="selectType">
        <div class="allRating" @click="allRating">
            <span>{{ratingTypes.all}}</span>
            <i>{{ratings.length}}</i>
        </div>
        <div class="hotRating" @click="upRating">
            <span>{{ratingTypes.up}}</span>
            <i>{{upRatings.length}}</i>
        </div>
        <div class="badRating" @click="downRating">
            <span>{{ratingTypes.down}}</span>
            <i>{{downRatings.length}}</i>
        </div>
    </div>
    <div class="hasText">
        <i class="icon-check_circle" @click="toggleChange" :class="{green:color}"></i>
        <span>只看有内容的评价</span>
    </div>
</div>
</template>
<script>
    export default{
        name: 'ratingSelect',
        data(){
            return {
                color:false,
                selectText:[]
            }
        },
        props:{
            ratingTypes:{
                type:Object,
                default(){
                    all:'全部';
                    up:'满意';
                    down:'不满意'

                }
            },
            ratings:{
                type:Array,
                default(){
                    return [];
                }
            }
        },
        computed:{
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
                    if(rating.text){
                        ratingText.push(rating);
                    }
                });
                return ratingText;
            }
        },
        methods:{
            toggleChange(){
                this.color=!this.color;
                this.$emit('toggleChange');
            },
            allRating(){
                this.$emit('allRating');
            },
            upRating(){
                this.$emit('upRating');
            },
            downRating(){
                this.$emit('downRating');
            }
        }
    }
</script>
<style scoped>
.selectType{
    width: 100%;
    padding-bottom: 18px;
    border-bottom: 2px solid rgba(7,17,27,0.1);
}
.selectType div{
    width: 60px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    margin-right: 8px;
    font-size: 12px;
    border-radius: 2px;
    display: inline-block;
}
.selectType i{
    font-size: 8px;
    line-height: 16px;
}
.allRating{
    color:rgb(255,255,255) ;
    background-color: rgb(0,160,220);

}
.hotRating{
    color: rgb(77,85,93);
    background-color: rgba(0,160,220,0.2);
}
.badRating{
    color: rgb(77,85,93);
    background-color: rgba(77,85,93,0.2);
}
.hasText{
    margin-top: 12px;
    margin-bottom: 12px;
    color: rgb(147,153,159);
    height: 24px;
    display: flex;
    align-items: center;
}
.hasText .green{
    color: #36d475;
}
.hasText i{
    font-size: 24px;
    margin-right: 4px;
}
.hasText span{
    display: inline-block;
    height: 24px;
    font-size: 12px;
    line-height: 24px;
}

</style>