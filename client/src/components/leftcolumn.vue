<template>
  <div id="column-left">
    <div class="box">
      <h3>Welcome, {{name}}</h3> 
    </div>
    <div class="box">
      <a class="dalambox" href="#" @click="checkBody">
        <i class="fas fa-laptop"></i> View Articles
      </a>
    </div>
    <div class="box">
      <a class="dalambox" href="#" @click="checkMine">
        <i class="fas fa-user"></i> My Articles
      </a>
    </div>
  </div>
</template>

<script>
export default {
    props:['name'],
  data() {
    return {};
  },
  methods: {
      checkBody(){
          this.$emit('seeArticles')
      },
      checkMine(){
          this.$emit('myArticles')
      }
  }
};
</script>
<style scoped>
#column-left {
    height: 700px;
    background-color: white;
    width: 20%;
    overflow: auto;
    font-size: 100%;
}
.box {
    padding: 10px;
}
.dalambox {
    color: black;
}
a {
    text-decoration: none;
}

</style>