<template>
  <div>
    <b-form-group id="input-group-title" label="Post title:" label-for="input-title">
      <b-form-input id="input-title" required placeholder="Enter post title" v-model="articleTitle"></b-form-input>
    </b-form-group>

    <div class="editor">
      <vueWysiwyg class="texteditor" v-model="articleContent"></vueWysiwyg>
    </div>
    <b-form-file placeholder="Choose an image to upload"></b-form-file>

    <b-button type="submit" variant="primary" @click.prevent="createArticle">Submit</b-button>
    <b-button type="cancel" variant="danger">Cancel</b-button>
  </div>
</template>

<script>
import axios from "axios";
const url = "http://localhost:3000";
import vueWysiwyg from "../../js/vueWysiwyg";
export default {
  props: ["article"],
  data: function() {
    return {
      articleTitle: "",
      articleContent: "",
      articleId: ""
    };
  },
  methods: {
    createArticle: function() {
      let method = null;
      let path = null;

      if (this.articleId !== "") {
        method = "PATCH";
        path = `${url}/articles/${this.articleId}`;
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
        data: {
          title: this.articleTitle,
          content: this.articleContent
        }
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
</style>