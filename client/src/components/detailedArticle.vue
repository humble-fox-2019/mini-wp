<template>
  <div  class="container">
    <div style="display:flex;justify-content:center">
      <h2 class="mt-3 mb-2">{{articleDetailObj.title}}</h2>
    </div>
    <div class="p-4 mb-2" style="display:flex;flex-direction:column;">  
      <img class="mx-auto mb-3" :src="articleDetailObj.featured_image" style="height:500px;width:800px">
      <p class="text-center">deskripsi gambar</p>
    </div>
    <div class="ArticleContent" >
      <div v-html="articleDetailObj.content" style="text-align:justify;"></div>
    </div>
  </div>
</template>

<script>
export default {
    props : {
        articleDetailObj: Object
    }
};
</script>

<style scoped>
</style>
