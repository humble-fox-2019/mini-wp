<template>
  <div id="registerForm">
    <b-container>
      <b-form>
        <h4>Register</h4>
        <b-alert variant="danger">Danger Alert</b-alert>
        <b-form-group id="registerName" label="Name:" label-for="registerName">
          <b-form-input id="registerName" v-model="name" required placeholder="Enter name"></b-form-input>
        </b-form-group>

        <b-form-group id="registerEmail" label="Email:" label-for="registerEmail">
          <b-form-input
            id="registerEmail"
            v-model="email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="registerPassword" label="Password:" label-for="registerPassword">
          <b-form-input
            id="registerPassword"
            v-model="password"
            required
            placeholder="Enter password"
            type="password"
          ></b-form-input>
        </b-form-group>

        <b-button
          v-if="loading === false"
          @click.prevent="register"
          type="submit"
          variant="primary"
        >Register</b-button>
        <button v-else type="submit" @click.prevent>
          <i class="fas fa-spinner fa-pulse"></i>
        </button>
      </b-form>
      <p>
        Already have an account? Click here to
        <a
          href
          id="login-button"
          @click.prevent="showLoginForm"
        >login.</a>
      </p>
    </b-container>
  </div>
</template>

<script>
const url = "http://localhost:3000";
import axios from "axios";

export default {
  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      errorMessage: "",
      errorShow: "hidden",
      loading: false
    };
  },
  methods: {
    register: function() {
      this.loading = true;
      axios({
        method: "POST",
        url: `${url}/users/register`,
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          Swal.fire(
            "New account successfully created",
            "Please clicked the button to close!",
            "success"
          );
          localStorage.setItem("token", data.token);
          console.log("User successfully registered");
          this.$emit("show-dashboard-page");
        })
        .catch(err => {
          if (err.response) {
            this.errorMessage = err.response.data.message;
          } else if (err.request) {
            this.errorMessage = "No response from server";
          }
          this.errorShow = "visible";
        })
        .finally(() => {
          this.loading = false;
        });
    },
    showLoginForm() {
      this.resetRegisterForm();
      this.$emit("to-login-form");
    },
    resetRegisterForm() {
      this.name = "";
      this.email = "";
      this.password = "";
      this.errorMessage = "";
      this.errorShow = "hidden";
      this.loading = false;
    }
  }
};
</script>

<style scoped>
#registerForm {
  max-width: 50%;
  padding: 20px;
}
</style>