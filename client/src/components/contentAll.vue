<template>
    <div class="root">
        <div class="header">
            <div class="left"></div>
            <div class="right">
                <div class="box">
                    <search></search>
                </div>
            </div>
        </div>
        
        
        <div class="content" v-for="(article, index) in articles" :key="index">
            <div class="left">
                <div>
                    <h2>{{article.title}}</h2>
                </div>
                <div>
                    <p>{{article.content}}</p>
                </div>
            </div>
            <div>

            </div>

        </div>

    </div>
</template>

<script>
import axios from 'axios'
import search from './search'
let baseUrl = 'http://localhost:3000'
export default {
    data: function(){
        return {
            articles: []
        }
    },
    methods: {
        readAllArticle(){
             axios({
                url: `${baseUrl}/articles/all`,
                method: 'get',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(response => {
               this.articles = response.data
            })
            .catch(err =>{
                if(err.response){
                    console.log(`${err.response.data.message}`)
                }
                else if(err.request){
                    alert("No response from server")
                }
                else {
                    console.log(err)
                }
            })
            .finally(()=>{

            })
        }
    },
    components: {
        search
    },
    created (){
        this.readAllArticle()
    }
}
</script>

<style scoped>
    .root {
      
        width: 60vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
    }
    .header {
        margin-bottom: 4vh !important;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 8vh;
        background-color: #F6F7F7;
        margin-bottom: 2vh;
        border-radius: 5px;
    }
    .content{
        display: flex;
     
        height: 15vh;
        background-color: #F6F7F7;
        margin-bottom: 1vh;
        border-radius: 5px;
    }
    .header .right {
        display: flex;
        align-items: center;
    }
    .header .right .box {
        padding-right: 2vw;
    }
    
</style>