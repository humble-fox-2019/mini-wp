<template>
  <div id="dashboard">
      <NavBar @signout="$emit('signout')"></NavBar>

      <div class="container-fluid">
          <div class="row">
              <SideBar @update-dashboard-page="page = $event"></SideBar>
              <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4 pt-5">
                  <MyArticles v-if="page === 'my-article-page'" @edit-article="editArticle($event)"></MyArticles>
                  <AddArticle v-if="page === 'add-article-page'" :selectedArticle="selectedArticle"></AddArticle>
              </main>
          </div>
      </div>
  </div>
</template>

<script>
import NavBar from './NavBar';
import SideBar from './SideBar';
import MyArticles from './Article-MyArticles';
import AddArticle from './Article-AddArticle';

export default {
    data() {
        return {
            message: 'Ini Dashboard',
            page: 'my-article-page',
            selectedArticle: ''
        }
    },
    components: {
        NavBar, SideBar, MyArticles, AddArticle
    }, 
    methods: {
        editArticle(article) {
            this.selectedArticle = article;
            this.page = 'add-article-page';
        }
    }
}
</script>

<style scoped>

</style>