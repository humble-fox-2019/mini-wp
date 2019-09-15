<template>
  <div>
    <div id="jumbotron">
      <b-jumbotron id="jumbotronBanner" header="Think Tank" lead="Tank What You Think!"></b-jumbotron>
    </div>
    <div id="form">
      <LoginForm
        v-if="currentForm === 'login-form'"
        @show-dashboard-page="showDashboard"
        @to-register-form="switchForm"
      ></LoginForm>
      <RegisterForm
        v-else-if="currentForm === 'register-form'"
        @to-login-form="switchForm"
        @show-dashboard-page="showDashboard"
      ></RegisterForm>
    </div>
  </div>
</template>

<script>
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default {
  data: function() {
    return {
      currentForm: "login-form"
    };
  },
  methods: {
    showDashboard() {
      this.$emit("show-dashboard-page");
    },
    switchForm() {
      if (this.currentForm === "login-form") {
        this.currentForm = "register-form";
      } else {
        this.currentForm = "login-form";
      }
    }
  },
  components: {
    LoginForm,
    RegisterForm
  }
};
</script>

<style scoped>
.jumbotron {
  background: #f0f0f0;
  padding: 1rem 2rem;
}
#form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#jumbotronBanner {
  font-family: "Crimson Pro";
  background-image: url(https://cdn.pixabay.com/photo/2016/03/26/13/09/notebook-1280538_960_720.jpg);
  background-size: cover;
  color: #f0f0f0;
}
</style>