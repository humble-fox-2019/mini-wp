<template>
  <main id="main-container">
    <!-- Page Content -->
    <div class="content">
      <PostList v-if="page === 'PostList'" @changepage="changePage"></PostList>
      <PostAdd v-else-if="page === 'PostAdd'" @changepage="changePage"></PostAdd>
      <Profile v-else-if="page === 'Profile'" @changepage="changePage"></Profile>
      <DashboardMenu v-else @changepage="changePage"></DashboardMenu>
    </div>
    <!-- END Page Content -->
  </main>
</template>

<script>
import PostList from "./PostList";
import PostAdd from "./PostAdd";
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
    PostList,
    PostAdd,
    DashboardMenu,
    Profile
  }
};
</script>

<style>
</style>