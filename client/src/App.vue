<template>
  <div class="wrapper">
    <transition name="fade">
      <Dashboard v-if="page === 'dashboard'" @signout="signout"></Dashboard>
      <Signup v-else-if="page === 'signup'" @changepage="changePage"></Signup>
      <Signin v-else @changepage="changePage"></Signin>
    </transition>
  </div>
</template>

<script>
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import axios from "./api/server";

export default {
  data() {
    return {
      page: ""
    };
  },
  components: {
    Signin,
    Signup,
    Dashboard
  },
  methods: {
    changePage(page) {
      this.page = page;
    },
    signout() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log("User signed out.");
      });

      localStorage.clear();
      this.page = "signin";
    }
  },
  created() {
    let token = localStorage.getItem("token");
    axios
      .get(`/users/${localStorage.getItem("id")}`, {
        headers: {
          token
        }
      })
      .then(({ data }) => {
        this.page = "dashboard";
      })
      .catch(err => {
        this.page = "login";
        console.log(err.response.data);
      });
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: "Muli", sans-serif;
}
body {
  color: #535353;
}
</style>