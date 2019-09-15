<template>
    <div>
    
        <navbar 
            @gotofourthpage="gotofourthpage"
            @gotosecondpage="gotosecondpage" 
            @gotothirdpage="gotothirdpage" 
            :page="page" 
            @gotofirstpage="gotofirstpage"></navbar>
            <h2 class="title">Your drafts</h2>
        <contentdraft @gotofifth="gotofifth" class="content"></contentdraft>
    </div>
</template>

<script>
import navbar from './navbar'
import contentdraft from './contentDraft'
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
        contentdraft
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