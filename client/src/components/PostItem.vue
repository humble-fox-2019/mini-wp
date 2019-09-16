<template>
    <div class="post row">
        <div class="col-5 article-img"></div>
        <div class="col-7 article">
            <p class="post-date">{{post.createdAt}}</p>
            <p v-bind:key="post.id"></p>
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
        }
    },
    props: {
        post: {
            type: Object,
            required: true
        }
    }
}
</script>