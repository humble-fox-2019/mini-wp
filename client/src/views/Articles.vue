<template>
  <div>
    <div class="content-header">
      <div class="search-box">
        <label for="search"><i class="fas fa-search"></i></label>
        <input type="text" placeholder="Search article...">
      </div>
      <div class="user">
        <h2>Josprima</h2>
      </div>
    </div>
    <div class="content-body">
      <div class="article" v-for="article in articles" :key="article._id">
        <router-link :to="'/article/' + article._id">
          <div class="article-image" :style="'background-image: url(' + article.image + ')'">
          </div>
          <div class="article-text">
            <h1> {{ article.title }} </h1>
            <p> {{ article.content }} </p>
          </div>
        </router-link>
        <div class="article-action">
          <span><i class="fas fa-pencil-alt"></i></span>
          <span><i class="fas fa-trash"></i></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from '@/api/server.js'

export default {
  name: 'Articles',
  data() {
    return {
      articles: []
    }
  },
  created(){
    axios.get('/article')
      .then(({data}) => {
        this.articles = data
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }
}
</script>

<style>

</style>