<template>
  <div class="create-article">
    <form ction enctype="multipart/form-data" class="form-create" @submit.prevent="createArticle">
      <h2 class="label-create">Write Your Article</h2>
      <input type="text" placeholder="Title" v-model="title" class="title-place" />
      <input v-on:change="getImage($event)" type="file" />

      <wysiwyg v-model="content" class="box-create"></wysiwyg>
      <input  type="submit">Submit
    </form>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import toastr from "toastr";
toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-top-center",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "2500",
  extendedTimeOut: "800",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut"
};

let baseUrl = "http://localhost:3000/";
export default {
  data() {
    return {
      title: "",
      content: "",
      image: ""
    };
  },
  methods: {
    getImage() {
      // console.log(image);
      // this.image = image.target.files[0];
      let file = event.target.files || event.dataTransfer.files;
      this.image = file[0];
      console.log(this.image);
    },
    createArticle() {
      let formdata = new FormData();
      formdata.set("image", this.image);
      console.log("pass here");
      console.log(this.image);
      console.log("form data (down)");
      console.log("formdata", formdata);
      axios({
        method: "POST",
        url: baseUrl + "articles/upload",
        data: formdata
      })
        // axios.post(`${baseUrl}articles/upload`, formdata)
        .then(result => {
          console.log("link?");
          console.log(result);
          console.log(result.data);
          console.log(">>>>>>>>>>>>>>>>>");
          axios({
            method: "POST",
            url: baseUrl + "articles/create",
            data: {
              title: this.title,
              content: this.content,
              featured_image: result.data.link
            },
            headers: {
              token: localStorage.token
            }
          })
            .then(data => {
              toastr.success('Success create new article').css({
                width: "550px",
                "max-width": "600px",
                height: "18vh",
                "font-size": "30px",
                display: "flex",
                "align-items": "center"
              });
              this.$emit("backToHome");
            })
            .catch(err => {
              let error = err.response.data.errMsg.join("<br>");
              toastr.warning(error).css({
                width: "550px",
                "max-width": "600px",
                height: "18vh",
                "font-size": "30px",
                display: "flex",
                "align-items": "center"
              });
            });
        })
        .catch(err => {
          toastr.warning("Image is required and Image type is JPEG").css({
                width: "550px",
                "max-width": "600px",
                height: "18vh",
                "font-size": "30px",
                display: "flex",
                "align-items": "center"
              });
        });
    }
  }
};
</script>
<style scoped>


.create-article {
  background: #303e40;
  display: flex;
  justify-content: center;
  height: 100%;
}
.box-create {
  background: white;
  min-height: 60vh;
}
form.form-create {
  width: 75%;
  margin-top: 5%;
  min-height: 85vh;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
}
.label-create {
  color: aliceblue;
  text-align: center;
}

form.form-create button {
  width: 200px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

input[type="text"] {
  height: 34px;
  width: 100%;
  font-size: 21px;
  align-self: flex-start;
}

h2 {
  font-size: 50px;
}

input[type="file"] {
  font-size: 18px;
  margin: 2.5% 28% 2.5% 0;
  padding-top: 0.7%;
  padding-bottom: 0.7%;
  border-radius: 10px;
  background: rgb(247, 196, 102);
}

input[type="submit"] {
  font-size: 28px;
  width: 150px;
  padding: 0.5%;
  margin-top: 2%;
  align-self: center;
}
</style>
