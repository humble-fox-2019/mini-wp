<template>
  <div
    class="article-card d-flex justify-content-start align-items-start col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-1 mb-4"
  >
    <div
      class="d-flex justify-content-start align-items-center mr-3"
      style="width: 30%;height: 200px;"
    >
      <img class="article-img" :src="article.img" :alt="article.title+` image`" st />
    </div>
    <div style="width: 100%;height: 200px;">
      <div class="article-info d-flex flex-column justify-content-between">
        <h4 class="text-center">{{article.title}}</h4>
        <p v-html="article.content"></p>
        <div class="d-flex align-items-center">
          <TagButton
            v-for="(tag, index) in article.tag"
            :key="index"
            :tag="tag"
            @findByTag="findByTag"
          ></TagButton>
        </div>
        <div class="d-flex justify-content-around aling-items-center">
          <button class="btn" @click.prevent="readOne(article._id)">
            <i class="fas fa-glasses mr-1"></i>Read Article
          </button>
          <button class="btn" @click.prevent="editOne(article._id)">
            <i class="fas fa-edit mr-1"></i>Edit
          </button>
          <button class="btn" @click.prevent="deleteTask(article._id)">
            <i class="fas fa-trash-alt mr-1"></i>Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
const url = `http://35.240.137.247`;
import TagButton from "./TagButton";
export default {
  data() {
    return {};
  },
  props: ["article"],
  components: {
    TagButton
  },
  methods: {
    findByTag(data) {
      this.$emit("findByTag", data);
    },
    deleteTask(id) {
      const token = localStorage.getItem("token");
      axios({
        url: `${url}/articles/${id}`,
        method: "delete",
        headers: {
          token
        }
      })
        .then(({ data }) => {
          this.$emit("gotofeeds");
          Swal.fire(`Success`, `Success delete article`, "success");
        })
        .catch(err => {
          console.log(err);
        });
    },
    readOne(id) {
      const token = localStorage.getItem("token");
      axios({
        url: `${url}/articles/${id}`,
        method: "get",
        headers: {
          token
        }
      })
        .then(({ data }) => {
          this.$emit("readOne", data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    editOne(id) {
      const token = localStorage.getItem("token");
      axios({
        url: `${url}/articles/${id}`,
        method: "get",
        headers: {
          token
        }
      })
        .then(({ data }) => {
          this.$emit("editOne", data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.article-card {
  max-height: 300px;
  border: 3px solid #262626;
  border-radius: 10px;
}
.article-info {
  min-height: 100%;
  min-width: 100%;
}
.article-img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}
h4 {
  color: grey;
}
button {
  transition: 0.7s all;
  font-size: 14px;
}
button:hover {
  transition: 0.7s all;
  color: whitesmoke;
}
p {
  overflow: hidden;
  text-overflow: ellipsis !important;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  line-height: 20px;
}
</style>