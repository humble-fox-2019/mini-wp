<template>
  <div v-if="isCreate">
    <b-container class="mt-4">
      <b-form @submit.prevent="createArticle">
        <div class="form-group d-flex justify-content-center">
          <input
            v-model="articleTitle"
            type="text"
            class="form-control sharea"
            placeholder="Enter title"
            style="width:40%; height: 40px; font-size: 20px; text-align: center; padding-bottom: 0;"
          />
        </div>
        <div class="mb-3">
          <input type="file" @change="previewFile" name="image" ref="file" accept="image/*" />
        </div>
        <div>
          <vue-tags-input v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags" />
        </div>
        <div>
          <wysiwyg style="text-overflow:auto" v-model="articleContent"></wysiwyg>
        </div>
        <b-button type="submit" variant="dark">Submit</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";
import axios from "axios";

export default {
  components: {
    VueTagsInput
  },
  props: {
    isCreate: Boolean
  },
  data() {
    return {
      articleTitle: "",
      articleContent: "",
      articleImage: "",
      tags :[],
      tag : ""
    };
  },
  methods: {
    createArticle() {
      // console.log(this.tags)
      let tags = []
      for (let tag of this.tags){
        tags.push(tag.text)
      }
      // console.log(tags[0])
      let title = this.articleTitle;
      let content = this.articleContent;
      let image = this.articleImage;
      let featured_image = "";
      let token = localStorage.getItem("token");
      var bodyFormData = new FormData();
      bodyFormData.append("image", image);
      bodyFormData.append("title", title);
      bodyFormData.append("content", content);
      bodyFormData.append("tags", tags)
      // console.log(bodyFormData)
      Swal.fire({
        title: "Creating your article...",
        allowOutsideClick: () => !Swal.isLoading()
      });
      Swal.showLoading();
      axios({
        url: "http://localhost:3000/articles",
        method: "POST",
        data: bodyFormData,
        headers: {
          token
        }
      })
        .then(response => {
          console.log(response);
          this.articleTitle = "";
          this.articleContent = "";
          this.articleImage = "";
          this.tags= []
          this.tag =""
          Swal.close();
          Swal.fire({
            type: "success",
            title: "You Have Created Article !",
            showConfirmButton: false,
            timer: 1500
          });
          this.$emit("addArticle", true);
          this.$emit("showPage", "AllArticle");
        })
        .catch(err => {
          let message = err.response.data.message;
          // swal("Error!", errMessage , "error")
          Swal.fire({
            type: "error",
            title: "failed created article!",
            text: message
          });
        });
    },
    previewFile(event) {
      this.articleImage = event.target.files[0];
    }
  }
};
</script>

<style scoped>
</style>
