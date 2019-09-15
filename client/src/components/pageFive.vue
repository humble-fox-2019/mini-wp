<template>
    <div>
        <navbar
        @gotoeditpage="gotoeditpage"
        @gotosecondpage="gotosecondpage" 
        @gotothirdpage="gotothirdpage"
         :page="page" 
        @gotofirstpage="gotofirstpage"></navbar>
        <div class="root">
            <div class="content">
                <img :src="articles.featured_image" alt="">
                <p style="display: block;" class="title">{{articles.title}}</p>
                <p class="time" >{{new Date(articles.updatedAt).toTimeString()}}</p>
                <p class="isi" v-html="articles.content"></p>
            </div>
        </div>

    </div>
</template>

<script>
import navbar from './navbar'
export default {

    props: ['page', 'articles'],
    data: function(){
        return {

        }
    },
    methods:{
        gotoeditpage(){
            this.$emit('gotoeditpage')
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
        navbar
    }
}
</script>

<style scoped>
    .root {
        width: 100vw;
        display: flex;
        justify-content: center;
    }

    .content {
        margin-top: 2vh;
        width: 50%;
        font-family: 'Roboto', sans-serif;
    }
    img {
        max-height: 40vh;
        margin-bottom: 3vh;
        border-left: 1px solid silver;
        border-bottom: 1px solid silver;
        padding-left: 0.5vw;
        padding-bottom: 0.5vw;
    }
    .content .title{
        font-size: 2.5rem;
        text-align: start;
        margin-bottom: 4vh;
        font-family: 'Work Sans', sans-serif;
        border-bottom: 1px solid silver;
    }
    .time{
        font-size: 0.8rem;
        color: silver;
    }
    .time:hover {
        color: black;
        transition-duration: 0.4s;
    }
    .isi{
        font-family: 'Work Sans', sans-serif;
    }
</style>