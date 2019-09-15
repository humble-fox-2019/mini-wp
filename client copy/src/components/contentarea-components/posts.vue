<template>
    <div class="container p-20" id="posts">
        <h1 class="text-3xl">Posts</h1>
        <postnav></postnav>
        <postcontent :articles="articles" @editPost="editPost"></postcontent>
    </div>
</template>

<script>
import axios from 'axios'
import postnav from './posts-components/postnav'
import postcontent from './posts-components/postcontent'

export default {
    components:{
        postnav,
        postcontent
    },
    props: [],
    data() {
        return {
           server: 'http://34.87.72.235',
           token: localStorage.getItem('token'),
           articles: []
        }
    },
    methods: {
        getArticles() {
           axios({
               method: `get`,
               url: `${this.server}/articles`,
               headers: {
                   token: this.token
               }
           })
            .then(({ data }) =>  {
                console.log('on posts.vue', data)
                this.articles = data
            })
            .catch(err => {
                console.log(err.response.data.message)
            })
        },
        editPost(selectedArticle) {
            this.$emit('editPost', selectedArticle)
        }
    }, 
    mounted: function () {
        console.log('hooks');
       this.getArticles()
    }
}
</script>

<style>

</style>