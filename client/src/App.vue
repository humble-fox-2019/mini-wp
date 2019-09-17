<template>
  <div>
    <LandingPage
      v-if="showLandingPage"
      @firstPageShow="changeToFirst"
      @getLoginPage="changeToLanding"
    ></LandingPage>
    <FirstPage
      v-if="showFirstPage"
      @ThirdPageShow="changeToThirdPage"
      @secondPageShow="changeToSecond"
      @landingPageShow="changeToLanding"
      :getarticle="articles"
      :getauthor="Author"
    ></FirstPage>
    <SecondPage v-if="showSecondPage" @homePageShow="changeToFirst" :passingArticle="articleUpdate"></SecondPage>
    <ThirdPage
      v-if="showThirdPage"
      :passingArticle="article3rdPage"
      :passingauthor="Author"
      @secondPageShow="changeToSecond"
      @landingPageShow="changeToLanding"
      @showSecondPage="getEditPage"
    ></ThirdPage>
  </div>
</template>

<script>
import LandingPage from "./components/landingPgae";
import FirstPage from "./components/firstPage";
import SecondPage from "./components/secondPage";
import ThirdPage from "./components/thirdPage";
import Axios from "axios";
const baseUrl = `http://35.187.228.79`;
// const baseUrl = `http://localhost:3000`;
export default {
  data: function() {
    return {
      showLandingPage: false,
      showFirstPage: false,
      showSecondPage: false,
      showThirdPage: false,
      articles: [],
      Author: "",
      article3rdPage: {},
      articleUpdate: {}
    };
  },
  components: {
    LandingPage,
    FirstPage,
    SecondPage,
    ThirdPage
  },
  methods: {
    changeToLanding() {
      this.showLandingPage = true;
      this.showFirstPage = false;
      this.showSecondPage = false;
      this.showThirdPage = false;
    },
    changeToFirst() {
      this.findAll();
      this.showLandingPage = false;
      this.showFirstPage = true;
      this.showSecondPage = false;
      this.showThirdPage = false;
    },
    changeToSecond() {
      this.showLandingPage = false;
      this.showFirstPage = false;
      this.showSecondPage = true;
      this.showThirdPage = false;
    },
    changeToThirdPage(article) {
      this.showLandingPage = false;
      this.showFirstPage = false;
      this.showSecondPage = false;
      this.showThirdPage = true;
      this.article3rdPage = article;
    },
    getEditPage(article) {
      this.articleUpdate = article;
      this.changeToSecond();
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