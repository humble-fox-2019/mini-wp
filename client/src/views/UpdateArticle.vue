<template>
  <div class="add-article">
    <div class="add-article-header">
      <h1>Update article</h1>
    </div>
    <form spellcheck="false" @submit.prevent="updateArticle()">
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
      <div class="preview-picture" id="thumb-image" :style="`background-image: url(${image})`">
      </div>
      <input type="file" class="form-control-file" ref="image" @change="handleImage">
    </div>
    <button class="button-post" id="button-post">UPDATE ARTICLE</button>
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

import axios from '../api/server'

export default {
  name: 'updateArticle',
  data() {
    return {
      config: {
        events: {
          initialized: function () {
          }
        }
      },
      title: '',
      content: '',
      image: '',
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
    updateArticle() {
      document.getElementById('button-post').innerHTML = "Loading..."
      document.getElementById('button-post').setAttribute('disabled', true)

      let formData = new FormData()

      formData.append('title', this.title)
      formData.append('content', this.content)
      formData.append('image', this.image)

      axios.put(`/article/${this.$route.params.id}`, formData, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.$router.push('/dashboard')
        })
        .catch(err => {
          if(err.response.status === 400) {
            this.errors = err.response.data.errors
          }
        })
        .finally(() => {
          document.getElementById('button-post').innerHTML = "UPDATE ARTICLE"
          document.getElementById('button-post').removeAttribute('disabled')
        })
    }
  },
  beforeCreate() {
    axios.get(`/article/${this.$route.params.id}`, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      this.title = data.article.title
      this.content = data.article.content
      this.image = data.article.image
    })
    .catch(err => {
      console.log(err.response.data)
    })
  }
}
</script>

<style>

</style>