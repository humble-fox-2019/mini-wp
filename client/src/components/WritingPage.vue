<template>
  <div id="createArticlePage">
    <Navbar
      @show-login-page="showLoginPage"
      @show-dashboard-page="showDashboard"
      @show-writing-page="showWritingPage"
    ></Navbar>
    <div class="editor">
      <WritingContent @show-dashboard-page="showDashboard" :article="article"></WritingContent>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import WritingContent from "./WritingContent";
export default {
  props: ["article"],
  data: function() {
    return {};
  },
  methods: {
    showLoginPage() {
      this.$emit("show-login-page");
    },
    showDashboard() {
      this.$emit("show-dashboard-page");
    },
    showWritingPage() {
      this.$emit("show-writing-page");
    }
  },
  components: {
    Navbar,
    WritingContent
  }
};
</script>

<style>
</style>