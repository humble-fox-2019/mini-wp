<template>
  <div class="new-box p-4">
    <h1 class="text-center">Post New Article</h1>
    <form @submit.prevent="post()" class="mt-4">
      <label>Title</label>
      <input
        type="text"
        autocomplete="off"
        placeholder="Input Title"
        v-model="title"
        class="form-control"
      />
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
      <label>Tags</label>
      <input
        type="text"
        autocomplete="off"
        placeholder="Input tag"
        v-model="tag"
        class="form-control"
      />
      <div class="text-center mt-4">
        <button class="btn">Post Article</button>
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
      tag: ""
    };
  },
  methods: {
    handlefileupload(event) {
      let file = event.target.files || event.dataTransfer.files;
      this.file = file[0];
    },
    post() {
      Swal.showLoading();
      const token = localStorage.getItem("token");
      let formData = new FormData();
      formData.set("title", this.title);
      formData.set("content", this.content);
      formData.set("file", this.file);
      formData.set("tag", this.tag);
      axios({
        url: `${url}/articles`,
        method: "post",
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
          Swal.fire({
            type: "success",
            text: "Article has been Posted"
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