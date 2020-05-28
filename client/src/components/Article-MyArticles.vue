<template>
  <div id="article-page">
    <!-- header content -->
    <ContentHeader :title="headerTitle"></ContentHeader>

    <!-- content -->
    <div class="container">
        <div class="row justify-content-center" v-for="article in articles" :key="article._id">
            <!-- Cards -->
            <ArticlePost :article="article" @delete-article="deleteArticle($event)" @edit-article="$emit('edit-article', $event)"></ArticlePost>
        </div>

    </div>
</div>
</template>

<script>
import ContentHeader from './ContentHeader';
import ArticlePost from './Article-Post';
import axios from '../api/server';

export default {
    data() {
        return {
            headerTitle: 'My Article',
            articles: []
        }
    },
    components: {
        ContentHeader, ArticlePost
    },
    methods: {
        fetchArticles() {
            axios({
                url: '/articles',
                method: 'GET',
                headers: {
                    token: localStorage.getItem('token')
                }
            }).then(({ data }) => {
                console.log(data)
                this.articles = data;
            }).catch(err => {
                if(err.response) {
                    console.log(err.response.data.errors);
                    this.$toasted.show(err.response.data.errors[0]);
                } else {
                    console.log(err.message);
                }
            });
        },
        deleteArticle(id) {
            // console.log(id)
            axios({
                url: `/articles/${id}`,
                method: 'DELETE',
                headers: {
                    token: localStorage.getItem('token')
                }
            }).then(({ data }) => {
                let newArticles = [];
                this.articles.forEach(article => {
                    if (article._id !== id) {
                        newArticles.push(article)
                    }
                });

                this.articles = newArticles;
            }).catch(err => {
                if(err.response) {
                    console.log(err.response.data.errors);
                    this.$toasted.show(err.response.data.errors[0]);
                } else {
                    console.log(err.message);
                }
            });
        }
    },
    mounted() {
        this.fetchArticles();
    }
}
</script>

<style>

</style>