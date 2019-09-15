<template>
  <div id="dashboardBlanket">
    <div id="dashboardCard" v-for="(article,index) in articles" :key="index">
      <b-card-img
        src="https://upload.wikimedia.org/wikipedia/commons/f/f7/Mount_Fuji_Japan_with_Snow%2C_Lakes_and_Surrounding_Mountains.jpg"
        img-alt="Image"
        img-top
        id="cardImage"
      ></b-card-img>
      <b-card id="cardTitle" :title="article.title">
        <b-card-text id="cardText" v-html="article.content"></b-card-text>
        <b-card-text id="cardDate">Last update: {{dateConverter(article.updatedAt)}}</b-card-text>
        <div>
          <b-button id="editButton" @click.prevent="showEditArticle(article)">Edit</b-button>
          <b-button id="deleteButton" @click.prevent="deleteArticle(article._id)">Delete</b-button>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
const url = "http://35.246.229.159";
export default {
  data: function() {
    return {
      articles: []
    };
  },
  methods: {
    dateConverter(value) {
      return new Date(value).toTimeString();
    },
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
#dashboardBlanket {
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  border: none;
  font-family: "Crimson Pro";
}

#dashboardCard {
  max-width: 60%;
  border: none;
  font-family: "Crimson Pro";
}

#cardImage {
  max-width: 100%;
  max-height: 300px;
  margin-top: 30px;
  border: none;
}

#cardTitle {
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
  border: none;
  font-family: "Crimson Pro";
}

#cardText {
  text-align: justify;
  margin-top: 20px;
  border: none;
  font-family: "Crimson Pro";
}

#cardDate {
  text-align: justify;
  margin-bottom: 20px;
  border: none;
  font-family: "Crimson Pro";
}

#editButton {
  background-image: linear-gradient(to bottom right, #ffdd00, #fbb034);
  border: none;
  box-shadow: 0px 10px 10px -5px #111;
  color: #000000;
  text-align: left;
  font-family: "Crimson Pro";
}

#deleteButton {
  background-image: linear-gradient(to bottom right, #ff0000, #990000);
  border: none;
  box-shadow: 0px 10px 10px -5px #111;
  text-align: left;
  font-family: "Crimson Pro";
}
</style>