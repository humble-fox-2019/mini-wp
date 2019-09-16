<template>
  <div class="main">
    <Navbar :isLogin="isLogin" @logout="logout" @searchByKey="searchByKey"></Navbar>
    <div id="main-content">
      <SignForm v-if="!isLogin" @login="login()"></SignForm>
      <AfterLogin v-if="isLogin" :articlesFeeds="articlesfeeds"></AfterLogin>
    </div>
  </div>
</template>

<script>
import AfterLogin from "./components/AfterLogin";
import Navbar from "./components/Navbar";
import SignForm from "./components/SignForm";
import { url, axios, sweetalert } from "../apis/server";
export default {
  data() {
    return {
      isLogin: false,
      articlesfeeds: []
    };
  },
  methods: {
    login(){
      this.checkLogin();
    },
    searchByKey(data) {
      this.articlesfeeds = data;
    },
    checkLogin() {
      if (localStorage.getItem("token")) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    logout() {
      localStorage.clear();
      this.checkLogin();
    }
  },
  components: {
    Navbar,
    SignForm,
    AfterLogin
  },
  watch() {
    articlesfeeds: (val) => {
        console.log(val, `aasdasdasdsafs`);
    };
  },
  created: function() {
    this.checkLogin();
  }
};
</script>

<style scoped>
.main {
  background-color: black;
  min-height: 100vh;
}
</style>