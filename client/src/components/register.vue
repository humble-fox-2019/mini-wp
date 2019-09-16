<template>
  <!-- REGISTER PART -->
  <div class="b-container homepage mt-5 flex-box d-flex align-items-center">
    <div class="banner-outer register-form align-items-center col-5">
      <div class="banner-inner">
        <h1 class="welcome-register">Welcome to People Press</h1>
        <form>
          <table>
            <tr>
              <td>Name</td>
              <td>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="your name"
                  v-model="name"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="your email"
                  v-model="email"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="your password"
                  v-model="password"
                  required
                />
              </td>
            </tr>
          </table>
          <br />
          <div class="btn-group ml-3">
            <a
              href="#"
              class="btn-register btn btn-success"
              type="click"
              @click.prevent="register"
            >Register</a>
          </div>
          <button @click="onSignIn">Continue with Google</button>
          <!-- <a href="#" @click.prevent="signOutGoogle">Sign out</a> -->

          <br />
        </form>
        <br />
      </div>
    </div>
    <!-- LOGIN PART -->

    <div class="banner-inner col">
      <h1 class="welcome-login">Already have Account?</h1>
      <h2 class="motto">Login Now!</h2>
      <form action>
        <table>
          <tr>
            <td>Email</td>
            <td>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="your email"
                v-model="emailLogin"
                required
              />
            </td>
          </tr>
          <tr>
            <td>Password</td>
            <td>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="your password"
                v-model="passwordLogin"
                required
              />
            </td>
          </tr>
        </table>
        <br />
        <a href class="btn-loginId btn btn-success" @click.prevent="login">login now</a>
        <br />
      </form>
      <br />
    </div>
  </div>

  <!-- <div class="banner-outer register-form align-items-center col-5"></div> -->
</template>

<script>
const baseUrl = "http://35.240.238.224/user";
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      emailLogin: "",
      passwordLogin: ""
    };
  },
  mounted() {
    console.log("masuk");
  },

  // BAGIAN LOGIN NORMAL
  methods: {
    login() {
      console.log("masuk ke bagian login bro");
      let obj = {
        email: this.emailLogin,
        password: this.passwordLogin
      };
      console.log(obj, "<<<  masuk ke bagian login");
      axios({
        method: "POST",
        url: `${baseUrl}/login`,
        data: obj
      })
        .then(({ data }) => {
          console.log("masuk berhasil broooo");
          console.log(data, "INI DATANYA BROOOOO");
          localStorage.setItem("token", data.token);
          this.$emit("login");
        })
        .catch(err => {
          console.log(err, "<<<< ini errornyaa broooh");
        });
    },

    // BAGIAN REGISTER
    register() {
      console.log("masuk ke register cok");
      let obj = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      console.log();
      axios({
        method: "POST",
        url: baseUrl,
        data: obj
      })
        .then(({ data }) => {
          this.$emit("fromRegister", data);
        })
        .catch(err => {
          console.log(err, "disini errornya");
        });
    },

    // BAGIAN LOGIN GOOGLE
    onSignIn() {
      // console.log(googleUser, "<<<<< BERHASIL MASUK KE GOOGLE");
      console.log("masuk ke googlenya kembaliii");
      this.$gAuth
        .signIn()
        .then(googleUser => {
          console.log(googleUser, "<<<< INI GOOGLE SIGN IN NYA BROH");
          return axios({
            method: "post",
            url: `${baseUrl}/signInGoogle`,
            data: {
              token: googleUser.getAuthResponse().id_token
            }
          });
        })
        .then(({ data }) => {
          console.log("berhasil masuk ke google sign in");
          localStorage.setItem("token", data.token);
          this.$emit("loginGoogle");
        })
        .catch(({ response }) => {
          console.log(response.data, "<<< ini errornya ada di google sign in");
        });
    },

    // BAGIAN LOGOUT
    // signOutGoogle() {
    //   this.$gAuth
    //     .signOut()
    //     .then(() => {
    //       localStorage.clear();
    //     })
    //     .catch(error => {
    //       console.log(error, "<<< DISINI ERORRNYA BRAY");
    //     });
    // }
  }
};
</script>

<style>
</style>