<template>
<div>
    <div class="count">
            <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
                 <i class="icon-remove_circle_outline remove" v-show="foodCount>0" @click.stop="remove($event)"></i>
            </transition>
            <span class="number" v-show="foodCount>0">{{foodCount}}</span>
            <i class="icon-add_circle add" @click.stop="add($event)"></i>
        </div>

</div>
</template>
<script>
    import Vue from 'vue'
    export default{
        name:'add',
        props:{
            food:{
                type:Object,
                default(){

                }
            }
        },
        data(){
            return{

            }
        },
        computed:{
            foodCount(){
                return this.food.count;
            }
        },
        methods:{
            add(event){
                if(!event._constructed){
                    return;
                }
                if(!this.food.count){
                    Vue.set(this.food,'count',1);//使用这句，要引入Vue
                }else{
                    this.food.count++;
                }
            },
            remove(event){
                if(!event._constructed){
                    return;
                }
                this.food.count--;
            },
        }
    }
</script>
<style scoped>
transition{
    transition: 2s all linear;
}
.count{
    position: relative;
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