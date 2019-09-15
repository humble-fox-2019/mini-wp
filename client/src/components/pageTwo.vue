<template>
    <div>
        <navbar 
            @gotofourthpage="gotofourthpage"
            @gotosecondpage="gotosecondpage" 
            @gotothirdpage="gotothirdpage" 
            :page="page" 
            @gotofirstpage="gotofirstpage"></navbar>
            <div style="width: 100vw;">
                <h2 class="title">Your published articles</h2>
            </div>
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

<style scoped>

    .content{
        margin-top: 10vh;
        margin-left: auto;
        margin-right: auto;
    }
</style>