<template>
  <div class="article">
    <Navbar @toSecondPage="getSecondPage" @toLandingPage="getLandingPage"></Navbar>
    <div class="img" :style="{'background-image' : `url('${passingArticle.featured_image}')` }"></div>
    <div class="title">
      <h1 style="margin: 5px auto; text-align:center">{{passingArticle.title}}</h1>
      <hr />
    </div>
    <div class="author">
      <p>written by {{passingauthor}}</p>
      <p
        style="margin-left: 10px"
      >Published at {{new Date(passingArticle.updatedAt).getFullYear()}}-{{new Date(passingArticle.updatedAt).getMonth()}}-{{new Date(passingArticle.updatedAt).getDate()}}</p>
    </div>
    <div class="tags">
      <vs-chip color="primary" v-for="(label, index) in passingArticle.tags" :key="index">{{label}}</vs-chip>
    </div>
    <div class="content">
      <p v-html="passingArticle.content"></p>
    </div>
    <div class="btn">
      <button @click="toSecondPage(passingArticle)">Edit</button>
      <button @click="getDelete">Delete</button>
    </div>
  </div>
</template>

<script>
import Navbar from "./navbar";
export default {
  data: function() {
    return {};
  },
  props: ["passingArticle", "passingauthor"],
  components: {
    Navbar
  },
  methods: {
    getSecondPage() {
      this.$emit("secondPageShow");
    },
    getLandingPage() {
      this.$emit("landingPageShow");
    },
    toSecondPage(article) {
      this.$emit("showSecondPage", article);
    },
    getDelete() {}
  }
};
</script>

<style scoped>
.article {
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tags {
  margin-top: 20px;
}

.img {
  margin-top: 20px;
  background-size: cover;
  background-position: center;
  width: 60vw;
  height: 400px;
}

.img img {
  width: 60vw;
}
.title {
  width: 60vw;
  display: flex;
  flex-direction: column;
}

.author {
  display: flex;
  font-size: 10px;
}
.content {
  margin-top: 20px;
  width: 60vw;
}

.btn {
  width: 60vw;
  display: flex;
  justify-content: flex-end;
}

button {
  background-color: #187ecf;
  width: 100px;
  height: 30px;
  border-radius: 10px;
}
</style>