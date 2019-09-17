<template>
    <div class="all-div">
        <div>
            <Header1 :onPage="onPage" @keluar="LogOut" ></Header1> 
            <Header2 :onPage="onPage" @pindah='pindahPage($event)'  ></Header2>
        </div>
        <div class="add-form" v-if="onPage != 'login' && onPage != 'addForm' && onPage != 'detail'">
            <button class="btn btn-primary" @click="pindahPage('addForm')" >Add New</button>
        </div>
        <!-- <div v-if="isTag">
            <p>Search By Tag{{currentTag}}</p>
        </div> -->
        <div v-if="onPage == 'home' " class="container pt-5 d-flex flex-row justify-content-around mb-5" style="flex-wrap: wrap;" >
            <Content :onPage="onPage" v-for="article in articles" :key="article._id" :article="article" @detail="getDetail($event)"    />
        </div>
        <div>
            <Login :onPage="onPage" @login="SuksesLogin($event)"/>
        </div>
        <div>
            <addForm v-if="onPage == 'addForm' " :onPage="onPage" @new="fetchData()"/>
        </div>
        <div>
            <Detail v-if="onPage == 'detail'" :detailArticle="detailArticle" @tags="getTag($event)" @edits="RenderEdit($event)" @deletes="fetchData()"/>
        </div>
        <div>
            <EditForm v-if="onPage == 'edit' " :article="detailArticle" @edited="fetchData" />
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
import Detail from './Detail'
import EditForm from './EditForm'
export default {
    components : {
        Header1,
        Header2,
        Content,
        Login,
        addForm,
        Detail,
        EditForm
    },
    data () {
        return {
            editor: 'ClassicEditor',
            editorConfig : {},
            onPage : '',
            storage : localStorage.getItem('token'),
            model: '<h1>Edit Your Content Here!</h1>',
            articles : [],
            detailArticle : {},
            isTag : false,
            currentTag : ''
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
        getTag (tag){
            axios({
                method : 'GET',
                url : `http://localhost:3000/article/tag?tag=${tag}`,
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                this.onPage = 'home'
                this.currentTag = tag
                this.isTag = true
                this.articles = data
            })
            .catch(console.log)
            console.log(tag)
        },
        RenderEdit(id){
            axios({
                method : 'GET',
                url : `http://localhost:3000/article/${id}`,
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                this.detailArticle = data
                this.onPage = 'edit'
            })
            .catch(console.log)
        },
        LogOut (){
            localStorage.clear()
            this.storage = null
        },
        getDetail (id){
            axios({
                method : 'GET',
                url : `http://localhost:3000/article/${id}`,
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                this.detailArticle = data
                this.onPage = 'detail'
            })
            .catch(console.log)
        },
        SuksesLogin (data){
            this.fetchData()
            this.storage = data.token
        },
        pindahPage (page){
            if(page == 'home'){
                this.fetchData()
            }
            this.onPage = page
        },
        fetchData (){
            // this.onPage = 'home'
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