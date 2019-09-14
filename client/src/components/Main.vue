<template>
  <main id="main-container">
    <!-- Page Content -->
    <div class="content">
      <ArticleList v-if="page === 'ArticleList'" @changepage="changePage"></ArticleList>
      <ArticleAdd v-else-if="page === 'ArticleAdd'" @changepage="changePage"></ArticleAdd>
      <Profile v-else-if="page === 'Profile'" @changepage="changePage"></Profile>
      <DashboardMenu v-else @changepage="changePage"></DashboardMenu>
    </div>
    <!-- END Page Content -->
  </main>
</template>

<script>
import ArticleList from "./ArticleList";
import ArticleAdd from "./ArticleAdd";
import DashboardMenu from "./DashboardMenu";
import Profile from "./Profile";

export default {
  props: ["page"],
  data() {
    return {};
  },
  methods: {
    changePage(page) {
      this.$emit("changepage", page);
    }
  },
  components: {
    ArticleList,
    ArticleAdd,
    DashboardMenu,
    Profile
  }
};
</script>

<style>
</style>