<template>
    <div class="root">
        <div class="header">
            <input type="text" v-model="inititle" placeholder="Your title goes here">
        </div>
        <div class="editor">
            <wysiwyg class="texteditor" v-model="inicontent"></wysiwyg>
        </div>
    </div> 
</template>

<script>
import axios from 'axios'
let baseUrl = "http://35.240.183.35"
import wysiwyg from '../../vueWysiwyg'
export default {
    props:['content', 'title'],
    data: function(){
        return {
            inicontent: "",
            inititle: ""
        }
    },
    watch:{
         inicontent: function(){
             this.$emit('updatecontent', this.inicontent)
         },
         inititle: function(){
             this.$emit('updatetitle', this.inititle)
         }

    },
    created(){
        if(this.content) this.inicontent = this.content
        if(this.title) this.inititle = this.title
    },
    components: {
        wysiwyg: wysiwyg.component
    },
    
}
</script>

<style scoped>
    input {
        height: 12vh;
        width: 70%;
        font-size: 2.4rem;
        text-align: center;
        border: none;
    }
    .header{
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 5vh;
    }
    .texteditor{
        margin: 0px;
        width: 100%;
    }
    .root{
        width: 80%;
    }
    
</style>