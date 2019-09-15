<template>
    <div>
        <div class="main-container" id="allArticlePage">
            <h3 class="m-3 article-header" style="text-align: center;">List of All Articles</h3>
            <div>
                <label> Search By </label>
                <select v-model="selected">
                    <option value="title">Title</option>
                    <option value="tag">Tag</option>
                </select>
                <div v-if="selected === 'title'">
                    <div class="flex">
                        <input type="text" placeholder="search keyword . . .  " v-model="search">
                    </div>
                </div>
                <div v-else-if="selected === 'tag'">
                    <div class="flex">
                        <!-- <input type="text" placeholder="tag . . .  " v-model="tags"> -->
                        <div>
                            <vue-tags-input
                            v-model="tag"
                            :tags="tags"
                            @tags-changed="newTags => tags = newTags"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="allArticles.length == 0 ">
                <div style="display:flex; justify-content:center">
                    <h3>Nothing to show...</h3>
                </div>
            </div>
            <div v-else>
                <!-- ARTICLE CARD -->
                <div class="shadow pl-2 pt-3 mt-4" v-for="article in allArticles" :key="article._id">
                    <div class="row">
                        <div class="col-2 pb-2">
                            <!-- <img v-bind:src="article.image" alt="image" width="80px"> -->
                            <div class="image" :style="`background-image: url( ${article.image})`"></div>
                        </div>
                        <div class="col-10">
                            <div>
                                <h3 class="article-title" style="text-align: left">{{article.title}}</h3>
                                <div>
                                    <small>{{ convertDate(article.createdAt )}} - </small>
                                    <small class="font-weight-bold">By: {{ article.userId.username }}</small>
                                </div>
                                <div style="display: flex; justify-content: space-between;">
                                    <ul class="tags">
                                        <li class="tag" v-for="(tag , index) in article.tags" :key="index">{{ tag }}</li>
                                    </ul>
                                    <div style="margin-right: 20px; padding-top: 20px;">
                                        <!-- Masukin ID Article keparams -->
                                        <button class="viewMore-btn" @click="viewOne( article._id)">View More</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- END OF CARD -->
            </div>
        </div>
    </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
import server from '../api/helper'
const { axios , serverURL} = server
export default {
    data : function() {
        return {
            search: "",
            tag: "",
            tags: [],
            selected: "title"
        }  
    },
    props : ['allArticles'],
    methods: {
        convertDate( date ) {
            const months = ['January' , 'February' , 'March' , 'April' ,'May', 'June', 'July' , 'August' , 'September' , 'October' , 'November' , 'December']
            const day = new Date( date ).getDate();
            const mon = months[new Date( date ).getMonth()];
            const year = new Date( date).getFullYear();
            return `${day} ${mon} ${year}`
        },
        viewOne( articleId ) {
            this.$emit('viewArticle' , articleId )
        }
    },
    components: {
        VueTagsInput,
    },
    watch : {
        search : function () {
            if ( this.selected === 'title') {
                if ( this.search.length == 0 ) {
                    this.$emit('fetchArticle')
                } else {
                    this.$emit('searchAllArticleTitle', this.search )
                }
            } 
        },
        tags : function () {
            if ( this.selected === 'tag' ) {
                if ( this.tags.length == 0 ) {
                    this.$emit('fetchArticle')
                } else {
                    let searchTag = [];
                    this.tags.forEach( tag => {
                        searchTag.push( tag.text );
                    })
                    this.$emit('searchAllArticleTag', searchTag )
                }
            }
        }
    },
    created: function() {
        this.$emit('fetchArticle')
    }
}
</script>

<style>
    .image {
        width: 100%;
        height: 200px;
        background-size: cover;
        background-position: center;
    }
    .flex {
        display: flex;
    }
    .flex > input {
        border-radius: 15px;
        width: 100%;
        border: 2px solid grey;
        padding: 5px 10px;
    }
</style>