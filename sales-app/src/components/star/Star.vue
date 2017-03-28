<template>
    <div class="star" :class="starType">
        <span v-for="itemClass in itemClasses" class="star-item" :class="itemClass"></span>
    </div>
</template>
<script>
    const LENGTH = 5;
    const CLS_ON = 'on';
    const CLS_HALF = 'half';
    const  CLS_OFF = 'off';
    export default{
        name:'star',
        props:['size','score'],
        computed:{
            starType:function () {
                return 'star-'+this.size;
            },
            itemClasses:function () {
                let result = [];
                let score = Math.floor(this.score*2) / 2;
                let hasDecemail = score % 1 != 0;
                let integer = Math.floor(score);
                for(let i=0;i<integer;i++){
                    result.push(CLS_ON);
                }
                if(hasDecemail){
                    result.push(CLS_HALF);
                }
                while(result.length < LENGTH){
                    result.push(CLS_OFF);
                }
                return result;
            }
        }
    }
</script>
<style>
.star{

}
.star-item{
    display: inline-block;
    background-repeat: no-repeat;
}
.star-item:last-child{
    margin-right: 0;
}
.star-48 .star-item{
    width: 20px;
    height: 20px;
    margin-right: 22px;
    background-size: 20px 20px;
}
.star-36 .star-item{
    width: 15px;
    height: 15px;
    margin-right: 6px;
    background-size: 15px 15px;
}
.star-24 .star-item{
    width: 10px;
    height: 10px;
    margin-right: 4px;
    background-size: 10px 10px;
}
.star-item:last-child{
    margin-right: 0;
}
.on{
    background-image: url("./img/star48_on@2x.png");
}
.half{
    background-image: url("./img/star48_half@2x.png");
}
.off{
    background-image: url("./img/star48_off@2x.png");
}
</style>