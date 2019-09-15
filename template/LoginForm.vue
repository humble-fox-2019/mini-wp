<template>
  <div id="loginForm">
    <b-container>
      <h4>Login</h4>
      <b-alert variant="danger">Danger Alert</b-alert>
      <b-form>
        <b-form-group id="loginEmail" label="Email:" label-for="loginEmail">
          <b-form-input
            id="loginEmail"
            v-model="email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="loginPassword" label="Password:" label-for="loginPassword">
          <b-form-input
            id="loginPassword"
            v-model="password"
            required
            placeholder="Enter password"
            type="password"
          ></b-form-input>
        </b-form-group>
        <b-button
          v-if="loading === false"
          @click.prevent="login"
          type="submit"
          variant="primary"
        >Login</b-button>
        <b-button v-else type="submit" @click.prevent variant="primary">
          <i class="fas fa-spinner fa-pulse"></i>
        </b-button>
      </b-form>
      <div id="loginOption">
        <div>
          <!-- <div class="g-signin2" id="gmail" data-onsuccess="onSignIn"></div> -->
        </div>
      </div>
      <p>
        Don't have an account? Click here to
        <a
          href="#"
          id="register-button"
          @click.prevent="showRegisterForm"
        >register.</a>
      </p>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
const url = "http://localhost:3000";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      errorShow: "hidden",
      loading: false
    };
  },
  methods: {
    login: function() {
      this.loading = true;
      axios({
        method: "POST",
        url: `${url}/users/login`,
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          this.resetLoginForm();
          Swal.fire(
            "Successfully signed in",
            "Please clicked the button to close!",
            "success"
          );
          localStorage.setItem("token", data.token);
          console.log("User successfully signed in");
          this.$emit("show-dashboard-page");
        })
        .catch(err => {
          if (err.response) {
            this.error = err.response.data.message;
          } else if (err.request) {
            this.error = "No response from server side";
          }
          this.errorShow = "visible";
        })
        .finally(() => {
          this.loading = false;
        });
    },
    showRegisterForm() {
      this.resetLoginForm();
      this.$emit("to-register-form");
    },
    resetLoginForm() {
      this.email = "";
      this.password = "";
      this.errorMessage = "";
      this.errorShow = "hidden";
      this.loading = false;
    }
  }
};
</script>

<style>
#loginForm {
  max-width: 50%;
  padding: 20px;
}

#gmail {
  margin-left: 15px;
}
</style>