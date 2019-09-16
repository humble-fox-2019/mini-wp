<template>
  <div class="article">
    <router-link :to="'/dashboard/article/' + article._id">
      <div class="article-image" :style="'background-image: url(' + article.image + ')'">
      </div>
      <div class="article-text">
        <h1> {{ article.title }} </h1>
        <div class="article-tag">
          <span v-for="(tag, index) in article.tags" :key="index">
            {{ tag }}
          </span>
        </div>
      </div>
    </router-link>
    <div class="article-action">
      <span @click="$emit('update-article', article._id)"><i class="fas fa-pencil-alt"></i></span>
      <span @click="confirmDelete"><i class="fas fa-trash"></i></span>
    </div>
    <transition name="slideup">
      <Confirmation
        v-if="showConfirmation"
        message="Are you sure want to delete article ?"
        @confirmation="deleteArticle">
      </Confirmation>
    </transition>
  </div>
</template>

<script>

import Confirmation from '../components/Confirmation'

export default {
  props: ['article'],
  components: {
    Confirmation
  },
  data() {
    return {
      showConfirmation: false
    }
  },
  methods: {
    confirmDelete() {
      this.showConfirmation = true
    },
    deleteArticle(isDelete) {
      if(isDelete) {
        this.$emit('delete-article', this.article._id)
      }else {
        this.showConfirmation = false
      }
    }
  }
}
</script>

<style>

.article-tag{
  margin: 20px 0;
}

.article-tag span{
  font-size: 8pt;
  padding: 5px 10px;
  background-color: rgb(235, 235, 235);
  border-radius: 10px;
}
.article-tag span:not(:last-child){
  margin-right: 10px;
}

</style>