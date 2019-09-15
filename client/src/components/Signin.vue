<template>
  <div class="signin">
    <div id="page-container" class="main-content-boxed side-trans-enabled">
      <!-- Main Container -->
      <div id="page-container" class="main-content-boxed side-trans-enabled">
        <main id="main-container" style="min-height: 107px;">
          <div
            class="bg-image"
            style="background-image: url('https://storage.googleapis.com/uplaod-files/public/write.jpg');"
          >
            <div class="row mx-0 bg-black-op">
              <div class="hero-static col-md-6 col-xl-8 d-none d-md-flex align-items-md-end">
                <div data-toggle="appear" class="p-30 js-appear-enabled animated fadeIn">
                  <p
                    class="font-size-h3 font-w600 text-white"
                  >Share your idea and inspire more people ~</p>
                  <p class="font-italic text-white-op">
                    Copyright ©
                    <span class="js-year-copy js-year-copy-enabled">2019</span>
                  </p>
                </div>
              </div>
              <div
                data-toggle="appear"
                data-class="animated fadeInRight"
                class="hero-static col-md-6 col-xl-4 d-flex align-items-center bg-white js-appear-enabled animated fadeInRight"
              >
                <div class="content content-full">
                  <div class="px-30 py-10">
                    <a href="#" class="link-effect font-w700">
                      <span class="font-size-xl text-primary-dark">Blog</span>
                      <span class="font-size-xl">tive</span>
                    </a>
                    <h1 class="h3 font-w700 mt-30 mb-10">Hi.. Welcome, inspirer!</h1>
                    <h2 class="h5 font-w400 text-muted mb-0">Please sign in</h2>
                  </div>
                  <form class="js-validation-signin px-30" @submit.prevent="signin">
                    <div class="form-group row">
                      <div class="col-12">
                        <div class="form-material floating">
                          <input
                            type="email"
                            class="form-control"
                            id="email"
                            autocomplete="off"
                            v-model="email"
                          />
                          <label for="login-username">Email</label>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-12">
                        <div class="form-material floating">
                          <input
                            type="password"
                            id="password"
                            class="form-control"
                            autocomplete="off"
                            v-model="password"
                          />
                          <label for="login-password">Password</label>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row"></div>

                    <transition name="shake">
                      <div
                        class="alert alert-danger alert-dismissable"
                        role="alert"
                        v-if="errors.length > 0"
                      >
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">×</span>
                        </button>
                        {{errors}}
                      </div>
                    </transition>

                    <div class="form-group">
                      <button type="submit" class="btn btn-sm btn-hero btn-alt-primary">
                        <i class="fas fa-sign-in-alt"></i> Sign In
                      </button>

                      <g-signin-button
                        :params="googleSignInParams"
                        @success="onSignInSuccess"
                        @error="onSignInError"
                      >Sign in with Google</g-signin-button>

                      <div class="mt-30">
                        <a
                          class="link-effect text-muted mr-10 mb-5 d-inline-block"
                          @click="$emit('changepage', 'signup')"
                          style="cursor: pointer;"
                        >
                          <i class="fas fa-plus mr-5"></i> Create Account
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <!-- END Main Container -->
    </div>
  </div>
</template>

<script>
import axios from "../api/server";

export default {
  data() {
    return {
      email: "", //candrasaputra@live.com
      password: "", //password123
      errors: "",
      googleSignInParams: {
        client_id:
          "780096317838-ar2ojvqo3811h0nom9cp1t8kjfe0cas5.apps.googleusercontent.com"
      }
    };
  },
  methods: {
    signin() {
      axios
        .post("/signin", { email: this.email, password: this.password })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data.userData.id);
          localStorage.setItem("name", data.userData.name);
          this.$emit("changepage", "dashboard");
        })
        .catch(err => {
          this.errors = err.response.data.message;
          setTimeout(() => {
            this.errors = "";
          }, 2000);
        })
        .finally(() => {
          // Add some stuff like loading done
        });
    },
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile(); // etc etc
      let idToken = googleUser.getAuthResponse().id_token;
      axios
        .post("/Gsignin", { idToken })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data.userData.id);
          localStorage.setItem("name", data.userData.name);
          this.$emit("changepage", "dashboard");
        })
        .catch(err => {
          this.errors = err.response.data.message;
          setTimeout(() => {
            this.errors = "";
          }, 2000);
        })
        .finally(() => {
          // Add some stuff like loading done
        });
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      console.log("OH NOES", error);
    }
  }
};
</script>

<style scoped>
.signin-header {
  padding: 10px;
  max-width: 1000px;
  margin: auto;
}
.logo {
  width: 140px;
}
.logo img {
  width: 50px;
}

.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 8px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
  cursor: pointer;
}
</style>