<template>
  <div>
    <NavContent @changeToHome="getHome" @publishArticle="getPublish"></NavContent>
    <Title @passingtags="getTags" @passingTitle="getTitle"></Title>
    <Wysiwyg @passingcontent="getContent"></Wysiwyg>
    <div>
      <form enctype="multipart/form-data">
        <input type="file" ref="image" accept="image/*" @change="handleimage" required />
      </form>
    </div>
  </div>
</template>
<script>
import Wysiwyg from "./wygiwys";
import NavContent from "./navContent";
import Title from "./title";
import Axios from "axios";
import Swal from "sweetalert2";
let baseUrl = `http://35.187.228.79`;
// let baseUrl = "http://localhost:3000";

export default {
  data: function() {
    return {
      title: "",
      tags: [],
      content: "",
      image: null
    };
  },
  props: ["passingArticle"],
  components: {
    Wysiwyg,
    NavContent,
    Title
  },
  methods: {
    handleimage() {
      this.image = this.$refs.image.files[0];
    },
    getHome() {
      this.$emit("homePageShow");
    },
    getPublish() {
      let formData = new FormData();

      formData.append("image", this.image);
      formData.append("title", this.title);
      formData.append("content", this.content);
      formData.append("tags", this.tags);
      formData.append("author", localStorage.getItem("user_id"));
      formData.append("published", true);
      Swal.fire({
        title: `Creating Article .....`,
        allowOutsideClick: () => !Swal.isLoading()
      });
      Swal.showLoading();
      Axios({
        method: `post`,
        url: `${baseUrl}/articles`,
        data: formData,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(data => {
          Swal.close();
          Swal.fire("Success!", "Create Article Success", "success");
          this.getHome();
        })
        .catch(err => {
          let msg = error.response.data.message || "Create Article Failed";
          Swal.fire("Error!", msg, "error");
        })
        .finally(() => {});
    },
    getTags(tags) {
      this.tags = tags;
    },
    getTitle(title) {
      this.title = title;
    },
    getContent(content) {
      this.content = content;
    }
  }
};
</script>

<style scoped>
</style>