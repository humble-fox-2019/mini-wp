<template>
  <div class="dashboard">
    <div id="page-container" class="sidebar-o enable-page-overlay side-scroll main-content-boxed">
      <SideBar @changepage="changePage" @signout="$emit('signout')"></SideBar>

      <Header @changepage="changePage"></Header>

      <Main :page="page" @changepage="changePage"></Main>
    </div>
  </div>
</template>

<script>
import SideBar from "./SideBar";
import Main from "./Main";
import Header from "./Header";

export default {
  data() {
    return {
      page: "feed"
    };
  },
  methods: {
    changePage(page) {
      if (page === this.page) {
      } else {
        this.page = page;
      }
    }
  },
  components: {
    SideBar,
    Main,
    Header
  }
};
</script>

<style>
</style>