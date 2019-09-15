<template>
    <div class="root">
        <div class="header">
            <div class="left"></div>
            <div class="right">
                <div class="box">
                    <search @search="search"></search>
                </div>
            </div>
        </div>
        <div class="row" v-for="(article, index) in filter()" :key="index">
            
            <div class="left">
                <div class="top">
                    <div>
                        <a href="" @click.prevent="gotofifth(article)"><h2>{{article.title}}</h2></a>
                    </div>
                    <div>
                        <p v-html="article.content"></p>
                    </div>
                </div>
                <div class="bottom">
                    <p>{{article.updatedAt}}</p>
                </div>

            </div>
            <div class="right">

            </div>
            
        </div>
    </div>    
</template>

<script>
import search from './search'
let baseUrl = 'http://localhost:3000'
import axios from 'axios'
export default {
    data: function(){
        return {
            articles: [],
            searchtext: ""
        }
    },
    methods:{
        gotofifth(article){
            
            this.$emit('gotofifth', article)
        },        
        search(value){
            this.searchtext = value
        },
        filter(){
            let regex =  new RegExp(`^${this.searchtext}`)
            let filtered =  this.articles.filter(article =>{
                return regex.test(article.title)
            })
            return (filtered)
        },
        readArticle(){
            
            axios({
                url: `${baseUrl}/articles`,
                method: 'get',
                headers: {
                    publish: false,
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
    created(){
        this.readArticle()
    },
    components: {
        search
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
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 8vh;
        border-radius: 5px;
        margin-bottom: 1vh !important;
    }
    .row{
        display: flex;
        font-family: Arial, Helvetica, sans-serif;
        flex-direction: row;
        justify-content: space-between;
        height: 20vh;
        border-bottom: 1px solid silver;
        margin-bottom: 1vh;
        
    }
    .row .left h2, .row .left p{
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .row .left a {
        text-decoration: none;
        color: black;
    }
    .row .left{
        padding: 2vh 2vw 2vh 2vw;
        display: flex;
        width: 70%;
        flex-direction: column;
        justify-content: space-between;

    }
    
    .row .right{
        padding-right: 1vw;
    }
    .header .right {
        display: flex;
        align-items: center;
    }
    .right .box {
        padding-right: 2vw;
    }
   
</style>