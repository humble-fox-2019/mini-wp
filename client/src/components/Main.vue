<template>
  <main id="main-container">
    <!-- Page Content -->
    <div class="content">
      <ArticleList
        v-if="page === 'ArticleList'"
        :page="page"
        @changepage="changePage"
        @setarticleid="setArticleId"
      ></ArticleList>
      <ArticleAdd v-else-if="page === 'ArticleAdd'" @changepage="changePage"></ArticleAdd>
      <ArticleEdit
        v-else-if="page === 'ArticleEdit'"
        @changepage="changePage"
        :articleid="articleId"
      ></ArticleEdit>
      <Profile v-else-if="page === 'Profile'" @changepage="changePage"></Profile>
      <DashboardMenu v-else @changepage="changePage"></DashboardMenu>
    </div>
    <!-- END Page Content -->
  </main>
</template>

<script>
import ArticleList from "./ArticleList";
import ArticleAdd from "./ArticleAdd";
import ArticleEdit from "./ArticleEdit";
import DashboardMenu from "./DashboardMenu";
import Profile from "./Profile";

export default {
  props: ["page"],
  data() {
    return {
      articleId: null
    };
  },
  methods: {
    changePage(page) {
      this.$emit("changepage", page);
    },
    setArticleId(id) {
      this.articleId = id;
    }
  },
  components: {
    ArticleList,
    ArticleAdd,
    ArticleEdit,
    DashboardMenu,
    Profile
  }
};
</script>

<style>
</style>