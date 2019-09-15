<template>
<div v-if="isShowArticle" class="container mt-5">

<articleListItem @searchByTag="$emit('searchByTag',$event)" @detailedArticle="$emit('detailedArticle',$event)" @editArticle="$emit('editArticle',$event)" @removedArticle="$emit('removedArticle',$event)" v-for="article in allArticles" :key="article._id" v-bind:article="article" v-bind:isUserArticle="isUserArticle"></articleListItem>

</div>
</template>

<script>
import articleListItem from "./articleListItem"

export default {
  props: {
    allArticles : Array,
    isUserArticle : Boolean,
    isShowArticle : Boolean
  },
  components : {
    articleListItem
  },
  data(){
    return {

    }
  },
  methods : {
    sendToParent(event){
      this.$emit("removedArticle",$event)

    }
  }
}
</script>

<style>

</style>
