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
        <div class="notif" v-if="filter().length === 0">
            <p >Your draft is empty</p>
        </div>
        <div v-else class="row" v-for="(article, index) in filter()" :key="index">
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
                    <p class="time" v-text="dateConverter(article.updatedAt)"></p>
                    <a class="delete" @click.prevent="deleteArticle(article._id)" href=""><i class="fas fa-trash-alt fa-1x"></i></a>   
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
        deleteArticle(_id){
            axios({
                url: `${baseUrl}/articles/${_id}`,
                method: 'delete',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(response=>{
                this.readArticle()
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
        },
        dateConverter(value){
            return new Date(value).toTimeString()
        },
        gotofifth(article){
            
            this.$emit('gotofifth', article)
        },        
        search(value){
            this.searchtext = value
        },
        filter(){
            let regex =  new RegExp(`^${this.searchtext}`)
            let filtered =  this.articles.filter(article =>{
                return regex.test(article.title.toLowerCase())
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
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: `No response from server`
                    })
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
    .notif{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .notif p{
        font-size: 1.3rem;
    }
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
    .row .left .top h2, .row .top .left p{
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-family: 'Work Sans', sans-serif;
    }
    .row .left .top p{
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        height: 6vh;
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
    .time {
        margin-right: 1vw;
        color: #a3a3a3;
        font-size: 0.8rem;
    }
    .time:hover{
        color: black;
        transition-duration: 0.2s;
    }
    .row .left .bottom {
        display: flex;
        justify-items: start;
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