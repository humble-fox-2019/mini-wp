<template>
  <article>
    <div
      :style="{'background-image' : `url('${passingarticle[0].featured_image}')` }"
      class="headline"
    >
      <h1>{{passingarticle[0].title}}</h1>
      <div class="tags">
        <vs-chip style="width: 100px" v-for="(tag, i) in passingarticle[0].tags" :key="i">{{tag}}</vs-chip>
      </div>
    </div>
    <div class="list-article">
      <div v-for="(article, index) in passingarticle" :key="index" class="card">
        <div class="content">
          <h2>
            <a
              href="#"
              style="color:black; text-decoration:none"
              @click="toThirdPage(article)"
            >{{ article.title}}</a>
          </h2>
          <p v-html="article.content"></p>
          <p>{{new Date(article.updatedAt).getFullYear()}}-{{new Date(article.updatedAt).getMonth()}}-{{new Date(article.updatedAt).getDate()}}</p>
        </div>
        <div class="img">
          <img :src="article.featured_image" alt="foto" />
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  data: function() {
    return {};
  },
  props: ["passingarticle", "passingauthor"],
  methods: {
    toThirdPage(article) {
      this.$emit("showThirdPage", article);
    }
  }
};
</script>

<style scoped>
article {
  margin-top: 20px;
  width: 800px;
  min-height: 800px;
}

.headline {
  background-size: cover;
  background-position: center;
  padding: 20px;
  width: 100%;
  height: 400px;
  background-color: #666;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.headline h1 {
  margin-bottom: 10px;
  color: white;
}

.card {
  width: 800px;
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.content {
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
  word-wrap: break-word;
  flex-direction: column;
  justify-content: space-between;
  width: 500;
  padding: 10px 20px;
}

.img {
  width: 300px;
  height: 150px;
}

.img img {
  width: 300px;
  height: 150px;
}
</style>