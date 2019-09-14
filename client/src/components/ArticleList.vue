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
      <table class="table table-hover table-vcenter">
        <thead>
          <tr>
            <th>Name</th>
            <th class="d-none d-sm-table-cell" style="width: 15%;">Access</th>
            <th class="text-center" style="width: 100px;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in articles" :key="article._id">
            <td>{{article.title}}</td>
            <td class="d-none d-sm-table-cell">
              <span class="badge badge-success" v-if="article.isPublised">Published</span>
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
                >
                  <i class="fas fa-pencil-alt"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-sm btn-secondary js-tooltip-enabled"
                  data-toggle="tooltip"
                  title
                  data-original-title="Delete"
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

export default {
  data() {
    return {
      articles: []
    };
  },
  created() {
    axios
      .get("/articles", {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(({ data }) => {
        this.articles = data;
        console.log(data);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }
};
</script>

<style>
</style>