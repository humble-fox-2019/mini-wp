<template>
  <div class="signup">
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
                    <h1 class="h3 font-w700 mt-30 mb-10">Create New Account!</h1>
                    <h2 class="h5 font-w400 text-muted mb-0">Please add your details</h2>
                  </div>
                  <form class="js-validation-signin px-30" @submit.prevent="signup()">
                    <div class="form-group row">
                      <div class="col-12">
                        <div class="form-material floating">
                          <input
                            type="text"
                            class="form-control"
                            name="name"
                            id="name"
                            required
                            autocomplete="off"
                            v-model="name"
                          />
                          <label for="login-username">Your name</label>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-12">
                        <div class="form-material floating">
                          <input
                            type="email"
                            class="form-control"
                            name="email"
                            id="email"
                            required
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
                            name="password"
                            required
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
                      <button
                        type="submit"
                        class="btn btn-sm btn-hero btn-alt-success"
                        id="button-signup"
                      >
                        <i class="fas fa-plus mr-10"></i> Create Account
                      </button>
                      <div class="mt-30">
                        <a
                          style="cursor: pointer;"
                          class="link-effect text-muted mr-10 mb-5 d-inline-block"
                          @click="$emit('changepage', 'signin')"
                        >
                          <i class="fas fa-user mr-5"></i> signin
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
      name: "",
      email: "",
      password: "",
      errors: ""
    };
  },
  methods: {
    signup() {
      axios
        .post("/signup", {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          console.log(data);
          this.$emit("changepage", "signin");
        })
        .catch(err => {
          this.errors = err.response.data.message;
          setTimeout(() => {
            this.errors = "";
          }, 2000);
        })
        .finally(() => {
          // do some stuff like disabled loading
        });
    }
  }
};
</script>

<style>
</style>