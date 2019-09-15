<template>
    <div>
        <div class="main-container" id="oneArticle" style="margin-bottom:200px;">
            <!-- ARTICLE CARD -->
            <div class="shadow pl-2 pt-3 mt-4">
                <div class="row p-3">
                    <div class="col-4">
                        <img v-bind:src="article.image" alt="image" width="100%">
                    </div>
                    <div class="col-8">
                        <div>
                            <h3 class="article-title" style="text-align: left">{{article.title}}</h3>
                            <div>
                                <small>{{ convertDate ( article.createdAt )}} - </small>
                                <small class="font-weight-bold">By: {{ article.userId.username }}</small>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <ul class="tags">
                                    <li class="tag" v-for="(tag , index) in article.tags" :key="index">{{tag}}</li>
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="row p-5">
                    <p class="article" v-html="article.content"></p>
                    <br>
                    <div v-if=" owner( article.userId._id ) " style="display:flex; justify-content:space-around; margin-bottom: 20px;">
                        <div class="wrap pt-3" style="text-align: center" >
                            <a href="#" class="button2" style="display:block" @click.prevent="deleteArticle( article._id )">Delete</a>
                        </div>
                        <div class="wrap pt-3" style="text-align: center" >
                            <a href="#" class="button2" style="display:block" @click.prevent="editArticle( article._id )">Edit</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import server from '../api/helper'
const { axios , serverURL, Swal } = server
export default {
    data : function () {
        return {
        }
    },
    props: ["article"],
    methods: {
        owner ( userId ) {
            const loggedUserId = localStorage.getItem('userId')
            if ( userId == loggedUserId ) return true;
            else return false;
        },
        convertDate( date ) {
            const months = ['January' , 'February' , 'March' , 'April' ,'May', 'June', 'July' , 'August' , 'September' , 'October' , 'November' , 'December']
            const day = new Date( date ).getDate();
            const mon = months[new Date( date ).getMonth()];
            const year = new Date( date).getFullYear();
            return `${day} ${mon} ${year}`
        },
        deleteArticle( articleId ) {
            Swal.fire({
                title: 'Are you sure want delete this?',
                text : "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.value) {
                    this.$emit('deleteArticle', articleId )
                }
            })
        },
        editArticle( articleId ) {
            this.$emit('editArticle' , articleId )
        }
    }
}
</script>

<style>

</style>