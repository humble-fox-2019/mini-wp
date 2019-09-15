<template>
  <div id="dashboardCard">
    <b-card-img
      src="https://upload.wikimedia.org/wikipedia/commons/f/f7/Mount_Fuji_Japan_with_Snow%2C_Lakes_and_Surrounding_Mountains.jpg"
      img-alt="Image"
      img-top
      id="cardImage"
    ></b-card-img>
    <b-card id="cardTitle" v-for="(article,index) in articles" :key="index" :title="article.title">
      <b-card-text id="cardText" v-html="article.content"></b-card-text>
      <b-card-text>{{article.createdAt}}</b-card-text>
      <div>
        <b-button id="editButton" @click.prevent="showEditArticle(article)">Edit</b-button>
        <b-button id="deleteButton" @click.prevent="deleteArticle(article._id)">Delete</b-button>
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
#dashboardCard {
  max-width: 60%;
}

#cardImage {
  max-width: 100%;
  max-height: 300px;
  margin-top: 30px;
}

#cardTitle {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

#cardText {
  text-align: justify;
}

#editButton {
  background-image: linear-gradient(to bottom right, #ffdd00, #fbb034);
  border: none;
  box-shadow: 0px 10px 10px -5px #111;
  color: #000000;
}

#deleteButton {
  background-image: linear-gradient(to bottom right, #ff0000, #990000);
  border: none;
  box-shadow: 0px 10px 10px -5px #111;
}
</style>