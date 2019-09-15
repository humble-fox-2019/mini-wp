<template>
    <div>
    
        <navbar 
            @gotofourthpage="gotofourthpage"
            @gotosecondpage="gotosecondpage" 
            @gotothirdpage="gotothirdpage" 
            :page="page" 
            @gotofirstpage="gotofirstpage"></navbar>
            <div class="title">
                <h2>Your drafts</h2>
            </div>
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
    .title{
        margin-top: 3vh;
        width: 100vw;
        display: flex;
        justify-content: center;
    }
    .content{
        margin-top: 3vh;
        margin-left: auto;
        margin-right: auto;
    }
</style>