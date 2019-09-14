<template>
  <div id="column-right-edit">
    <div class="container2">
      <div class="bottom">
        <form action @submit.prevent="editItem()">
          <div>
            <vue-tags-input v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags" />
          </div>
          <div>
            <input type="text" v-model="title" placeholder="insert title" />
          </div>
          <div class="textarea">
            <editor placeholder="insert content" v-model="content"></editor>
          </div>
          <div>
            <input type="file" id="file" ref="file" v-on:change="handlefileupload($event)" />
          </div>
          <div class="tombol">
            <div class="submitbutton">
              <button>submit</button>
            </div>
            <div>
              <button @click="clearItem">clear</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import editor from "./editor.vue";
import axios from "axios";
import VueTagsInput from "@johmun/vue-tags-input";
export default {
  props: ["arc"],
  components: {
    editor,
    VueTagsInput
  },
  data() {
    return {
      featured_image: "",
      title: "",
      content: "",
      tag: "",
      tags: []
    };
  },
  methods: {
    handlefileupload() {
      let file = event.target.files || event.dataTransfer.files;
      this.featured_image = file[0];
    },
    editItem() {
      let id = this.arc._id;
      let token = localStorage.getItem("token");
      let formData = new FormData();
      formData.set("featured_image", this.featured_image);
      formData.set("title", this.title);
      formData.set("content", this.content);
      axios({
        method: "PATCH",
        url: `http://34.87.37.210/articles/update/${id}`,
        headers: {
          token
        },
        data: formData
      })
        .then(data => {
          let response = data.data.data;
          if (response) {
            Swal.fire(
              "Success",
              "Your Article is Successfully Edited",
              "success"
            );
            this.$emit("edit-me");
          } else {
            Swal.fire({
              position: "center",
              type: "error",
              title: "Forbidden",
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
        .catch(error => {
          let message =
            (error.response.data && error.response.data.message) ||
            "failed to Edit";
          Swal.fire("Error!", message, "error");
        });
    },
    clearItem() {
      this.title = "";
      this.content = "";
      this.featured_image = "";
    },
    getOne(id) {
      let token = localStorage.getItem("token");
      axios({
        method: "GET",
        url: `http://34.87.37.210/filter/${id}`,
        headers: {
          token
        }
      })
        .then(({ data }) => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.title = this.arc.title;
    this.content = this.arc.content;
    this.featured_image = this.arc.featured_image;
    let taggku = [];
    for (let i = 0; i < this.arc.tags.length; i++) {
      let tagg = this.arc.tags[i];
      let updateTag = {};
      updateTag.text = tagg;
      taggku.push(updateTag);
    }
    this.tags = taggku;
  }
};
</script>

<style scoped>
#column-right-edit {
  height: 100vh;
  background-color: #0001;
  width: 80%;
  overflow: auto;
  display: flex;
  justify-content: center;
}
.container2 {
  margin-top: 5%;
  width: 70%;
}
.bottom {
  margin-bottom: 5%;
  padding: 5%;
  background-color: white;
  -webkit-box-shadow: 3px 6px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 6px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 6px 5px 0px rgba(0, 0, 0, 0.75);
}
.tombol {
  margin-top: 2%;
  display: flex;
  justify-content: center;
}
.submitbutton {
  margin-right: 3%;
}
input[type="text"] {
  width: 100%;
  height: 5%;
}
</style>

