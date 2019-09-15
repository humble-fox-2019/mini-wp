<template>
  <div id="createArticlePage">
    <Navbar></Navbar>
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
    showDashboard() {
      alert("masuk writing page");
      this.$emit("show-dashboard-page");
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