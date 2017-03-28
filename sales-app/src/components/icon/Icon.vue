<template>
    <span id="maskImg" :class="classObj[type]" ></span>
</template>
<script>
    export default{
        name:'icon',
        props:['type'] ,
        data(){
            return{
                classObj:['decrease','discount','special','invoice','guarantee']
            }
        }
    }
</script>
<style scoped>
    #maskImg{
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
</style>