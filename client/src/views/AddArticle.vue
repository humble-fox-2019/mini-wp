<template>
  <div class="add-article">
    <div class="add-article-header">
      <h1>Add new article</h1>
    </div>
    <div class="add-article-title">
      <form spellcheck="false">
        <input type="text" placeholder="Article title...">
      </form>
    </div>
    <div id="add-article-content">
      <froala id="edit" :tag="'textarea'" :config="config" v-model="model"></froala>
    </div>
    <div class="input-picture">
      <div class="text" v-if="featuredImage == ''">
        <span>Add thumbnail image</span>
        <i class="fas fa-camera"></i>
      </div>
      <div class="preview-picture" id="thumb-image">
      </div>
      <input type="file" accept="image/*" class="form-control-file" ref="featuredImage" v-on:change="handleFeaturedImage" required>
    </div>
    <button class="button-post">POST ARTICLE</button>
  </div>
</template>

<script>

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
      model: '',
      featuredImage: ''
    }
  },
  methods: {
    handleFeaturedImage () {
      let reader = new FileReader()
      reader.onload = function(e) {
        document.getElementById('thumb-image').style.backgroundImage = `url('${e.target.result}')`
      }
      reader.readAsDataURL(this.$refs.featuredImage.files[0])
      this.featuredImage = this.$refs.featuredImage.files[0]
    }
  }
}
</script>

<style>

</style>