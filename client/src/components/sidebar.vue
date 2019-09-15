<template>
    <div>
                <!-- The sidebar -->
        <aside>
        <div class="sidebar">
            <a href="" @click.prevent="goToHome">Home</a>
            <!-- <a href="" @click.prevent="fetchMyArticle">Your Article</a> -->
            <a href="" @click.prevent="goToCreate" id="create-article">Create article</a>
            <a href="#about">About</a>
        </div>
        </aside>
    </div>
</template>

<script>
export default {
    methods:{
        goToHome(){
            this.$emit("goToHome")
        },
        goToCreate(){
            this.$emit("goToCreate")
        }
    }
}
</script>

<style scoped>
  /* The side navigation menu */
.sidebar {
    margin: 0;
    padding: 0;
    width: 200px;
    background-color: #f1f1f1;
    position: absolute;
    height: 100%;
    overflow: auto;
  }
  /* Sidebar links */
  .sidebar a {
    display: block;
    color: black;
    padding: 16px;
    text-decoration: none;
  }
  
  /* Active/current link */
  .sidebar a.active {
    background-color: #4CAF50;
    color: white;
  }
  
  /* Links on mouse-over */
  .sidebar a:hover:not(.active) {
    background-color: #555;
    color: white;
  }
</style>