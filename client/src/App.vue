<template>
  <!-- yang di emit ini harus saama sesuai dengan yang di bawah -->
  <div class="navigate">
    <register v-if="!isLogin" @login="login()" @loginGoogle="login() "></register>
    <header v-if="isLogin">
      <!-- <h1>masukkkkk broooooooo</h1> -->
    </header>
    <loadingPage v-if="isLogin" @signOut="signout()"></loadingPage>
    <!-- <footer v-if="isLogin"></footer> -->
  </div>
</template>

<script>
import register from "./components/register.vue";
import headerPage from "./components/header.vue";
import footerPage from "./components/footer";
import loadingPage from "./components/mainpage";
// import footerPart from "./components/footer";
export default {
  components: {
    register,
    headerPage,
    footerPage,
    loadingPage
  },
  methods: {
    test(data) {
      console.log("masuuuuuukkkkkkkk", data);
    },
    login() {
      this.isLogin = true;
      console.log(this.isLogin);
    },
    signout() {
      (this.isLogin = false),
        (this.homePage = false),
        (this.headerPart = false),
        (this.footerPart = false);
    }
  },
  data() {
    return {
      isLogin: false,
      homePage: false,
      headerPart: false,
      footerPart: false
    };
  },
  // ketika dokument baru jadi maka akan mentrrigger

  created() {
    if (localStorage.getItem("token")) {
      console.log("masoook tokennya broooohhhhh");
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    console.log("haloooo broooo");
  }
};
</script>

<style>
</style>