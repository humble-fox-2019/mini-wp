<template>
    <div class="root">
        <div class="header">
            <input type="text" v-model="title" placeholder="Your title goes here">
        </div>
        <div class="editor">
            <wysiwyg  class="texteditor" v-model="text"></wysiwyg>
        </div>
    </div> 
</template>

<script>
import wysiwyg from '../../vueWysiwyg'
export default {
    data: function(){
        return {
            text: "",
            title: ""
        }
    },
    components: {
        wysiwyg: wysiwyg.component
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