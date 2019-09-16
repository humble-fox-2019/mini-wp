<template>
  <div>
    <NavContent @changeToHome="getHome" @publishArticle="getPublish"></NavContent>
    <Title @passingtags="getTags" @passingTitle="getTitle"></Title>
    <Wysiwyg @passingcontent="getContent"></Wysiwyg>
  </div>
</template>
<script>
import Wysiwyg from "./wygiwys";
import NavContent from "./navContent";
import Title from "./title";
import Axios from "axios";
import Swal from "sweetalert2";
let baseUrl = `http://localhost:3000`;
export default {
  data: function() {
    return {
      title: "",
      tags: [],
      content: ""
    };
  },
  components: {
    Wysiwyg,
    NavContent,
    Title
  },
  methods: {
    getHome() {
      this.$emit("homePageShow");
    },
    getPublish() {
      Swal.fire({
        title: `Creating Article .....`,
        allowOutsideClick: () => !Swal.isLoading()
      });
      Swal.showLoading();
      Axios({
        method: `post`,
        url: `${baseUrl}/articles`,
        data: {
          title: this.title,
          author: localStorage.getItem("user_id"),
          tags: this.tags,
          content: this.content,
          published: true,
          photo: `https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60`
        },
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