<template>
    <div class="root">
        <div class="header">
            <input type="text" @input="$emit('update:title', $event.target.value)" :value="title" placeholder="Your title goes here">
        </div>
        <div class="editor">
            <wysiwyg class="texteditor" v-model="inicontent"></wysiwyg>
        </div>
    </div> 
</template>

<script>
import axios from 'axios'
let baseUrl = "http://localhost:3000"
import wysiwyg from '../../vueWysiwyg'
export default {
    props:['content', 'title'],
    data: function(){
        return {
            inicontent: "",
            // title: ""
        }
    },
    watch:{
         inicontent: function(){
             console.log('tr')
             this.$emit('updatecontent', this.inicontent)
         }
    },
    methods: {
        
    },
    components: {
        wysiwyg: wysiwyg.component
    },
    created () {

    }
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