<template>
  <div class="w-full">
    <Loading :isLoading="isLoading" :fullPage="fullPage"></Loading>
    <div class="mx-16 mt-10">
      <form enctype="multipart/form-data" @submit.prevent="submit">
        <input
          class="text-3xl focus:outline-none"
          v-model="title"
          type="text"
          placeholder="Input your title here"
        />

        <quillEditor class="mt-4 h-64" v-model="content" ref="myQuillEditor"></quillEditor>
        <button class="mt-24 focus:outline-none">Save</button>
      </form>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import EventBus from '../eventBus'

import { quillEditor } from 'vue-quill-editor'
import axios from 'axios'

import Loading from '../helper/Loading'

export default {
  components: {
    quillEditor,
    Loading
  },
  data() {
    return {
      id: '',
      title: '',
      content: '',
      featured_image: '',
      isLoading: false,
      fullPage: true
    }
  },
  props: ['token'],
  methods: {
    submit() {
      this.isLoading = true
      axios({
        method: 'put',
        url: `http://35.187.235.228/articles/${this.id}`,
        data: {
          title: this.title,
          content: this.content
        },
        headers: {
          token: this.token
        }
      })
        .then(({ data }) => {
          this.isLoading = false
          console.log(data)
          EventBus.$emit('changePage', { page: 'articles' })
          this.id = ''
          this.title = ''
          this.content = ''
        })
        .catch(err => {
          this.isLoading = false
          console.log(err)
        })
    },
    addPicture() {
      this.featured_image = this.$refs.picture.files[0]
    },
    fetchArticle(id) {
      this.isLoading = true
      axios({
        method: 'get',
        url: `http://35.187.235.228/articles/${id}`,
        headers: {
          token: this.token
        }
      })
        .then(({ data }) => {
          this.isLoading = false
          this.title = data.title
          this.content = data.content
          this.featured_image = data.featured_image
        })
        .catch(err => {
          this.isLoading = false
          console.log(err)
        })
    }
  },

  created() {
    EventBus.$once('getArticle', payload => {
      this.id = payload.id
      this.fetchArticle(this.id)
    })
  }
}
</script>

<style></style>
