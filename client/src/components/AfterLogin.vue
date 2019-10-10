<template>
  <div class="d-flex justify-content-between p-4">
    <div class="user">
      <div class="user-info d-flex flex-column align-items-center p-3">
        <h3 class="text-center">Profile</h3>
        <img class="user-img mt-2" :src="img" alt="user image" style />
        <h5 class="mt-5">{{username}}</h5>
      </div>
      <div class="main-btn mt-3">
        <button class="btn col-md-12" @click.prevent="gotopost">
          <i class="fas fa-feather-alt mr-1"></i>Post new article
        </button>
        <button class="btn col-md-12" @click.prevent="gotofeeds">
          <i class="far fa-newspaper mr-1"></i>My Article
        </button>
        <!-- <button class="btn col-md-12" @click.prevent="gotoedit">
          <i class="far fa-user-circle mr-1"></i>Edit Profile
        </button>-->
      </div>
      <div
        class="main-btn mt-3 d-flex flex-column justify-content-center align-items-center"
        style="height: 40.4vh"
      >
        <p class="m-0">Portofolio Made By</p>
        <a href="https://www.instagram.com/f_ardi14/">
          <i class="fab fa-instagram mr-1"></i>Ardi Pratama
        </a>
        <p>@email : ardynn.d@gmail.com</p>
      </div>
    </div>
    <div class="article p-2 overflow-auto">
      <NewArticle v-if="post"></NewArticle>
      <ArticleCard
        v-if="feed"
        v-for="article in articles"
        :key="article._id"
        :article="article"
        @findByTag="findByTag"
        @gotofeeds="gotofeeds()"
        @readOne="readOne"
        @editOne="editOne"
      ></ArticleCard>
      <Read :article="article" v-if="read" @findByTag="findByTag"></Read>
      <Edit :article="article" v-if="edit" @gotofeeds="gotofeeds"></Edit>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
const url = `http://35.240.137.247`;
import Read from "./Read";
import Edit from "./Edit";
import ArticleCard from "./ArticleCards";
import NewArticle from "./NewArticle";
export default {
  data() {
    return {
      img: localStorage.getItem('image'),
      username: localStorage.getItem("username"),
      post: false,
      feed: true,
      read: false,
      edit: false,
      articles: [],
      article: {}
    };
  },
  props: ["articlesFeeds"],
  components: {
    ArticleCard,
    NewArticle,
    Read,
    Edit
  },
  methods: {
    editOne(data) {
      this.article = data;
      //   console.log(this.article);
      this.feed = false;
      this.post = false;
      this.read = false;
      this.edit = true;
    },
    readOne(data) {
      this.article = data;
      //   console.log(this.article);
      this.edit = false;
      this.feed = false;
      this.post = false;
      this.read = true;
    },
    findByTag(data) {
      this.articles = data;
      this.edit = false;
      this.read = false;
      this.post = false;
      this.feed = true;
    },
    gotopost() {
      this.edit = false;
      this.read = false;
      this.post = true;
      this.feed = false;
    },
    gotofeeds() {
      const token = localStorage.getItem("token");
      axios({
        url: `${url}/articles`,
        method: "get",
        headers: {
          token
        }
      })
        .then(({ data }) => {
          this.articles = data;
          this.edit = false;
          this.read = false;
          this.post = false;
          this.feed = true;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    articles(val) {
      console.log(val, `aaaaaaaaaaaaaaaa`);
    }
  },
  created() {
    if (this.articlesFeeds.length === 0) {
      this.gotofeeds();
    } else {
      this.articles = this.articlesFeeds;
    }
  }
};
</script>

<style scoped>
.article {
  border: 3px solid #262626;
  border-radius: 10px;
  width: 70%;
  min-height: 87vh;
}
.user {
  /* background-color: grey; */
  min-height: 87vh;
  width: 29%;
}
.user-info {
  border: 3px solid #262626;
  border-radius: 10px;
}
.main-btn {
  border: 3px solid #262626;
  border-radius: 10px;
}
.user-img {
  border-radius: 10px;
  width: 160px !important;
}
h3,
h5 {
  color: gray;
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
  font-size: 20;
  color: #d6d6d6;
  font-weight: bolder;
}
a {
  text-decoration: none;
  color: #d6d6d6;
  font-weight: bolder;
  transition: 0.5s all;
}
a:hover {
  transition: 0.5s all;
  font-size: 24px;
  text-decoration: none;
  color: #d6d6d6;
  font-weight: bolder;
}
</style>