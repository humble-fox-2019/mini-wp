<template>
  <div class="container">
    <Navbar @toSecondPage="getSecondPage" @toLandingPage="getLandingPage"></Navbar>
    <Article :passingarticle="getarticle" :passingauthor="getauthor"></Article>
  </div>
</template>

<script>
import Navbar from "./navbar";
import Article from "./article";
export default {
  data: function() {
    return {};
  },
  components: {
    Navbar,
    Article
  },
  methods: {
    getSecondPage() {
      this.$emit("secondPageShow");
    },
    getLandingPage() {
      this.$emit("landingPageShow");
    }
  },
  props: ["getarticle", "getauthor"]
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>