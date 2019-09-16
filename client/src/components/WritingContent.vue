<template>
  <div id="contentBlanket">
    <div id="contentBox">
      <b-form-group id="input-group-title" label="Post title:" label-for="input-title">
        <b-form-input
          id="input-title"
          required
          placeholder="Enter post title"
          v-model="articleTitle"
        ></b-form-input>
      </b-form-group>

      <div class="editor">
        <vueWysiwyg class="texteditor" v-model="articleContent"></vueWysiwyg>
      </div>
      <b-form-file v-model="articleImage" placeholder="Choose an image to upload" required></b-form-file>

      <div id="contentButtonGroup">
        <b-button type="submit" @click.prevent="createArticle" id="contentSubmitButton">Submit</b-button>
        <b-button type="cancel" @click.prevent="showDashboard" id="contentCancelButton">Cancel</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// const url = "http://localhost:3000";
const url = "http://35.246.229.159";
import vueWysiwyg from "../../js/vueWysiwyg";
import Swal from "sweetalert2";

export default {
  props: ["article"],
  created: function() {
    if (this.article.title) {
      this.articleTitle = this.article.title;
      this.articleContent = this.article.content;
    }
  },
  data: function() {
    return {
      articleTitle: "",
      articleContent: "",
      articleImage: null
    };
  },
  methods: {
    showDashboard() {
      this.$emit("show-dashboard-page");
    },
    createArticle: function() {
      let formData = new FormData();
      formData.append("image", this.articleImage);
      formData.append("title", this.articleTitle);
      formData.append("content", this.articleContent);
      Swal.showLoading();

      let method = null;
      let path = null;

      if (this.article._id) {
        method = "PATCH";
        path = `${url}/articles/${this.article._id}`;
      } else {
        method = "POST";
        path = `${url}/articles`;
      }
      axios({
        method,
        url: path,
        headers: {
          token: localStorage.getItem("token")
        },
        data: formData
      })
        .then(({ data }) => {
          console.log("Post is successfully created or updated");
          console.log(data);
          Swal.fire(
            "Success!",
            "Please clicked the button to continue!",
            "success"
          );
          this.$emit("show-dashboard-page");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {
    vueWysiwyg: vueWysiwyg.component
  },
  watch: {
    newPost: function() {
      this.$emit("create-content", {
        title: this.title,
        content: this.content
      });
    }
  }
};
</script>

<style>
#contentBlanket {
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  font-family: "Crimson Pro";
}

#contentBox {
  max-width: 60%;
  font-family: "Crimson Pro";
}

#contentButtonGroup {
  margin-top: 20px;
}

#contentSubmitButton {
  background-image: linear-gradient(to bottom right, #74d680, #378b29);
  border: none;
  box-shadow: 0px 10px 10px -5px #111;
  text-align: left;
  font-family: "Crimson Pro";
}

#contentSaveButton {
  background-image: linear-gradient(to bottom right, #ffdd00, #fbb034);
  border: none;
  box-shadow: 0px 10px 10px -5px #111;
  color: #000000;
  text-align: left;
  font-family: "Crimson Pro";
}

#contentCancelButton {
  background-image: linear-gradient(to bottom right, #ff0000, #990000);
  border: none;
  box-shadow: 0px 10px 10px -5px #111;
  text-align: left;
  font-family: "Crimson Pro";
}
</style>