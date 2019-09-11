<template>
  <div class="add-article">
    <div class="add-article-header">
      <h1>Add new article</h1>
    </div>
    <form spellcheck="false" @submit.prevent="addArticle()">
    <div class="add-article-title">
      <input type="text" placeholder="Article title..." v-model="title" required>
    </div>
    <div id="add-article-content">
      <froala id="edit" :tag="'textarea'" :config="config" v-model="content"></froala>
    </div>
    <div class="input-picture">
      <div class="text" v-if="image == ''">
        <span>Add thumbnail image</span>
        <i class="fas fa-camera"></i>
      </div>
      <div class="preview-picture" id="thumb-image">
      </div>
      <input type="file" class="form-control-file" ref="image" v-on:change="handleImage" required>
    </div>
    <button class="button-post" id="button-post">POST ARTICLE</button>
    </form>
    <transition name="shake">
      <div class="error" v-if="errors.length > 0">
        <ul>
          <li v-for="(error, index) in errors" :key="index"> {{ error }} </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>

import axios from '@/api/server.js'

export default {
  name: 'AddArticle',
  data () {
    return {
      config: {
        events: {
          initialized: function () {
            // console.log('initialized')
          }
        }
      },
      content: '',
      image: '',
      title: '',
      errors: []
    }
  },
  methods: {
    handleImage () {
      let reader = new FileReader()
      reader.onload = function(e) {
        document.getElementById('thumb-image').style.backgroundImage = `url('${e.target.result}')`
      }
      reader.readAsDataURL(this.$refs.image.files[0])
      this.image = this.$refs.image.files[0]
    },
    addArticle() {
      document.getElementById('button-post').innerHTML = "Loading..."
      document.getElementById('button-post').setAttribute('disabled', true)
      let formData = new FormData()
      formData.append('title', this.title)
      formData.append('content', this.content)
      formData.append('image', this.image)

      axios.post('/article', formData)
        .then(({data}) => {
          this.$router.push('/dashboard')
        })
        .catch(err => {
          if(err.response.status === 400) {
            this.errors = err.response.data.errors
          }
        })
        .finally(() => {
          document.getElementById('button-post').innerHTML = "POST ARTICLE"
          document.getElementById('button-post').removeAttribute('disabled')
        })

    }
  }
}
</script>

<style>

</style>