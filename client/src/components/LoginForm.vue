<template>
  <div id="loginForm">
    <b-container>
      <h4>Login</h4>
      <b-alert :style="{visibility:errorShow}" variant="danger" show fade>{{errorMessage}}</b-alert>
      <b-form>
        <b-form-group id="loginEmailGroup" label="Email:" label-for="loginEmail">
          <b-form-input
            id="loginEmail"
            v-model="email"
            type="email"
            required
            placeholder="Enter email"
            class="border-left-0 border-right-0 border-top-0"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="loginPasswordGroup" label="Password:" label-for="loginPassword">
          <b-form-input
            id="loginPassword"
            v-model="password"
            required
            placeholder="Enter password"
            type="password"
            class="border-left-0 border-right-0 border-top-0"
          ></b-form-input>
        </b-form-group>
        <b-button
          id="loginButton"
          v-if="loading === false"
          @click.prevent="login"
          type="submit"
        >Login</b-button>
        <b-button id="loginButton" v-else type="submit" @click.prevent>
          <i class="fas fa-spinner fa-pulse"></i>
        </b-button>
      </b-form>
      <div id="loginOption">
        <g-signin-button
          :params="googleSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError"
        >Sign in with Google</g-signin-button>
      </div>
      <br />
      <p>
        Don't have an account? Click here to
        <a
          href
          id="register-button"
          @click.prevent="showRegisterForm"
        >register.</a>
      </p>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
const url = "http://localhost:3000";
// const url = "http://35.246.229.159";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      errorShow: "hidden",
      loading: false,
      googleSignInParams: {
        client_id:
          "450205956534-t8mv0qj0kqcc53van5mbbahtk9vg8b40.apps.googleusercontent.com"
        // "706669614539-mg5oc4j27qsqm759nibl6gil3crk8s7i.apps.googleusercontent.com"
      }
    };
  },
  methods: {
    onSignInSuccess(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token;
      axios({
        url: `${url}/users/login-google`,
        method: "POST",
        data: {
          id_token: id_token
        }
      })
        .then(response => {
          console.log(response.data.token);
          localStorage.setItem("token", response.data.token);
          this.resetLoginForm();
          Swal.fire(
            "Successfully signed in",
            "Please clicked the button to close!",
            "success"
          );
          console.log("User successfully signed in");
          this.$emit("show-dashboard-page");
        })
        .catch(err => {
          console.log(err.response.data);
          if (err.response) {
            this.errorMessage = err.response.data;
          } else if (err.request) {
            this.errorMessage = "No response from server side";
          }
          this.errorShow = "visible";
        });
    },
    onSignInError(error) {
      console.log("OH NOES", error);
    },
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
        .then(response => {
          localStorage.setItem("token", response.data.token);
          this.resetLoginForm();
          Swal.fire(
            "Successfully signed in",
            "Please clicked the button to close!",
            "success"
          );
          console.log("User successfully signed in");
          this.$emit("show-dashboard-page");
        })
        .catch(err => {
          console.log(err.response.data);
          if (err.response) {
            this.errorMessage = err.response.data;
          } else if (err.request) {
            this.errorMessage = "No response from server side";
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
  margin-top: 10px;
  font-family: "Crimson Pro";
}

#loginEmailGroup {
  margin-top: 20px;
}

#loginButton {
  background-image: linear-gradient(to bottom right, #09203f, #537895);
  border: none;
  box-shadow: 0px 10px 10px -5px #111;
}

#gmail {
  margin-top: 10px;
}

.g-signin-button {
  margin-top: 10px;
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>