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
      <input type="file" accept="image/*" class="form-control-file" ref="image" v-on:change="handleImage" required>
    </div>
    <button class="button-post">POST ARTICLE</button>
    </form>
    <froalaView v-model="content"></froalaView>
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
      title: ''
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
      let formData = new FormData()
      formData.append('title', this.title)
      formData.append('content', this.content)
      formData.append('image', this.image)

      axios.post('/article', formData)
        .then(({data}) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err.response.data)
        })

    }
  }
}
</script>

<style>

</style>