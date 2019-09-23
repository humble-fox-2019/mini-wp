<template>
  <div id="registerForm">
    <b-container>
      <b-form>
        <h4>Register</h4>
        <b-alert :style="{visibility:errorShow}" variant="danger" show fade>{{errorMessage}}</b-alert>
        <b-form-group id="registerNameGroup" label="Name:" label-for="registerName">
          <b-form-input
            id="registerName"
            v-model="name"
            required
            placeholder="Enter name"
            class="border-left-0 border-right-0 border-top-0"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="registerEmailGroup" label="Email:" label-for="registerEmail">
          <b-form-input
            id="registerEmail"
            v-model="email"
            type="email"
            required
            placeholder="Enter email"
            class="border-left-0 border-right-0 border-top-0"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="registerPasswordGroup" label="Password:" label-for="registerPassword">
          <b-form-input
            id="registerPassword"
            v-model="password"
            required
            placeholder="Enter password"
            type="password"
            class="border-left-0 border-right-0 border-top-0"
          ></b-form-input>
        </b-form-group>

        <b-button
          id="registerButton"
          v-if="loading === false"
          @click.prevent="register"
          type="submit"
        >Register</b-button>
        <button v-else type="submit" @click.prevent>
          <i class="fas fa-spinner fa-pulse"></i>
        </button>
      </b-form>
      <br />
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
// const url = "http://35.246.229.159";
import axios from "axios";
import Swal from "sweetalert2";

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
            this.errorMessage = err.response.data;
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
  margin-top: 10px;
  font-family: "Crimson Pro";
}

#registerNameGroup {
  margin-top: 20px;
}

#registerButton {
  background-image: linear-gradient(to bottom right, #09203f, #537895);
  border: none;
  box-shadow: 0px 10px 10px -5px #111;
}
</style>