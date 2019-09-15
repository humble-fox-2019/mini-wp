<template>
    <div>
        <navbar 
            @gotofourthpage="gotofourthpage"
            @gotosecondpage="gotosecondpage" 
            @gotothirdpage="gotothirdpage" 
            :page="page" 
            @gotofirstpage="gotofirstpage"></navbar>
            <h2 class="title">Your published articles</h2>
            <contentpublish  @gotofifth="gotofifth" class="content"></contentpublish>
    </div>
</template>

<script>
import navbar from './navbar'
import contentpublish from './contentPublish'
export default {
    props: ['page'],
    data: function(){
        return {

        }
    },
    methods:{
        gotofifth(article){
            this.$emit('gotofifth', article)
        },
        gotofourthpage(){
            this.$emit('gotofourthpage')
        },
        gotofifthpage(){
            this.$emit('gotofifthpage')
        },
        gotosecondpage(){
            this.$emit('gotosecondpage')
        },
        gotofirstpage(){
            this.$emit('gotofirstpage')
        },
        gotothirdpage(){
            this.$emit('gotothirdpage')
        }
    },
    components: {
        navbar,
        contentpublish
    },
    created(){
    }
}
</script>

<style>
    .title{
        position: relative;
        top: 5vh;
        left: 10vw;
    }
    .content{
        margin-top: 10vh;
        margin-left: auto;
        margin-right: auto;
    }
</style>