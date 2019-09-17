<template>
  <div>
    <Login v-if="showLogin" @changeToRegisPage="registerPage" @toFirstPage="getFirstPage"></Login>
    <Register v-if="showRegister" @changeToLoginPage="loginPage" @registerDone="registerSuccess"></Register>
  </div>
</template>

<script>
import Login from "./login";
import Register from "./register";
export default {
  data: function() {
    return {
      showRegister: false,
      showLogin: true
    };
  },
  components: {
    Login,
    Register
  },
  methods: {
    registerPage() {
      this.showRegister = true;
      this.showLogin = false;
    },
    loginPage() {
      this.showRegister = false;
      this.showLogin = true;
    },
    getFirstPage() {
      this.$emit("firstPageShow");
    },
    registerSuccess() {
      this.$emit("getLoginPage");
    }
  }
};
</script>

<style scoped>
div {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
}
</style>