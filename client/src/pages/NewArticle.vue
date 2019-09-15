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
        <input class="mt-24 focus:outline-none" type="file" ref="picture" @change="addPicture" />
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
      let bodyFormData = new FormData()
      bodyFormData.append('title', this.title)
      bodyFormData.append('content', this.content)
      bodyFormData.append('image', this.featured_image)
      axios({
        method: 'post',
        url: 'http://35.187.235.228/articles',
        data: bodyFormData,
        headers: {
          token: this.token
        }
      })
        .then(({ data }) => {
          this.isLoading = false
          console.log(data)
          EventBus.$emit('changePage', { page: 'articles' })
        })
        .catch(err => {
          this.isLoading = false
          console.log(err)
        })
    },
    addPicture() {
      this.featured_image = this.$refs.picture.files[0]
    }
  }
}
</script>

<style></style>
