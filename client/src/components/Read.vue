<template>
  <div class="d-flex flex-column justify-content-start align-items-center p-5 overflow-auto">
    <h1>{{article.title}}</h1>
    <div class="d-flex align-items-center mt-2 row">
      <TagButton v-for="(tag, index) in article.tag" :key="index" :tag="tag" @findByTag="findByTag"></TagButton>
    </div>
    <hr />
    <p v-html="article.content" class="mt-3"></p>
  </div>
</template>

<script>
import TagButton from "./TagButton";
export default {
  props: ["article"],
  components: {
    TagButton
  },
  methods: {
    findByTag(data) {
      console.log(`aaaaaaaaaaaaaaaa`);
    //   console.log(data);
      this.$emit("findByTag", data);
    }
  }
};
</script>

<style scoped>
hr {
  width: 100%;
  border: 3px solid #d6d6d6;
}
h1 {
  color: #d6d6d6;
}
</style>