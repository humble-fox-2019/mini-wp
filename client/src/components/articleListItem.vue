<template>
  <div class="row mb-4 pt-5 px-5" style="border:10px solid #343a40;height:400px">
    <div class="col-6 mb-5">
      <h4 style="font-weight:bold;" class="card-title">{{article.title}}</h4>
      <div class="mb-3" v-line-clamp:20="2">
        <p class="card-text" style="overflow:hidden;" v-html="article.content"></p>
      </div>
      <!-- <p style="font-size:14px;">Author : {{article.UserId.username}}</p> -->
      
      <p class="card-text">
        <small>Author : {{article.UserId.username}}</small>
        <br />
        <small
          class="text-muted"
        >{{new Date(article.createdAt).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}</small>
      </p>
      <div class="mb-2" style="display:flex;">
        <a     href="#" @click="searchByTag(tag)" v-for="(tag,i) in article.tags" :key="i">
          <vs-chip style="font-weight:bold;background-color:rgb(34, 4, 65);color:rgb(255,255,255);">{{tag}}</vs-chip>
        </a>
      </div>
      <div style="display:flex">
        <i class="material-icons md-size-0.5">remove_red_eye</i>   
        <p class="ml-2">  {{article.views}}</p>
      </div>
      <button v-on:click="detailedArticle(article)" class="btn btn-dark btn-sm" >details</button>
      <button
        v-if="isUserArticle"
        v-on:click="editArticle(article)"
        class="btn btn-dark btn-sm"
      >edit</button>
      <button
        v-if="isUserArticle"
        v-on:click="removeArticle(article._id)"
        class="btn btn-dark btn-sm"
      >delete</button>
    </div>
    <div class="col-6">
      <img class="img-fluid mb-5" :src="article.featured_image" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    article: Object,
    isUserArticle: Boolean
  },
  data() {
    return {};
  },
  methods: {
    removeArticle(id) {
      let token = localStorage.getItem("token");
      console.log(id);

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          return axios({
            url: `http://localhost:3000/articles/${id}`,
            method: "DELETE",
            headers: {
              token
            }
          })
            .then(response => {
              console.log(response);
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              this.$emit("removedArticle", id);
            })
            .catch(err => {
              let message =
                (err.response && err.response.data.message) ||
                "failed to delete data";
              Swal.fire({
                type: "error",
                title: "failed to delete article",
                text: message
              });
              // console.log(err);
            });
        }
      });
    },
    editArticle(obj) {
      this.$emit("editArticle", obj);
    },
    detailedArticle(obj) {
      console.log("list item detail");
      let id = obj._id;
      let token = localStorage.getItem("token");
      this.$emit("detailedArticle", obj);
      axios({
        url: `http://localhost:3000/articles/${id}/addView`,
        method: "PATCH",
        headers: { token }
      })
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {
          console.log(err.response.data);
        });
      // console.log(id)
    },
    searchByTag(tag) {
      this.$emit("searchByTag", tag);
    }
  }
};
</script>

<style scoped>
</style>
