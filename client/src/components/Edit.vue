<template>
  <div>
    <div class="edit-article">
      <form action enctype="multipart/form-data" @submit.prevent="editMe" class="form-edit">
        <h2 class="label-edit">Edit Your Article</h2>
        <input type="text" v-model="currentTitle" class="title-place" />
        <div class="pic">
          <img :src="currentImage" alt />
        </div>
        <input type="file" id="file" ref="file" v-on:change="getImage($event)" />
        <wysiwyg v-model="currentContent" class="box-edit"></wysiwyg>
        <input type="submit" />Submit
      </form>
    </div>
  </div>
</template>

<script>
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
      currentTitle: "",
      currentContent: "",
      currentImage: "",
      newImage: false
    };
  },
  props: {
    id: String
  },
  methods: {
    getImage() {
      // console.log(image);
      // this.image = image.target.files[0];
      let file = event.target.files || event.dataTransfer.files;
      this.currentImage = file[0];
      console.log(this.currentImage);
    },
    getData(input) {
      axios({
        method: "GET",
        url: baseUrl + "articles/" + input,
        headers: {
          token: localStorage.token
        }
      }).then(({ data }) => {
        this.currentTitle = data.article.title;
        this.currentContent = data.article.content;
        this.currentImage = data.article.featured_image;
        // console.log(this.currentImage);
      });
    },
    editMe() {
      let formdata = new FormData();
      formdata.set("featured_image", this.currentImage);
      formdata.set("title", this.currentTitle);
      formdata.set("content", this.currentContent);
      console.log("formdata", formdata);
      // console.log();
      axios({
        method: "PUT",
        url: baseUrl + "articles/" + this.id,
        headers: {
          token: localStorage.token
        },
        data: formdata
      })
        .then(data => {
          toastr.success("Success edit an article").css({
            width: "550px",
            "max-width": "600px",
            height: "18vh",
            "font-size": "30px",
            display: "flex",
            "align-items": "center"
          });
          this.$emit("changeToGetAll");
        })
        .catch(err => {
          console.log(err);
        });
      // });
    }
  },
  created() {
    this.getData(this.id);
  }
};
</script>
<style scoped>
input.title-place {
  height: 6vh;
}

.edit-article {
  background: rgb(28, 47, 82);
  display: flex;
  justify-content: center;
  height: 100%;
}
.box-edit {
  background: white;
  min-height: 60vh;
}
form.form-edit {
  width: 75%;
  margin-top: 5%;
  min-height: 85vh;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.label-edit {
  color: aliceblue;
  text-align: center;
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

form.form-edit button {
  width: 200px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

img {
  object-fit: contain;
  height: 300px;
  width: 540px;
}

.pic {
  width: 540px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right : 6px;
  padding-left: 6px;
  background: rgb(216, 209, 209);
  margin: 28px 20px 20px 20px;
}

input[type="file"] {
  font-size: 18px;
  margin: 2.8%;
  padding: 1%;
  border-radius: 10px;
  background: rgb(247, 196, 102);
}

input[type="submit"] {
  font-size: 28px;
  width: 150px;
  padding: 0.5%;
  margin-top: 2%;
}
</style>