<template>
  <div id="dashboardPage">
    <Navbar @show-login-page="showLoginPage" @show-writing-page="showWritingPage"></Navbar>
    <ArticleCard @show-dashboard-page="showDashboard" @show-edit-page="showEditPage"></ArticleCard>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import ArticleCard from "./ArticleCard";
export default {
  data: function() {
    return {};
  },
  methods: {
    showLoginPage() {
      this.$emit("show-login-page");
    },
    showDashboard() {
      this.$emit("show-dashboard-page");
      this;
    },
    showWritingPage() {
      this.$emit("show-writing-page");
    },
    showEditPage(article) {
      this.$emit("show-edit-page", article);
    }
  },
  components: {
    Navbar,
    ArticleCard
  }
};
</script>

<style>
</style>