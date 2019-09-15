<template>
  <div>
    <LoginPage v-if="currentPage === 'login-page'" @show-dashboard-page="showDashboard"></LoginPage>
    <Dashboard
      v-else-if="currentPage === 'dashboard-page'"
      @show-login-page="showLoginPage"
      @show-writing-page="showWritingPage"
      @show-edit-page="showEditPage"
    ></Dashboard>
    <WritingPage
      v-else-if="currentPage === 'writing-page'"
      @show-dashboard-page="showDashboard"
      :article="article"
    ></WritingPage>
  </div>
</template>

<script>
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import WritingPage from "./components/WritingPage";

export default {
  data: function() {
    return {
      currentPage: "login-page",
      article: {}
    };
  },
  methods: {
    showLoginPage() {
      this.currentPage = "login-page";
    },
    showDashboard() {
      this.currentPage = "dashboard-page";
    },
    showWritingPage() {
      this.currentPage = "writing-page";
    },
    showEditPage(article) {
      this.article = article;
      this.currentPage = "writing-page";
    }
  },
  components: {
    LoginPage,
    Dashboard,
    WritingPage
  },
  created: function() {
    if (localStorage.getItem("token")) {
      this.currentPage = "dashboard-page";
    } else {
      this.currentPage = "login-page";
    }
  }
};
</script>

<style>
</style>