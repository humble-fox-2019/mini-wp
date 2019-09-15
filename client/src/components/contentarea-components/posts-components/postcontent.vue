<template>
    <ul id="postContent">
        <li 
            v-for="(article, index) in articles" :key="index" 
            class="container bg-white rounded mt-3 flex items-center shadow">
            <div class="pl-6 py-3">
                <a @click.prevent="editPost(article)" href="#">
                    <h3 class="text-2xl">{{ article.title }}</h3>
                </a>
                <p class="text-sm" v-html="article.content"></p>
                <small class="text-gray-600 text-xs">author : {{ article.userId.email }}</small>
            </div>
            <img class="ml-auto" :src="article.url" alt="">
            <button @click.prevent="editPost(article)" >
                <i class="far fa-edit pr-3"></i>
            </button>
            <button @click.prevent="deletePost(article)">
                <i class="far fa-trash-alt pr-6"></i>
            </button>
        </li>
    </ul>
</template>

<script>
export default {
    props: ['articles'],
    data() {
        return {

        }
    },
    methods: {
        editPost(param) {
            this.$emit('editPost', param)
        },
        deletePost(param) {
            console.log('di postcontent');
            this.$emit('deletePost', param)
        }
    }
}
</script>

<style>
    #postContent img {
        width: 100px;
        padding: 0.75rem 1.5rem;
    }
</style>