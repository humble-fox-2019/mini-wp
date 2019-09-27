<template>
  <nav class="shadow">
    <div v-if="!isLogin" class="d-flex justify-content-center align-items-center p-3">
      <img src="../assets/logo.png" alt="darkside logo" />
    </div>
    <div v-if="isLogin" class="d-flex justify-content-between align-items-center container p-3">
      <img src="../assets/logo.png" alt="darkside logo" />
      <!-- <form class="d-flex justify-content-center align-items-center" @submit.prevent="searchByKey()">
        <i class="fas fa-search mr-3" style="font-size: 20px;"></i>
        <input
          id="search-box"
          class="form-control"
          type="text"
          placeholder="seacrh..."
          v-model="search"
        />
      </form> -->
      <button @click.prevent="logout()" class="btn main-btn-w">Sign Out</button>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
const url = `http://35.240.137.247`;
export default {
  data() {
    return {
      search: ""
    };
  },
  props: ["isLogin"],
  methods: {
    logout() {
      localStorage.clear();
      this.$emit("logout");
    },
    searchByKey() {
      const token = localStorage.getItem("token");
      const key = this.search;
      axios({
        url: `${url}/articles/find?key=${key}`,
        method: "get",
        headers: {
          token
        }
      })
        .then(({ data }) => {
          this.$emit("searchByKey", data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
nav {
  background-color: whitesmoke;
}
button {
  font-size: 22px;
  transition: 0.7s all;
}
button:hover {
  color: black;
  transition: 0.7s all;
}
#search-box {
  background-color: #d4d4d4;
  width: 50%;
  transition: width 1s;
  -webkit-transition: width 1s;
}
#search-box:focus {
  width: 100%;
}
</style>

