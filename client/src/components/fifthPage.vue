<template>
    <div>
        <navbar 
            @gotofifthpage="gotofifthpage"
            @gotofourthpage="gotofourthpage"
            @gotosecondpage="gotosecondpage" 
            @gotothirdpage="gotothirdpage" :page="page" 
            @gotofirstpage="gotofirstpage"></navbar>
            <contentpublish></contentpublish>
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

</style>