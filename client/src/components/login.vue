<template>
  <div class="login">
    <h3>Sign In</h3>
    <form>
      <div class="inputBody">
        <i class="far fa-envelope fa-2x"></i>
        <input type="text" placeholder="Email" v-model="emailLogin" />
      </div>

      <div class="inputBody">
        <i class="fas fa-lock fa-2x"></i>
        <input type="password" placeholder="Password" v-model="passwordlogin" />
      </div>
      <input type="submit" value="Sign In" @click.prevent="OkLogin" />
      <p style="font-size: 10px;">
        Don't have an Hackticle Account? Create
        <a
          @click.prevent="toRegister"
          href="#"
          style="text-decoration: none; color: #187ECF"
        >Here</a>
      </p>

      <div class="social">
        <p>Sign In with Social Account</p>
        <g-signin-button
          :params="googleSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError"
        >Sign in with Google</g-signin-button>
      </div>
    </form>
  </div>
</template>

<script>
let baseUrl = "http://35.187.228.79";
// let baseUrl = "http://localhost:3000";
import GSignInButton from "vue-google-signin-button";
import Axios from "axios";
import Swal from "sweetalert2";
export default {
  data: function() {
    return {
      emailLogin: "",
      passwordlogin: "",
      googleSignInParams: {
        client_id:
          "1076346870616-g67nkvgg398aenfju4u3u59252e4rrd7.apps.googleusercontent.com"
      }
    };
  },
  methods: {
    toRegister() {
      this.$emit("changeToRegisPage");
    },
    onSignInSuccess(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      Swal.fire({
        title: `Loggin In ......`,
        allowOutsideClick: () => !Swal.isLoading()
      });
      Swal.showLoading();
      Axios({
        method: `post`,
        url: `${baseUrl}/users/signin`,
        data: {
          token: id_token
        }
      })
        .then(data => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.id);
          Swal.close();
          Swal.fire("Success!", data.message, "success");
          this.$emit("toFirstPage");
        })
        .catch(error => {
          let msg = error.response.data.message || "Wrong Email/Password";
          Swal.fire("Error!", msg, "error");
        })
        .finally(() => {});
    },
    OkLogin() {
      let email = this.emailLogin;
      let password = this.passwordlogin;
      Swal.fire({
        title: `Loggin In ......`,
        allowOutsideClick: () => !Swal.isLoading()
      });
      Swal.showLoading();
      Axios({
        method: `post`,
        url: `${baseUrl}/users/login`,
        data: {
          email,
          password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.id);
          Swal.close();
          Swal.fire("Success!", data.message, "success");
          this.$emit("toFirstPage");
        })
        .catch(error => {
          let msg = error.response.data.message || "Wrong Email/Password";
          Swal.fire("Error!", msg, "error");
        })
        .finally(() => {
          this.emailLogin = "";
          this.passwordlogin = "";
        });
    },
    onSignInError(error) {
      Swal.fire("Error!", "Logged In Failed", "error");
    }
  }
};
</script>

<style scoped>
h3 {
  margin-bottom: 20px;
  font-size: 33px;
  font-weight: 600;
  line-height: 44px;
  color: #333;
}
.login {
  border-radius: 10px;
  width: 500px;
  height: 500px;
  margin: 10px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

form {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.login .inputBody {
  border: 2px solid #187ecf;
  border-radius: 10px;
  margin-bottom: 20px;
  height: 50px;
  width: 400px;
  display: flex;
  align-items: center;
  padding: 10px;
}

input[type="text"],
input[type="password"] {
  width: 400px;
  height: 40px;
  font-size: 16px;
  border: none;
  padding-left: 5px;
  outline: none;
}

input[type="submit"] {
  background-color: #187ecf;
  border-radius: 10px;
  margin-bottom: 10px;
  width: 400px;
  height: 50px;
  font-size: 20px;
  color: white;
}

div .social {
  margin-top: 10px;
  height: 60px;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}

.g-signin-button {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>