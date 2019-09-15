<template>
    <div class="container p-20" id="posts">
        <div v-if="alert.status === 'success'">
            <div class="absolute mt-16 mr-6 top-0 right-0 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <strong class="font-bold">Great!</strong>
                <div v-for="(msg, index) in alert.msgs" :key="index">
                    <span class="block sm:inline">{{ msg }}</span>
                </div>
            </div>
        </div>
        <h1 class="text-3xl">Posts</h1>
        <postnav class="mt-3" @searcharticle="searcharticle"></postnav>
        <pulseloader 
            v-if="loading === true" 
            class="flex justify-center"></pulseloader>
        <postcontent 
            v-else-if="loading === false"
            :articles="articles" 
            @editPost="editPost"
            @deletePost="deletePost"></postcontent>
    </div>
</template>

<script>
import axios from 'axios'
import pulseloader from '../pulseloader'
import postnav from './posts-components/postnav'
import postcontent from './posts-components/postcontent'

export default {
    components:{
        postnav,
        postcontent,
        pulseloader
    },
    props: ['alert'],
    data() {
        return {
           server: 'http://34.87.72.235',
           token: localStorage.getItem('token'),
           articles: [],
           loading: false
        }
    },
    methods: {
        getArticles() {
            this.loading = true

           axios({
               method: `get`,
               url: `${this.server}/articles`,
               headers: {
                   token: this.token
               }
           })
            .then(({ data }) =>  {
                this.loading = false
                console.log('on posts.vue', data)
                this.articles = data
            })
            .catch(err => {
                this.loading = false
                console.log(err.response.data.message)
            })
        },
        editPost(selectedArticle) {
            this.$emit('editPost', selectedArticle)
        },
        deletePost(selectedArticle) {
            axios({
                method: `delete`,
                url: `${this.server}/articles/${selectedArticle._id}`,
                headers: {
                   token: this.token
                }
            })
                .then(({data}) => {
                    this.$nextTick(() => {
                        this.getArticles()
                    })
                })
                .catch(err => {
                    this.loading = false
                    console.log(err.response.data)
                })
        },
        searcharticle(keyword) {
            this.loading = true

            axios({
                method: `get`,
                url: `${this.server}/articles/search/${keyword}`,
                headers: {
                   token: this.token
                }
            })
                .then(({data}) => {
                    this.loading = false

                    this.$nextTick(() => {
                        this.articles = data
                    })
                })
                .catch(err => {
                    this.loading = false
                    
                    console.log(err.response.data)
                })
        }
    }, 
    mounted: function () {
        this.$nextTick(() => {
            this.getArticles()
        })
    }
}
</script>

<style>

</style>