<template>
    <div>
        <navbar @gotofirstpage="gotofirstpage" @gotosecondpage="gotosecondpage" :page="page"></navbar>
        <div class="editor">
            <contentwrite ></contentwrite>
        </div>
        
    </div>
</template>

<script>
import navbar from './navbar'
import contentwrite from './contentWrite'
export default {
    props: ['page'],
    data: function(){
        return {

        }
    },
    components: {
        navbar,
        contentwrite
    },
    methods: {
        gotofirstpage(){
            this.$emit('gotofirstpage')
        },
        gotosecondpage(){
            this.$emit('gotosecondpage')
        }
    }
}
</script>

<style scoped>
    .editor{
        margin-top: 5vh;
        width: 100%;
        display: flex;
        justify-content: center;
    }
</style>