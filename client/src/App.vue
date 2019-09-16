<template>
  <div>
    <LandingPage
      v-if="showLandingPage"
      @firstPageShow="changeToFirst"
      @getLoginPage="changeToLanding"
    ></LandingPage>
    <FirstPage
      v-if="showFirstPage"
      @secondPageShow="changeToSecond"
      @landingPageShow="changeToLanding"
      :getarticle="articles"
      :getauthor="Author"
    ></FirstPage>
    <SecondPage v-if="showSecondPage" @homePageShow="changeToFirst"></SecondPage>
  </div>
</template>

<script>
import LandingPage from "./components/landingPgae";
import FirstPage from "./components/firstPage";
import SecondPage from "./components/secondPage";
import Axios from "axios";
const baseUrl = `http://35.187.228.79`;
export default {
  data: function() {
    return {
      showLandingPage: false,
      showFirstPage: false,
      showSecondPage: false,
      articles: [],
      Author: ""
    };
  },
  components: {
    LandingPage,
    FirstPage,
    SecondPage
  },
  methods: {
    changeToLanding() {
      this.showLandingPage = true;
      this.showFirstPage = false;
      this.showSecondPage = false;
    },
    changeToFirst() {
      this.findAll();
      this.showLandingPage = false;
      this.showFirstPage = true;
      this.showSecondPage = false;
    },
    changeToSecond() {
      this.showLandingPage = false;
      this.showFirstPage = false;
      this.showSecondPage = true;
    },
    findAll() {
      Axios({
        method: "get",
        url: `${baseUrl}/articles/userId`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.articles = data.articles;
          this.Author = data.Author;
          console.log({ articles: this.articles, author: this.Author });
        })
        .catch(err => {});
    }
  },
  created: function() {
    this.findAll();
    if (!localStorage.getItem("token")) {
      this.showLandingPage = true;
    } else {
      this.showFirstPage = true;
    }
  }
};
</script>

<style>
</style>