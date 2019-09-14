<template>
    <div class="root">
        <div class="row header">
            <div class="left">nnkn</div>
            <div class="right">
                <div class="box">
                    <search></search>
                </div>
            </div>
        </div>
        <div class="row">
            
        </div>
        <div class="row">

        </div>
        <div class="row">

        </div>
    </div>
</template>

<script>
import search from './search'
export default {
    data: function(){
        return {
            articles: []
        }
    },
    components: {
        search
    },
    created: function(){

    }
}
</script>

<style scoped>
    .root {
        
        width: 60vw;
        
        display: flex;
        flex-direction: column;
    }
    .header {
        margin-bottom: 4vh !important;
    }
    .row{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 8vh;
        background-color: #F6F7F7;
        margin-bottom: 1vh;
        border-radius: 5px;
    }
    .header .right {
        display: flex;
        align-items: center;
    }
    .right .box {
        padding-right: 2vw;
    }
    
</style>