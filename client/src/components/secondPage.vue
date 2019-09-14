<template>
    <div>
        <navbar @gotosecondpage="gotosecondpage" 
        @gotothirdpage="gotothirdpage" :page="page" 
        @gotofirstpage="gotofirstpage"></navbar>
        <contentall class="content"></contentall>
    </div>
    
</template>

<script>
import navbar from './navbar'
import contentall from './contentAll'
export default {
    props: ['page'],
    data: function(){
        return {

        }
    },
    components: {
        navbar,
        contentall
    },
    methods: {
        gotosecondpage(){
            this.$emit('gotosecondpage')
        },
        gotofirstpage(){
            this.$emit('gotofirstpage')
        },
        gotothirdpage(){
            this.$emit('gotothirdpage')
        }
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