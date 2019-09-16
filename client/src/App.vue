<template>
    <div class="all-div">
        <div>
            <Header1 :onPage="onPage"></Header1> 
            <Header2 :onPage="onPage"></Header2>
        </div>
        <div class="add-form">
            <button class="btn btn-primary" @click="pindahPage('addForm')" >Add New</button>
        </div>
        <div v-if="onPage == 'home' " class="container pt-5 d-flex flex-row justify-content-around mb-5" style="flex-wrap: wrap;">
            <Content :onPage="onPage" v-for="article in articles" :key="article._id" :article="article"   />
        </div>
        <div>
            <Login :onPage="onPage" @login="SuksesLogin($event)"/>
        </div>
        <div>
            <addForm v-if="onPage == 'addForm' " :onPage="onPage" @new="fetchData()"/>
        </div>
    </div>
</template>

<script>
import Header1 from './Header1';
import Header2 from './Header2';
import Content from './Content';
import Login from './Login';
import addForm from './addForm';
import axios from 'axios';
export default {
    components : {
        Header1,
        Header2,
        Content,
        Login,
        addForm
    },
    data () {
        return {
            editor: 'ClassicEditor',
            editorConfig : {},
            onPage : '',
            storage : localStorage.getItem('token'),
            model: '<h1>Edit Your Content Here!</h1>',
            articles : []
        }
        
    },
    created (){
        if(this.storage){
            this.onPage = 'home'
        }else {
            this.onPage = 'login'
        }
        this.fetchData();
    },
    watch : {
        storage (){
            if(this.storage){
                this.onPage = 'home'
            }else {
                this.onPage = 'login'
            }
        },
        onPage (){
            
        }
    },
    methods : {
        SuksesLogin (data){
            this.storage = data.token
        },
        pindahPage (page){
            this.onPage = page
        },
        fetchData (){
            axios({
            method : 'GET',
            url : 'http://localhost:3000/article',
            headers : {
                token : localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                console.log(data , ' INI PENTING BANGET YAAA')
                this.articles = data
                this.onPage = 'home'
            })
            .catch(console.log)
            }
    },
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

.add-form {
    margin: 0 auto;
    text-align: center;
    margin-top: 20px;
}

</style>