<template>
  <div class="col-10 card d-flex flex-row align-items-center mb-3 p-2" style="border-radius: 10px">
    <img class="ml-1" :src="article.featured_image" alt="" style="object-fit: cover; border-radius: 8px" width="40%">
    <div class="card-body ml-2">
        <h5 class="card-title"> {{ article.title }} </h5>
        <p> {{ article.content }} </p>
        <p> {{ new Date(article.createdAt) }} </p>
    </div>
    <button class="btn btn-secondary align-self-end mr-1 mb-2" @click="editArticle(article._id, article.content, article.title, article.featured_image)">Edit</button>
    <button class="btn btn-secondary align-self-end mr-2 mb-2" @click="$emit('delete-article', article._id)">Delete</button>
</div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: ['article'],
  methods: {
    editArticle(_id, content, title, featured_image) {
      let article = {_id, content, title, featured_image};
      this.$emit('edit-article', article);
    }
  }, 
  computed: {
    dateCreated(strDate) {
      
    }
  }
}
</script>

<style>

</style>