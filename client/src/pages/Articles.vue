<template>
  <div class="w-full h-full flex justify-center overflow-y-auto">
    <Loading :isLoading="isLoading" :fullPage="fullPage"></Loading>
    <div class="w-4/5">
      <div class="w-full flex mt-10 mb-4 border-b font-bold text-2xl">
        <div class="w-1/4">Title</div>
        <div class="w-1/4">Slug</div>
        <div class="w-1/4">Date</div>
        <div class="w-1/4">Action</div>
      </div>
      <div class="w-full flex mb-2" v-for="article in articles" :key="article._id">
        <div class="w-1/4 text-left">
          <button @click="getArticle(article._id)">
            {{ article.title }} <span class="underline">edit</span>
          </button>
        </div>
        <div class="w-1/4">{{ article.slug }}</div>
        <div class="w-1/4">{{ new Date(article.createdAt).toISOString().split('T')[0] }}</div>
        <div class="w-1/4">
          <button @click="removeArticle(article._id)" class="text-red-600">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '../eventBus'
import axios from 'axios'
import Loading from '../helper/Loading'

export default {
  components: {
    Loading
  },
  data() {
    return {
      articles: [],
      isLoading: false,
      fullPage: true
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
      this.isLoading = true
      axios({
        method: 'delete',
        url: `http://35.187.235.228/articles/${id}`,
        // url: `http://localhost:3000/articles/${id}`,
        headers: {
          token: this.token
        }
      })
        .then(({ data }) => {
          this.isLoading = false
          this.fetchArticles()
        })
        .catch(err => {
          this.isLoading = false
          console.log(err)
        })
    },
    fetchArticles() {
      this.isLoading = true
      axios({
        method: 'get',
        url: 'http://35.187.235.228/articles/',
        headers: {
          token: this.token
        }
      })
        .then(({ data }) => {
          this.isLoading = false
          // console.log(data)
          this.articles = data
          console.log(this.articles)
        })
        .catch(err => {
          this.isLoading = false
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
