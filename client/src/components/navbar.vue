<template>
  <div>
    <b-navbar type="dark"  toggleable="lg"  style="font-weight:bold;background-color:rgb(34, 4, 65);color:rgb(255, 255, 255);">
      
      <img :src="image">
      <b-navbar-brand @click.prevent="trigger">X Wordpress</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
          <b-nav-form v-if="isLogin" class="mx-auto">
            <b-form-input size="sm" v-model="search" placeholder="Search By Title" style="width:300px"></b-form-input>
          </b-nav-form>
        <b-navbar-nav v-if="isLogin" class="ml-auto">
          <b-nav-item-dropdown text="Article" style="color:rgb(255, 255, 255);" right>
            <b-dropdown-item href="#" @click.prevent="showCreateForm">Create New Article</b-dropdown-item>
            <b-dropdown-item href="#" @click.prevent="showAllArticle">All Article</b-dropdown-item>
            <b-dropdown-item href="#" @click.prevent="showUserArticle">My Article</b-dropdown-item>
          </b-nav-item-dropdown>
        <b-nav-item @click.prevent="logOut" >Sign Out</b-nav-item>
          <!-- <b-nav-item-dropdown right>
            <template slot="button-content">
              <em class="font-weight-bold">{{currentUser.username}}</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click.prevent="logOut" href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown> -->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import image from "../../img/logo2.png"
export default {
  props: {
    message: String,
    isLogin: Boolean,
    currentUser : Object
  },
  data() {
    return {
      search:"",
      image : image
    };
  },
  methods: {
    trigger() {
      this.$emit("fromChildren", 1);
    },
    logOut() {

      localStorage.clear()
      this.$emit("fromLogOutButton");
    },
    showUserArticle() {
      this.$emit("showPage", "UserArticle");
    },
    showAllArticle() {
      this.$emit("showPage", "AllArticle");
    },
    showCreateForm() {
      console.log("create dari navbar");
      this.$emit("showPage", "createTodoForm");
    }
  },
  created() {
    // console.log(this.isLogin);
  },
  watch : {
    search(newValue){
      // console.log("search dari watch")
      // console.log(newValue)
      this.$emit('search', newValue)
   }
  }
}

</script>

<style>
</style>
