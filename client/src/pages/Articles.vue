<template>
  <div class="w-full h-full flex justify-center">
    <div class="w-4/5">
      <!-- <table class="w-full text-left mt-10 table-auto">
        <thead>
          <tr>
            <th class="w-2/5">Title</th>
            <th class="w-2/5">Slug</th>
            <th class="w-1/5">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in articles" :key="article._id">
            <td>{{ article.title }}</td>
            <td>{{ article.content }}</td>
            <td>{{ new Date(article.createdAt).toISOString().split('T')[0] }}</td>
          </tr>
        </tbody>
      </table> -->
      <div class="w-full flex mt-10 mb-4 border-b">
        <div class="w-1/4">Title</div>
        <div class="w-1/4">Slug</div>
        <div class="w-1/4">Date</div>
        <div class="w-1/4">Action</div>
      </div>
      <div class="w-full flex mb-2" v-for="article in articles" :key="article._id">
        <div class="w-1/4">
          <button @click="getArticle(article._id)">{{ article.title }}</button>
        </div>
        <div class="w-1/4">{{ article.slug }}</div>
        <div class="w-1/4">{{ new Date(article.createdAt).toISOString().split('T')[0] }}</div>
        <div class="w-1/4">
          <button @click="removeArticle(article._id)">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '../eventBus'
import axios from 'axios'

export default {
  data() {
    return {
      articles: []
    }
  },
  props: ['token'],
  methods: {
    getArticle(id) {
      const payload = {
        id
      }
      EventBus.$emit('changePage', { page: 'edit-article' })
      // setTimeout(() => { EventBus.$emit('getArticle', payload) }, 100)
      this.$nextTick(() => {
        EventBus.$emit('getArticle', payload)
      })
    },
    removeArticle(id) {
      axios({
        method: 'delete',
        url: `http://localhost:3000/articles/${id}`,
        headers: {
          token: this.token
        }
      })
        .then(({ data }) => {
          // console.log(data)
          // this.articles = data
          this.fetchArticles()
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchArticles() {
      axios({
        method: 'get',
        url: 'http://localhost:3000/articles',
        headers: {
          token: this.token
        }
      })
        .then(({ data }) => {
          // console.log(data)
          this.articles = data
          console.log(this.articles)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.fetchArticles()
  }
}
</script>

<style></style>
