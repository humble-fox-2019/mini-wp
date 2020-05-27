<template>
  <div id="one-for-all">
    <landing-page @goLogin="goLogin" v-if="landing"></landing-page>
    <login-page @goRegister="goRegister" @goHome="goHome" v-if="login"></login-page>
    <register-page @goHome="goHome" v-if="register"></register-page>
    <home-page @goLanding="goLanding" v-if="home"></home-page>
  </div>
</template>

<script>
import landingPage from "./views/landing";
import loginPage from "./views/login";
import registerPage from "./views/register";
import homePage from "./views/home";

import apis from "./apis/index";
const { server, axios } = apis;

export default {
  components: {
    landingPage,
    loginPage,
    registerPage,
    homePage
  },
  data() {
    return {
      //pages
      landing: false,
      login: false,
      register: false,
      home: false,

    };
  },
  methods: {
    //pages
    blank() {
      this.landing = false;
      this.login = false;
      this.register = false;
      this.home = false;
    },

    goLanding() {
      this.blank();
      this.landing = true;
    },

    goLogin() {
      this.blank();
      this.login = true;
    },

    goRegister() {
      this.blank();
      this.register = true;
    },

    goHome() {
      this.blank();
      this.home = true;
    },
    
  },

  //hooks
  created() {
    //pages
    if (localStorage.token) {
      this.goHome()
    } else {
      this.goLanding()
    }
  },
  mounted() {
    document.body.style.display = "block";
  },
};
</script>

<style>
  @import "./assets/base.css";
  @import "./assets/play-blog.css";
</style>