<template>
  <div>
    <Navbar @changeMainPage='changeMainPage' @logout='logout'></Navbar>
    <div class="main">
        <div v-if="currentMainPage === 'myArticle'">
            <MyArticle :my-articles="myArticles" @viewArticle='fetchOneArticle' @search="myArticleSearch"></MyArticle>
        </div>
        <div v-else-if="currentMainPage === 'allArticle'">
            <AllArticle :all-articles="allArticles" @viewArticle='fetchOneArticle' @searchAllArticleTitle="searchAllArticleTitle" @searchAllArticleTag='searchAllArticleTag' @fetchArticle="fetchArticle"></AllArticle>
        </div>
        <div v-else-if="currentMainPage === 'addNewArticle'">
            <AddArticle @fetchArticle='addFetchArticle'></AddArticle>
        </div>
        <div v-else-if="currentMainPage === 'viewOneArticle'">
            <ViewArticle :article="viewOneArticle" @deleteArticle="deleteArticle" @editArticle="editArticle"></ViewArticle>
        </div>
        <div v-else-if="currentMainPage === 'editArticle'">
            <EditArticle :articleData="editArticleData" @changeMainPage='changeAndFetch'></EditArticle>
        </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar';
import AllArticle from './AllArticle'
import MyArticle from './MyArticle'
import AddArticle from './AddArticle'
import ViewArticle from './ViewArticle'
import EditArticle from './EditArticle'

import server from '../api/helper'

const { axios , Swal , serverURL } = server
export default {
    data : function () {
        return {
            currentMainPage : 'myArticle',
            viewOneArticle : null,
            editArticleData : null
        }
    },
    props : ['allArticles' , 'myArticles'],
    methods: {
        changeMainPage ( page ) {
            this.currentMainPage = page
            this.fetchArticle();
        },
        logout() {
            this.$emit('changeCurrentPage', 'login')
        },
        fetchArticle() {
            this.$emit('fetchArticle')
        },
        addFetchArticle() {
            this.changeMainPage('myArticle')
            this.$emit('fetchArticle');
        },
        fetchOneArticle( id ) {
            const token = localStorage.getItem('token')
            axios({
                method: "GET",
                url : `${serverURL}/articles/search/${id}`,
                headers : {
                    token 
                }
            })
            .then ( response => {
                this.viewOneArticle = response.data.article;
                this.currentMainPage = 'viewOneArticle'
                // console.log( this.article )
            })
            .catch( err => {
                console.log( "ONE ARTICLE ERROR ")
                console.log( err );
                this.$buefy.toast.open({
                    duration: 5000,
                    message: `Oppss... Somthing gone can't fetch article please reload!`,
                    type: 'is-danger'
                })  
            })
        },
        deleteArticle( articleId) {
            const token = localStorage.getItem('token')
            axios({
                method: "DELETE",
                url : `${serverURL}/articles/${articleId}`,
                headers : {
                    token
                }
            })
            .then( response => {
                this.fetchArticle();
                this.changeMainPage('myArticle')
            })
            .catch( err=> {
                console.log( err.response )
                console.log( "DELETE ERROR ")
                this.$buefy.toast.open({
                    duration: 5000,
                    message: `Oppss... Somthing gone can't delete article please reload!`,
                    type: 'is-danger'
                })  
            })
        },
        editArticle( articleId ) {
            const token = localStorage.getItem('token')
            axios({
                method:"GET",
                url : `${serverURL}/articles/search/${articleId}`,
                headers : {
                    token
                }
            })
            .then( response => {
                this.editArticleData = response.data.article;
                this.changeMainPage( 'editArticle');           
            })
            .catch( err => {
                console.log("DI HOME EDIT ARTICLE ERROR");
                console.log( err.respnose )
                this.$buefy.toast.open({
                    duration: 5000,
                    message: `Oppss... Somthing gone can't edit article please reload!`,
                    type: 'is-danger'
                })  
            })
        },
        changeAndFetch() {
            this.changeMainPage('myArticle')
            this.fetchArticle();
        },
        myArticleSearch ( keyword ) {
            this.$emit('myArticleSearch' , keyword )
        },
        searchAllArticleTitle( keyword ) {
            this.$emit('searchAllArticleTitle' , keyword );
        },
        searchAllArticleTag( tags ) {
            this.$emit('searchAllArticleTag' , tags )
        }
    },
    components : {
        Navbar ,
        AllArticle,
        MyArticle,
        AddArticle,
        ViewArticle,
        EditArticle
    }  ,
    created : function() {
        this.$emit('fetchArticle')
    }
}
</script>

<style>

</style>