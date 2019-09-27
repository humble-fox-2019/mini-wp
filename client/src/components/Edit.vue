<template>
  <div class="new-box p-4">
    <h1 class="text-center">{{article.title}}</h1>
    <form @submit.prevent="editArticle(article._id)" class="mt-4 d-flex flex-column">
      <label>Title</label>
      <input type="text" autocomplete="off" v-model="title" class="form-control" />
      <Label class="mt-2">Content</Label>
      <wysiwyg v-model="content" aria-placeholder="Input content" style="color: whitesmoke;"></wysiwyg>
      <label class="mt-2">Picture</label>
      <input
        type="file"
        v-on:change="handlefileupload($event)"
        lang="es"
        accept=".jpg"
        class="form-control"
      />
      <img
        v-if="file"
        :src="file"
        alt
        class="mt-2"
        style="width: 200px; height: 200px; object-fit: cover; border-radius: 10px;"
      />
      <label>Tags</label>
      <input
        type="text"
        autocomplete="off"
        placeholder="Input tag"
        v-model="tag"
        class="form-control"
      />
      <div class="text-center mt-4">
        <button class="btn">Save Edit</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
const url = `http://35.240.137.247`;
export default {
  data() {
    return {
      title: "",
      content: "",
      file: "",
      fileOld: "",
      tag: ""
    };
  },
  props: ["article"],
  methods: {
    handlefileupload(event) {
      
      let file = event.target.files || event.dataTransfer.files;
      if (file.length) {
        console.log(file[0]);
        this.file = file[0];
      }
    },
    editArticle(id) {
      Swal.showLoading();
      const token = localStorage.getItem("token");
      let formData = new FormData();
      formData.set("title", this.title);
      formData.set("content", this.content);
      formData.set("file", this.file);
      formData.set("tag", this.tag);
      axios({
        url: `${url}/articles/${id}`,
        method: "patch",
        data: formData,
        headers: {
          token
        }
      })
        .then(({ data }) => {
          this.title = "";
          this.content = "";
          this.file = "";
          this.tag = "";
          Swal.close();
          this.$emit("gotofeeds");
          Swal.fire({
            type: "success",
            text: "Article has been Updated"
          });
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            type: "error",
            text: "Invalid input parameters"
          });
        });
    }
  },
  created() {
    this.title = this.article.title;
    this.content = this.article.content;
    this.tag = this.article.tag.join(" ");
    this.file = this.article.img;
    console.log(this.file);
  }
};
</script>

<style scoped>
.new-box {
  /* background-color: grey; */
  width: 100%;
}
h1 {
  color: gray;
}
label {
  font-weight: bolder;
  font-size: 22px;
}
button {
  font-size: 22px;
  transition: 0.7s all;
}
button:hover {
  color: whitesmoke;
  transition: 0.7s all;
}
</style>