<template>
  <div class="block animated fadeIn">
    <div class="block-header block-header-default">
      <h3 class="block-title">Articles List</h3>
      <div class="block-options">
        <div class="block-options-item">
          <code>.</code>
        </div>
      </div>
    </div>
    <div class="block-content">
      <button class="btn btn-info" @click="showFilter">Filter</button>
      <div class="row pt-3" if="filter" v-show="filter">
        <div class="col-6">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" id="title" v-model="title" />
          </div>
          <div class="form-group">
            <label for="tag">Tag</label>
            <input type="text" class="form-control" id="tag" v-model="tag" />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label for="title">Published</label>
            <select id="isPublished" class="form-control" v-model="isPublished">
              <option value>All</option>
              <option value="true">Published</option>
              <option value="false">Draff</option>
            </select>
          </div>
        </div>
      </div>
      <hr />
      <table class="table table-hover table-vcenter">
        <thead>
          <tr>
            <th>Title</th>
            <th>Tags</th>
            <th class="d-none d-sm-table-cell" style="width: 15%;">isPublished</th>
            <th class="text-center" style="width: 100px;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in articles" :key="article._id">
            <td>{{article.title}}</td>
            <td>
              <div
                class="d-inline-flex pl-1"
                v-for="(tag, index) in article.tags"
                :key="`tag-${index}`"
              >
                <span class="badge badge-success">{{tag}}</span>
              </div>
            </td>
            <td class="d-none d-sm-table-cell">
              <span class="badge badge-success" v-if="article.isPublished">Published</span>
              <span class="badge badge-warning" v-else>Draff</span>
            </td>
            <td class="text-center">
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-sm btn-secondary js-tooltip-enabled"
                  data-toggle="tooltip"
                  title
                  data-original-title="Edit"
                  @click="edit(article._id)"
                >
                  <i class="fas fa-pencil-alt"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-sm btn-secondary js-tooltip-enabled"
                  data-toggle="tooltip"
                  title
                  data-original-title="Delete"
                  @click="remove(article._id)"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "../api/server";
import Swal from "sweetalert2";

export default {
  props: ["page"],
  data() {
    return {
      articles: [],
      isPublished: "",
      title: "",
      filter: false,
      tag: ""
    };
  },
  methods: {
    getArticles() {
      let endPoint = `/articles?isPublished=${this.isPublished}&title=${this.title}&tag=${this.tag}`;

      axios
        .get(endPoint, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          this.articles = data;
        })
        .catch(err => {
          console.log(err.response.data);
        });
    },
    remove(id) {
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
          axios
            .delete("/articles/" + id, {
              headers: {
                token: localStorage.getItem("token")
              }
            })
            .then(({ data }) => {
              this.getArticles();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            })
            .catch(err => {
              console.log(err.response.data);
            });
        }
      });
    },
    edit(id) {
      this.$emit("setarticleid", id);
      this.$emit("changepage", "ArticleEdit");
    },
    showFilter() {
      this.clearFilter();
      this.filter = !this.filter;
    },
    clearFilter() {
      this.tag = "";
      this.isPublished = "";
      this.title = "";
    }
  },
  created() {
    this.getArticles();
  },
  watch: {
    isPublished: function(val) {
      this.getArticles();
    },
    title: function(val) {
      this.getArticles();
    },
    tag: function(val) {
      this.getArticles();
    }
  }
};
</script>

<style>
</style>