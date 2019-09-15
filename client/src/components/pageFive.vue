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
                <h1>{{articles.title}}</h1>
                <p v-html="articles.content"></p>
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
        margin-top: 10vh;
        width: 50%;
        font-family: 'Roboto', sans-serif;
    }
    .content h1{
        font-size: 3rem;
        text-align: center;
        margin-bottom: 4vh;
        border-bottom: 1px solid silver;
    }
</style>