<template>
  <div class="loadingPgae">
    <!-- JUMBBOTRON -->
    <div class="banner-tron">
      <div class="jumbotron jumbotron-fluid" id="welcome-banner">
        <div class="container">
          <h1>Welcome to Simple Post</h1>
          <p>Amplify your voice with just a click !</p>
        </div>
      </div>
    </div>

    <!-- MAIN CONTENT -->
    <div class="container-fluid">
      <!-- INI ADALAH UNTUK PEMBAGIAN -->

      <!-- PEMBAGIAN 1 -->
      <div class="row" style="height: 90vh;">
        <div class="addArticle col-4 p-0 container-fluid">
          <!-- ISI 1 -->
          <div
            class="info col m-0 p-0"
            style="background-color: whitesmoke; height: 40%; width: 100%"
          >
            <div class="container text-center" id="sec1top">
              <!-- DISINI PIC BUAT USERNYA -->
              <img src alt srcset id="userPic" />
              <p class="username" style="font-weight: bold;">User</p>
            </div>
          </div>
          <div class="container" id="sec2bot"></div>

          <!-- ISI 2 -->
          <div
            class="insert col m-0 p-0"
            style="background-color: grey   ; height: 60%; width: 100%"
          >
            <center>
              <div class="container">
                <button
                  type="button"
                  class="btn btn-outline-info mt-3 ml-3"
                  @click="findAllPublish()"
                >View all Threads</button>
                <a href class="btn btn-primary mt-2" @click.prevent="backtoHome">HOME</a>

                <form action @submit.prevent="searchArt">
                  <input
                    type="text"
                    id="myInput"
                    placeholder="Search For Articles"
                    title="Type in a name"
                    style="width: 100%"
                    class="searchBar mt-3"
                    v-model="searchArticle"
                  />
                  <button href type="submit" class="btn btn-primary mt-2">SEARCH</button>
                </form>

                <br />

                <!-- INI BAGIAN UNTUK MENAMPILKAN HASIL SEARCH -->
                <div
                  class="row mt-3"
                  style="height: 100vh;width: 60vh;"
                  v-if="showSearchResult === true"
                >
                  <div class="addArticle col-11 p-0 container-fluid">
                    <!-- ISI 1 -->
                    <div
                      class="info col p-0 mt-3"
                      style="background-color: whitesmoke; width: 80%; border-radius: 5%"
                    >
                      <img v-bind:src="picture" width="200px" />
                      <!-- <p>{{picture}}</p> -->
                      <p>Title : {{title}}</p>
                      <p>Content : {{content}}</p>
                      <!-- <form action="/profile" method="post" enctype="multipart/form-data"> -->
                      <!-- <input type="file" name="avatar" />
                      </form>-->
                    </div>
                  </div>
                  <div class="container" id="sec2bot"></div>
                </div>
              </div>
            </center>
          </div>
        </div>

        <!-- PEMBAGIAN 2 -->
        <div class="articles col" style="background-color: burlywood;">
          <!-- quill file -->
          <br />
          <div class="card bg-light text-dark" style="height: 50%" v-if="editor">
            <div class="card-body">
              <form action="submit" class="thread">
                <td>Title</td>
                <td>
                  <input
                    style="width: 90%"
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Insert your Title Here"
                    required
                    v-model="title"
                  />
                </td>
                <div id="editor" style="width: 90%;">
                  <wysiwyg v-model="content"></wysiwyg>
                </div>
                <input type="file" @change="handleInputFile" />
                <a
                  href
                  class="btn btn-primary"
                  @click.prevent="postData"
                  style="margin-top: 10px"
                >SUBMIT</a>
              </form>
            </div>
          </div>
          <br />

          <div class="card bg-secondary text-light">
            <div class="card-body text-center" style="font: bolder;">POOL OF ARTICLES</div>
          </div>

          <br />
          <div class="articles" v-if="showLoginHome === true">
            <div
              class="card bg-light text-dark mt-1"
              v-for="(item, i) in articles"
              :key="i"
              style="border-radius: 3%"
            >
              <!-- <div class="card bg-light text-dark"> -->
              <div class="card-body">
                <img v-bind:src="item.url" width="200px" />
                <p>Title : {{ item.title}}</p>
                <p>Content : {{ item.content}}</p>
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  @click.prevent="editArticle(item._id, item.title, item.content) "
                >Edit</button>
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  @click.prevent="deleteData(item._id)"
                >Delete</button>
              </div>
            </div>
          </div>

          <!--  BAGIAN INI ADALAH UNTUK SHOW ALL THREAD -->
          <div class="all-threads" v-if="showAllPage === true">
            <div
              class="card bg-light text-dark mt-1"
              v-for="(item, i) in showAll"
              :key="i"
              style="border-radius: 3%"
            >
              <div class="card bg-light text-dark">
                <div class="card-body">
                  <img v-bind:src="item.url" width="200px" />
                  <p>Title : {{ item.title}}</p>
                  <p>Content : {{ item.content}}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- INI BAGIAN LOGIN EDITNYA -->

          <div class="card bg-light text-dark" style="height: 250px" v-if="editPage">
            <div class="container mt-4">
              <form action>
                <table class="table-edit">
                  <tr>
                    <td>Title</td>
                    <td>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Edit your title"
                        style="width: 250px; margin-left: 10px"
                        v-model="title"
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Content</td>
                    <td>
                      <input
                        type="text"
                        name="content"
                        id="content"
                        placeholder="Edit your content"
                        style="width: 250px; height:100px; margin-left: 10px"
                        v-model="content"
                        required
                      />
                    </td>
                  </tr>
                </table>
              </form>
              <a href class="btn btn-primary mt-2" @click.prevent="updateArticle(idArticle)">SUBMIT</a>
              <a href class="btn btn-primary mt-2" @click.prevent="backtoHome">HOME</a>
            </div>
          </div>

          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const baseUrl = "http://localhost:3000/article";
