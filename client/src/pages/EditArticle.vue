<template>
  <div class="w-full">
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

export default {
  components: {
    quillEditor
  },
  data() {
    return {
      id: '',
      title: '',
      content: ''
      // featured_image: ''
    }
  },
  props: ['token'],
  methods: {
    submit() {
      axios({
        method: 'put',
        url: `http://localhost:3000/articles/${this.id}`,
        data: {
          title: this.title,
          content: this.content
        },
        headers: {
          token: this.token
        }
      })
        .then(({ data }) => {
          console.log(data)
          EventBus.$emit('changePage', {page: 'articles'})
          this.id = ''
          this.title = ''
          this.content = ''
        })
        .catch(err => {
          console.log(err)
        })
    },
    addPicture() {
      this.featured_image = this.$refs.picture.files[0]
    },
    fetchArticle(id) {
      axios({
        method: 'get',
        url: `http://localhost:3000/articles/${id}`,
        headers: {
          token: this.token
        }
      })
        .then(({ data }) => {
          this.title = data.title
          this.content = data.content
          this.featured_image = data.featured_image
        })
        .catch(err => {
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
