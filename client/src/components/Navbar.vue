<template>
  <div id="navbar">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href><i class="fab fa-wordpress"> Think Tank</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href @click.prevent="showWritingPage">Create post</b-nav-item>
          <b-nav-item href @click.prevent="showDashboard">My posts</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-nav-item id="logout-nav" href @click.prevent="logout">Logout</b-nav-item>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data: function() {
    return {};
  },
  methods: {
    showDashboard() {
      this.$emit("show-dashboard-page");
    },
    showWritingPage() {
      this.$emit("show-writing-page");
    },
    logout() {
      if (gapi.auth2) {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function() {
          console.log("User logged out successfuly.");
        });
      }

      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        Swal.fire(
          "Successfully logged out",
          "Please clicked the button to continue!",
          "success"
        );
      }
      this.$emit("show-login-page");
    }
  }
};
</script>

<style>
</style>