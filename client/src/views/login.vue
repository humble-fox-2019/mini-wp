<template>
  <section id="login-page">
    <!-- Login // id = "login-container" -->
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="card">
            <div class="card-header">Login</div>
            <div class="card-body">
              <form id="login-form" name="login-form" action @submit.prevent="doLogin">
                <div class="form-group">
                  <label for="login-email">Email address</label>
                  <input
                    v-model="emailLogin"
                    autofocus
                    name="email"
                    type="email"
                    class="form-control"
                    id="login-email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div class="form-group">
                  <label for="login-password">Password</label>
                  <input
                    v-model="passwordLogin"
                    name="password"
                    type="password"
                    class="form-control"
                    id="login-password"
                    placeholder="Password"
                  />
                </div>

                <button type="submit" class="btn btn-primary">Login</button>
              </form>
              <hr />
              <span>
                No account ?
                <a @click.prevent="goRegister" id="linkregister" href="#">
                  <b>Create an account</b>
                </a>
                to use Play Blog for
                free!
              </span>
              <hr />Or you can Sign In with your Google Account
              <button
                v-google-signin-button="clientId"
                class="btn btn-sm"
              >
                <i class="fab fa-google"></i>
                Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END LOGIN -->
  </section>
</template>

<script>
import apis from "../apis/index";
const { axios, server } = apis;
import GoogleSignInButton from "vue-google-signin-button-directive";

export default {
  directives: {
    GoogleSignInButton
  },
  components: {
    GoogleSignInButton
  },
  data() {
    return {
      //pro
      //clientId: "6563466045-u3o93sc9nqt5j4gecgtsv0556er9odsv.apps.googleusercontent.com",
      //dev
      clientId:
        "759176216490-0q9hohfl7r2v9gmi1jguv7nbh6b2p2cp.apps.googleusercontent.com",
      emailLogin: "",
      passwordLogin: ""
    };
  },
  methods: {
    goRegister() {
      this.$emit("goRegister");
    },

    goHome() {
      this.$emit("goHome");
    },

    doLogin() {
      let email = this.emailLogin;
      let password = this.passwordLogin;
      axios({
        url: `${server}/user/login`,
        method: "POST",
        data: {
          email,
          password
        }
      })
        .then(data => {
          localStorage.setItem("token", data.data.token);
          this.emailLogin = "";
          this.passwordLogin = "";
          this.goHome();
        })
        .catch(err => {
          console.log(err);
        });
    },
    OnGoogleAuthSuccess(id_token) {
      axios({
        method: "POST",
        url: `${server}/user/googleSignIn`,
        headers: {
          id_token
        }
      }).then(data => {
        localStorage.setItem("token", data.data.token);
        this.goHome();
      });
    },
    OnGoogleAuthFail(error) {
      console.log(error);
    }
  }
};
</script>

<style>
#login-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
}

.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>