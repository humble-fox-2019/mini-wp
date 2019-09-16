<template>
  <div>
    <div class="content-header">
      <div class="search-box">
        <label for="search"><i class="fas fa-search"></i></label>
        <input type="text" placeholder="Filter article..." @keyup="filterArticle" v-model="filterTitle">
      </div>
      <div class="user">
        <h2>{{ getUsername() }}</h2>
      </div>
    </div>
    <div class="content-body">
      <Article
        v-for="article in articles"
        :article="article"
        :key="article._id"
        @delete-article="deleteArticle"
        @update-article="updateArticle">
      </Article>
    </div>
  </div>
</template>

<script>

import axios from '@/api/server.js'
import Article from './Article'

export default {
  name: 'Articles',
  components: {
    Article
  },
  data() {
    return {
      articles: [],
      backup: [],
      filterTitle: ''
    }
  },
  methods: {
    getUsername(){
      let username = localStorage.getItem('username').toLowerCase()
      username = username[0].toUpperCase() + username.split('').slice(1).join('')
      return username
    },
    deleteArticle(articleId) {
      axios.delete(`/article/${articleId}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        let newArticles = []
        for(let i=0;i<this.articles.length;i++) {
          let article = this.articles[i]
          if(article._id == articleId){
            //skip
          }else {
            newArticles.push(article)
          }
        }
        this.articles = newArticles
      })
      .catch(err => {
        console.log(err.response.data)
      })
    },
    updateArticle(id) {
      this.$emit('update-article', id)
    },
    filterArticle(e) {
      if(this.filterTitle.length < 1) {
        this.articles = [...this.backup]
      }else {
        if((e.keyCode >= 48 && e.keyCode <= 90) || e.keyCode === 8) {
          this.articles = [...this.backup]
          let newArticles = []
          let pattern = new RegExp(this.filterTitle)
          for(let i=0;i<this.articles.length;i++) {
            if(pattern.test(this.articles[i].title)) {
              newArticles.push(this.articles[i])
            }
          }
          this.articles = newArticles
        }
      }
    }
  },
  created(){
    axios.get('/article', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(({data}) => {
        this.articles = data
        this.backup = [...data]
      })
      .catch(err => {
        if(err.response.status === 404) {
          this.$router.push('/signin')
        }
      })
  }
}
</script>

<style>

.slideup-enter-active{
  animation: fadeInDown .5s;
}
.slideup-leave-active{
  animation: fadeInUp .2s reverse;
}

</style>