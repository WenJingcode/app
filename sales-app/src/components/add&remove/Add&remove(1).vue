<template>
<div>
    <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight">
        <div class="count">
            <i class="icon-remove_circle_outline remove" v-show="seen" @click="remove"></i>
            <span class="number" v-show="seen">{{count}}</span>
            <i class="icon-add_circle add" @click="add"></i>
        </div>
    </transition>
</div>
</template>
<script>
    export default{
        name:'add',
        data(){
            return{
                seen:false,
                count:0
            }
        },
        methods:{
            add(){
                this.seen=true;
                this.count++;
            },
            remove(){
                this.count--;
                if(this.count<=0){
                    this.seen=false;
                }
            },
        }
    }
</script>
<style scoped>
transition{
    transition: 2s all linear;
}
.count{
    width:72px ;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: rgb(0,160,220);
    line-height: 24px;
}
.add{
    position: absolute;
    right: 0;
}
.count .number{
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 24px;
    text-align: center;
    margin-top: 0;
    margin-right: 0;
}
.remove{
    position: absolute;
    left: 0;
}
</style>