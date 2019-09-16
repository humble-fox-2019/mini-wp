<template>
  <nav>
    <h3>
      <a @click.prevent="getFirstPage" href="#">Hackticle</a>
    </h3>
    <div class="text">
      <h3>
        <a href="#">Save</a>
      </h3>
      <h3>
        <a href="#" @click.prevent="getPublish">Publish</a>
      </h3>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    getFirstPage() {
      this.$emit("changeToHome");
    },
    getPublish() {
      this.$emit("publishArticle");
    }
  }
};
</script>

<style scoped>
nav {
  width: 100vw;
  height: 50px;
  background-color: #187ecf;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

a {
  text-decoration: none;
  color: white;
}

.text a {
  text-decoration: none;
}

.text {
  display: flex;
  align-items: center;
  width: 150px;
}

h3 {
  font-family: "Work Sans", sans-serif;
  color: white;
  font-size: 30px;
}

.text h3 {
  font-size: 16px;
  margin-left: 20px;
}
</style>