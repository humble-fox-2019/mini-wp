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
            <quillEditor v-model="content"></quillEditor>
          </div>
          <br />
          <br />
          <br />
          <div class="form-group row">
            <label class="col-12">Image</label>
            <div class="col-8">
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="featured_image"
                  name="featured_image"
                  ref="featured_image"
                  v-on:change="handleImage"
                />
                <label class="custom-file-label" for="featured_image" id="imgLabel">{{imageName}}</label>
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
          <multiselect
            v-model="tags"
            tag-placeholder="Add this as new tag"
            placeholder="Add a tag"
            :options="options"
            :multiple="true"
            :taggable="true"
            @tag="addTag"
          ></multiselect>
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
import Multiselect from "vue-multiselect";

export default {
  data() {
    return {
      title: "",
      content: "",
      featured_image: "",
      isPublished: true,
      errors: "",
      imageName: "",
      tags: [],
      options: []
    };
  },
  components: {
    quillEditor,
    Multiselect
  },
  methods: {
    handleImage() {
      let reader = new FileReader();

      reader.readAsDataURL(this.$refs.featured_image.files[0]);
      this.featured_image = this.$refs.featured_image.files[0];
      this.imageName = this.$refs.featured_image.files[0].name;
    },
    createPost() {
      let formData = new FormData();

      formData.append("title", this.title);
      formData.append("content", this.content);
      formData.append("featured_image", this.featured_image);
      formData.append("isPublished", this.isPublished);
      formData.append("tags", this.tags);

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
    },
    addTag(newTag) {
      this.tags.push(newTag);
    }
  }
};
</script>

<style lang="scss" scoped>
.quill-editor,
.quill-code {
  height: 20rem;
}
.quill-editor {
  border: 1px solid #ccc;
  border-bottom: none;
}
.quill-code {
  border: none;
  height: auto;
  > code {
    width: 100%;
    margin: 0;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 0;
    height: 10rem;
    overflow-y: auto;
  }
}
</style>