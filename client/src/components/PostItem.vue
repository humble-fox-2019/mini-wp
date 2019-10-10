<template>
    <div class="post row">
        <div class="col-5 article-img" ><img v-bind:src="post.imageUrl"></div>
        <div class="col-7 article">
            <p class="post-date">{{post.createdAt}}</p>
            <p v-bind:key="post._id"></p>
            <h1>{{post.title}}</h1>
            <p>{{post.description}}</p>
            <button @click="toggleShow">Edit</button>
            <button @click="del(post)">Delete</button>
            <UpdatePostForm 
                :show-update-form="showUpdateForm" 
                :post="post"
                v-on:hide-update-form="showUpdateForm = false">
            </UpdatePostForm>
        </div>
    </div>
</template>
<script>
import UpdatePostForm from './UpdatePostForm'
import axios from 'axios'
export default {
    components : {
        UpdatePostForm
    },
    data : function(){
        return {
            showUpdateForm : false
        }
    },
    methods : {
        toggleShow() {
            this.showUpdateForm = true
        },
        edit : function (post){
            this.showUpdateForm = true
            console.log(this.showUpdateForm)
        },
        del : function(post){
            axios({
                method: 'DELETE',
                url: 'http://localhost:3000/posts/' + this.post._id,
                headers : {
                    'token' : localStorage.getItem('token')
                }
            }).then(res =>{
                console.log(res)
                /* let index = this.posts.indexOf(this.form.title)
                this.posts.splice(index,1) */
            })
        },
    },
    props: {
        post: {
            type: Object,
            required: true
        }
    }
}
</script>