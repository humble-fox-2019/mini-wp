<template>
  <div>
    <div v-show="beforein">
      <navout
        @changeToLogin="changeLogin()"
        @changeToSignUp="changeSignUp()"
        @changeToHome="changeHome()"
        @pageGIn="getIn()"
      ></navout>
      <home v-show="atHome"></home>
      <formsignin v-show="login" @pageIn="getIn"></formsignin>
      <formsignup v-show="signup" @register="changeLogin"></formsignup>
    </div>
    <div v-show="afterin">
      <navin @sign-out="signingOut" @writeArticle="getWrite"></navin>
      <div class="container">
        <leftcolumn @seeArticles="getBody" @myArticles="getMine" :name="name"></leftcolumn>
        <div id="column-right" v-show="isBody">
          <div class="container2">
            <div id="top">
              <div class="atas"></div>
              <div id="searchbar">
                <div>
                  <input type="text" v-model="filter" placeholder="Type Title" />
                </div>
                <div id="search">
                  <i class="fas fa-search write"></i>
                </div>
              </div>
            </div>
            <rightcolumn
              :articles="articles"
              @delete-article="removeArticle($event)"
              @updateFile="updateData($event)"
              @tagss="getMeTags($event)"
            ></rightcolumn>
          </div>
        </div>
        <transition name="slide-fade">
        <write v-if="isWrite" @uploadFile="getFile($event)"></write>
         </transition>
         <transition name="slide-fade">
        <edit v-if="isEdit" v-bind:arc="artic" @edit-me="updateMe()"></edit>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import beforein from "./components/beforein.vue";
import navout from "./components/navout.vue";
import home from "./components/home.vue";
import formsignin from "./components/formsignin.vue";
import formsignup from "./components/formsignup.vue";
import navin from "./components/navin.vue";
import leftcolumn from "./components/leftcolumn.vue";
import rightcolumn from "./components/rightcolumn.vue";
import write from "./components/write.vue";
import edit from "./components/edit.vue";
import Swal from "sweetalert2";

export default {
  components: {
    beforein,
    navout,
    home,
    formsignin,
    formsignup,
    navin,
    leftcolumn,
    rightcolumn,
    edit,
    write
  },
  data() {
    return {
      beforein: false,
      login: false,
      atHome: false,
      signup: false,
      afterin: false,
      isBody: false,
      isWrite: false,
      isEdit: false,
      articles: [],
      tempArticles: [],
      title: "",
      content: "",
      image: "",
      name: "",
      updateid: "",
      filter: "",
      artic: {}
    };
  },
  methods: {
    changeLogin() {
      this.login = true;
      this.atHome = false;
      this.signup = false;
    },
    changeSignUp() {
      this.login = false;
      this.atHome = false;
      this.signup = true;
    },
    changeHome() {
      this.login = false;
      this.atHome = true;
      this.signup = false;
    },
    signingOut() {
      this.afterin = false;
      this.beforein = true;
      this.home = true;
    },
    getIn() {
      this.getArticles();
      this.afterin = true;
      this.beforein = false;
      this.isBody = true;
    },
    getWrite() {
      this.isBody = false;
      this.isWrite = true;
      this.isEdit = false;
    },
    getBody() {
      this.getArticles();
      this.isBody = true;
      this.isWrite = false;
      this.isEdit = false;
    },
    getFile(e) {
      this.getArticles();
      this.isWrite = false;
      this.isBody = true;
      this.isEdit = false;
    },
    getArticles() {
      let token = localStorage.getItem("token");
      axios({
        method: "GET",
        url: "http://34.87.37.210/articles/",
        headers: {
          token
        }
      })
        .then(data => {
          this.name = data.data.name;
          this.articles = data.data.data;
          this.tempArticles = data.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    removeArticle(id) {
      this.articles = this.articles.filter(el => el._id !== id);
      this.getArticles();
    },
    updateMe() {
      this.isWrite = false;
      this.isBody = true;
      this.isEdit = false;
      this.getArticles();
    },
    getMine() {
      let token = localStorage.getItem("token");
      axios({
        method: "GET",
        url: "http://34.87.37.210/articles/myArticles",
        headers: {
          token
        }
      })
        .then(data => {
          this.isWrite = false;
          this.isBody = true;
          this.isEdit = false;
          this.articles = data.data.data;
          this.tempArticles = data.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateData(e) {
      this.artic = e;
      this.isWrite = false;
      this.isBody = false;
      this.isEdit = true;
    },
    getMeTags(name) {
      let token = localStorage.getItem("token");
      axios({
        method: "GET",
        url: `http://34.87.37.210/articles/tags/${name}`,
        headers: {
          token
        }
      })
        .then(data => {
          this.isWrite = false;
          this.isBody = true;
          this.isEdit = false;
          this.articles = data.data.filtered;
          this.tempArticles = data.data.filtered;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    if (localStorage.token) {
      this.getArticles();
      this.atHome = false;
      this.beforein = false;
      this.afterin = true;
      this.isBody = true;
    } else {
      this.atHome = true;
      this.beforein = true;
      this.afterin = false;
    }
  },
  watch: {
    filter(a, b) {
      let regex = new RegExp(a, "i");
      this.articles = this.tempArticles.filter(el => regex.test(el.title));
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-content: flex-start;
  margin: 0;
  padding: 0;
}
#column-right {
  height: 90vh;
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
#top {
  margin-bottom: 5%;
  padding: 5%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  -webkit-box-shadow: 3px 6px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 6px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 6px 5px 0px rgba(0, 0, 0, 0.75);
}
.atas {
  display: flex;
}
#searchbar {
  display: flex;
  justify-content: flex-end;
  width: 50%;
  height: 20%;
}
#search {
  margin-left: 5%;
}
.write {
  color: #21759b;
}
.slide-fade-enter-active {
  animation: slideInRight .5s;
}
.slide-fade-leave-active {
  animation: slideInRight .5s reverse;
}
</style>