<template>
  <div>
    <b-container class="mt-4 d-flex flex-column">
      <b-form @submit.prevent="updateArticle">
        <div class="form-group" style="display:flex;flex-direction:column;align-items:center;">
          <img :src="articleImage" style="width:200px;height:200px" />
          <div class="mt-2">
            <label>
              <h4>Title</h4>
            </label>
            <input
              v-model="articleTitle"
              type="text"
              class="form-control sharea"
              placeholder="Enter title"
              style="width:100%; height: 40px; font-size: 20px; text-align: center; padding-bottom: 0;"
            />
          </div>
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
import axios from "axios";
import VueTagsInput from "@johmun/vue-tags-input";

export default {
  components : {
     VueTagsInput
  },
  props: {
    isCreate: Boolean,
    articleToBeEdited: Object
  },
  data() {
    return {
      articleTitle: "",
      articleContent: "",
      articleImage: "",
      idArticle: "",
      tags :[],
      tag : ""
    };
  },
  methods: {
    getValueFromArticle(obj) {
      this.articleTitle = obj.title;
      this.articleContent = obj.content;
      this.articleImage = obj.featured_image;
      this.idArticle = obj._id;
      for(let tag of obj.tags){
        let data = {
          text : tag
        }
        this.tags.push(data)
      }
    },
    updateArticle() {
      let tags = []
      for (let tag of this.tags){
        tags.push(tag.text)
      }

      let title = this.articleTitle;
      let content = this.articleContent;
      let image = this.articleImage;
      let id = this.idArticle;
      let featured_image = "";
      let token = localStorage.getItem("token");
      //   console.log(title, content);
      var bodyFormData = new FormData();
      bodyFormData.append("image", image);
      bodyFormData.append("title", title);
      bodyFormData.append("content", content);
      bodyFormData.append("tags", tags);
      console.log(bodyFormData);

      Swal.fire({
                title: 'Updating your article...',
                allowOutsideClick: () => !Swal.isLoading()
            })
            Swal.showLoading()

      axios({
        url: `http://localhost:3000/articles/${id}`,
        method: "PATCH",
        data: bodyFormData,
        headers: {
          token
        }
      })
        .then(response => {
          Swal.close()
          // console.log(response);
          Swal.fire({
            type: "success",
            title: "You Have Edited Article Successfully !",
            showConfirmButton: false,
            timer: 1500
          });
          this.$emit("showPage", "UserArticle");
        })
        .catch(err => {
          // console.log(err)
          let message = err.response && err.response.data.message || "failed to edit";
          // swal("Error!", errMessage , "error")
          Swal.fire({
            type: "error",
            title: "update article failed !",
            text: message
          });
        });
    },
    previewFile(event) {
      this.articleImage = event.target.files[0];
    }
  },
  created() {
    // console.log(this.articleToBeEdited);
    this.getValueFromArticle(this.articleToBeEdited);
  }
};
</script>

<style scoped>
</style>
