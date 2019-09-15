<template>
    <form>
        <div class="form-group">
            <label>Title</label>
            <input type="text" class="form-control" id="title" placeholder="Enter the title" v-model="article.title">
        </div>
        <div class="form-group">
            <label>Content</label>
            <textarea class="form-control" id="content" cols="30" rows="10" v-model="article.content"></textarea>
        </div>
        <div class="form-group">
            <label>Featured Image</label>
            <input class="form-control" id="featured_image" placeholder="url to image" v-model="article.featured_image">
        </div>

        <div v-if="selectedArticle">
            <button type="submit" class="btn btn-secondary" @click.prevent="updateArticle(article._id)">Update</button>
        </div>
        <div v-else>
            <button type="submit" class="btn btn-secondary" @click.prevent="insertArticle">Save</button>
        </div>
    </form>
</template>

<script>
import axios from '../api/server';

export default {
    data() {
        return {
            article: {
                title: '',
                content: '',
                featured_image: ''
            }
        }
    },
    props: ['selectedArticle'],
    methods: {
        clearForm() {
            this.article.title = '';
            this.article.content = '';
            this.article.featured_image = '';
        }, 

        insertArticle() {
            axios({
                url: '/articles',
                method: 'POST',
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    title: this.article.title,
                    content: this.article.content,
                    featured_image: this.article.featured_image
                }
            }).then(({ data }) => {
                console.log(data);
                this.clearForm();
                this.$toasted.show("Succesfully save the article");
            }).catch(err => {
                if(err.response) {
                    console.log(err.response.data.errors);
                    err.response.data.errors.forEach(error => {
                        this.$toasted.show(error);
                    });
                } else {
                    console.log(err.message);
                    this.$toasted.show(err.message);
                }
            });
        }, 
        updateArticle(id) {
            axios({
                url: `/articles/${id}`,
                method: 'PUT',
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    title: this.article.title,
                    content: this.article.content,
                    featured_image: this.article.featured_image
                }
            }).then(({ data }) => {
                console.log(data);
                this.clearForm();
                this.$toasted.show("Succesfully update the article");
            }).catch(err => {
                if(err.response) {
                    console.log(err.response.data.errors);
                    err.response.data.errors.forEach(error => {
                        this.$toasted.show(error);
                    });
                } else {
                    console.log(err.message);
                    this.$toasted.show(err.message);
                }
            });
        }
    },
    created() {
        if (this.selectedArticle) {
            this.article = this.selectedArticle;
        }
    }
}
</script>

<style>

</style>