import axios from "axios";

export default {
  data() {
    return {
      idArticle: "",
      picture: "",
      articles: [],
      showAll: [],
      title: "",
      content: "",
      searchArticle: "",
      showLoginHome: true,
      showSearchResult: false,
      editor: true,
      editPage: false,
      showAllPage: true
    };
  },

  methods: {
    handleInputFile(e) {
      console.log(e.target.files[0], "<<<<<< INI ENYA");
      this.picture = e.target.files[0];
    },
    fetchdata() {
      console.log("halooo broo");
      axios({
        method: "get",
        url: baseUrl,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          console.log(data.data);
          this.articles = data.data;
          //   console.log(data.data);
        })
        .catch(err => {
          console.log(err, "<<<< INI ERRORNYA di Fetch");
        });
      //   console.log(localStorage.getItem("token"), '<<<< INI TOKENNYAAA');
    },
    postData() {
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("content", this.content);
      formData.append("picture", this.picture);

      axios({
        method: "POST",
        url: baseUrl,
        data: formData,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          console.log(
            data,
            "<<<<< BERHASIL JALAN DARI CLIENT KE SERVER UNTUK POST"
          );
          this.fetchdata();
        })
        .catch(err => {
          console.log(err, "<<<<<<< OOPS ADA YANG ERROR DI POST DATANYA");
        });
    },
    deleteData(id) {
      console.log(" ke bagian delete ");
      console.log(id);
      axios({
        method: "DELETE",
        url: `${baseUrl}/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(data => {
          // console.log(url)
          console.log(data);
          console.log("berhasil delete");
          console.log(id, "<<<< INI IDNYA");
          this.fetchdata();
        })
        .catch(err => {
          console.log(id, "<<< INI IDNYA ");
          console.log(err, "<<<<< INI ERRNYA");
          console.log("gagal delete");
        });
    },
    updateArticle(idArticle) {
      console.log(idArticle, "<<<<< INI ID ARTICLENYA DARI UPDATE");

      axios({
        method: "PUT",
        url: `${baseUrl}/${idArticle}`,
        data: {
          title: this.title,
          content: this.content
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          console.log(data, "<<<<< BERHASIL MASUK UPDATE");
          this.fetchdata();
          this.showLoginHome = true;
          this.editor = true;
          this.editPage = false;
        })
        .catch(err => {
          console.log(err, "<<<< DATANYA ERROR");
        });
    },
    editArticle(id, title, content) {
      console.log("masuk ke edit Article");
      (this.idArticle = id), (this.title = title), (this.content = content);
      this.showLoginHome = false;
      this.editor = false;
      this.editPage = true;

      console.log(this.idArticle, "<<< INI ID ARTICLE");
      console.log(this.title, "<<< INI TITTLE");
      console.log(this.content, "<<< INI CONTENT");
    },
    backtoHome() {
      this.showLoginHome = true;
      this.editPage = false;
      this.editor = true;
      this.showAllPage = false;
    },
    searchArt() {
      console.log("berhasil masuk ke search art");
      console.log(this.searchArticle, "<<<< INI DATA SEARCH ARTICLENYA");
      axios({
        method: "GET",
        url: `${baseUrl}/${this.searchArticle}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          console.log(data, "<<<<< DATANYA BERHASIL BRO");
          this.title = data.obj.title;
          this.content = data.obj.content;
          this.picture = data.obj.picUrl;
          // console.log(data.data.content);
          // console.log(data.data.title);

          console.log(this.picture, "<<<< LINK GAMBAR");
          console.log(this.content, "<<<< CONTENT");
          console.log(this.title, "<<<< LINK TITLE");
          this.showSearchResult = true;
        })
        .catch(err => {
          console.log(err, "<<<<< INI ERRORNYA DARI SEARCH ARTICLE");
        });
    },
    findAllPublish() {
      console.log("masuk ke pubslish all");
      this.showLoginHome = false;
      axios({
        method: "GET",
        url: `http://localhost:3000/article/all/thread`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.showAll = data.data;
          console.log(this.showAll, "<<<<<< bisa");
          // console.log(data);
          this.showAllPage = true
          console.log(data, "<<< DARI FIND ALL PUBLISH");
        })
        .catch(err => {
          console.log(err, "<<< INI DARI ERRNYA");
        });
    }
  },
  created() {
    this.fetchdata();
    // console.log(this.articles);
  }
};
</script>

<style>
</style>