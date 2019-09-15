<template>
  <div id="dashboardCard">
    <b-card v-for="(article,index) in articles" :key="index" :title="article.title">
      <b-card-text>{{article.createdAt}}</b-card-text>
      <b-card-text v-html="article.content"></b-card-text>
      <div>
        <b-button variant="warning" @click.prevent="showEditArticle(article)">Edit</b-button>
        <b-button variant="danger" @click.prevent="deleteArticle(article._id)">Delete</b-button>
      </div>
    </b-card>"
  </div>
</template>

<script>
import axios from "axios";
const url = "http://localhost:3000";
export default {
  data: function() {
    return {
      articles: []
    };
  },
  methods: {
    fetchArticle() {
      axios({
        method: "GET",
        url: `${url}/articles`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          console.log("Articles successfully fetched from the server");
          console.log(data);
          this.articles = data;
        })
        .catch(err => {
          console.log(err);
          this.$emit("show-dashboard-page");
        });
    },
    deleteArticle: function(id) {
      axios({
        method: "DELETE",
        url: `${url}/articles/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          console.log("Post is successfully deleted");
          console.log(data);
          Swal.fire(
            "Post is successfuly deleted!",
            "Please clicked the button to continue!",
            "success"
          );
          this.fetchArticle();
        })
        .catch(err => {
          console.log(err);
        });
    },
    showEditArticle(article) {
      this.$emit("show-edit-page", article);
    }
  },
  created: function() {
    this.fetchArticle();
  }
};
</script>

<style>
</style>