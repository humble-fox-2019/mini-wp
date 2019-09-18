<template>
  <section id="register-page">
    <!-- Register -->
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="card">
            <div class="card-header">Register</div>
            <div class="card-body">
              <form action @submit.prevent="doRegister()" id="register-form" name="register-form">
                <div class="form-group">
                  <label for="reg-name">Your Name</label>
                  <input
                    v-model="nameSignup"
                    autofocus
                    name="name"
                    type="text"
                    class="form-control"
                    id="reg-name"
                    placeholder="Enter yourname"
                  />
                </div>
                <div class="form-group">
                  <label for="reg-email">Email address</label>
                  <input
                    v-model="emailSignup"
                    name="email"
                    type="email"
                    class="form-control"
                    id="reg-email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                  <small id="emailHelp" class="form-text text-muted">
                    We'll never share your email
                    with
                    anyone
                    else.
                  </small>
                </div>
                <div class="form-group">
                  <label for="reg-password">Password</label>
                  <input
                    v-model="passwordSignup"
                    name="password"
                    type="password"
                    class="form-control"
                    id="reg-password"
                    placeholder="Password"
                  />
                </div>

                <button type="submit" class="btn btn-outline-primary">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END register -->
  </section>
</template>

<script>
import apis from "../apis/index";
const { axios, server } = apis;

export default {
  data() {
    return {
      //register
      emailSignup: "",
      passwordSignup: "",
      nameSignup: ""
    }
  },
  methods: {
    goHome() {
      this.$emit("goHome");
    },
    doRegister() {
      let email = this.emailSignup;
      let password = this.passwordSignup;
      let name = this.nameSignup;
      axios({
        method: "POST",
        url: `${server}/user/register`,
        data: {
          email,
          password,
          name
        }
      })
        .then(data => {
          localStorage.setItem("token", data.data.token);
          this.emailSignup = "";
          this.passwordSignup = "";
          this.nameSignup = "";
          this.goHome();
        })
        .catch(error => {
          let message =
            (error.response.data && error.response.data.message) ||
            "failed to register";
        });
    }
  }
};
</script>

<style>
#register-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
}
</style>