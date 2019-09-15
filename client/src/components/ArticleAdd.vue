<template>
  <div class="block animated fadeIn">
    <div class="block-header block-header-default">
      <h3 class="block-title">Add new Article</h3>
      <div class="block-options">
        <div class="block-options-item">
          <code>.</code>
        </div>
      </div>
    </div>
    <div class="block-content d-flex justify-content-center">
      <div class="col-9">
        <form @submit.prevent="createPost()">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" id="title" v-model="title" />
          </div>
          <div class="form-group">
            <label for="content">Content</label>
            <quillEditor cols="30" rows="10" v-model="content"></quillEditor>
          </div>
          <div class="form-group row">
            <label class="col-12">Image</label>
            <div class="col-8">
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="image"
                  name="image"
                  ref="image"
                  v-on:change="handleImage"
                />
                <label class="custom-file-label" for="image" id="imgLabel">{{imageName}}</label>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="isPublished">Publish</label>
            <select class="form-control" id="isPublished" v-model="isPublished">
              <option value="true">Publish</option>
              <option value="false">Draff</option>
            </select>
          </div>

          <transition name="shake">
            <div class="alert alert-danger alert-dismissable" role="alert" v-if="errors.length > 0">
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
              {{errors}}
            </div>
          </transition>

          <br />
          <div class="form-group">
            <button type="submit" class="btn btn-alt-primary" id="button-add">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../api/server";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  data() {
    return {
      title: "",
      content: "",
      image: "",
      isPublished: true,
      errors: "",
      imageName: ""
    };
  },
  components: {
    quillEditor
  },
  methods: {
    handleImage() {
      let reader = new FileReader();

      reader.readAsDataURL(this.$refs.image.files[0]);
      this.image = this.$refs.image.files[0];
      this.imageName = this.$refs.image.files[0].name;
    },
    createPost() {
      let formData = new FormData();

      formData.append("title", this.title);
      formData.append("content", this.content);
      formData.append("image", this.image);
      formData.append("isPublished", this.isPublished);

      axios
        .post("/articles", formData, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data);
          this.$emit("changepage", "ArticleList");
        })
        .catch(err => {
          this.errors = err.response.data.message;

          setTimeout(() => {
            this.errors = "";
          }, 2000);
        })
        .finally(() => {});
    }
  }
};
</script>

<style>
</style>