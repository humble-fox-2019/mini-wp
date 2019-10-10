<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <h1 class="mt-5">Welcome the Dark seeker</h1>
    <div class="sign-box mt-5 p-5">
      <div class="sign-in-box" v-if="signin">
        <h3 class="text-center mb-4">Sign in</h3>
        <form @submit.prevent="login()">
          <label class="mt-2">Email</label>
          <input
            type="email"
            autocomplete="off"
            class="form-control"
            v-model="email"
            placeholder="Input email"
          />
          <label class="mt-2">Password</label>
          <input
            type="password"
            autocomplete="off"
            class="form-control"
            v-model="password"
            placeholder="Input password"
          />
          <div class="text-center mt-4">
            <button type="submit" class="btn">login</button>
          </div>
        </form>
        <div class="mt-2">
          <h6>
            Doesn't have ? click
            <a href="#" @click.prevent="gotosignup()">here</a> for register
          </h6>
        </div>
      </div>
      <!--  -->
      <div class="sign-in-box" v-if="signup">
        <h3 class="text-center mb-4">Sign Up</h3>
        <form @submit.prevent="register()">
          <label class="mt-2">Username</label>
          <input
            type="text"
            autocomplete="off"
            class="form-control"
            v-model="username"
            placeholder="Input username"
          />
          <label class="mt-2">Email</label>
          <input
            type="email"
            autocomplete="off"
            class="form-control"
            v-model="email"
            placeholder="Input email"
          />
          <label class="mt-2">Password</label>
          <input
            type="password"
            autocomplete="off"
            class="form-control"
            v-model="password"
            placeholder="Input password"
          />
          <label class="mt-2">Profile Picture</label>
          <input
            type="file"
            v-on:change="handlefileupload($event)"
            lang="es"
            accept=".jpg"
            class="form-control"
          />
          <div class="text-center mt-4">
            <button type="submit" class="btn">Register</button>
          </div>
        </form>
        <div class="mt-2">
          <h6>
            Have account ? click
            <a href="#" @click.prevent="gotosignin()">here</a> for login
          </h6>
        </div>
      </div>
    </div>
    <h1 class="mt-5">Where only the curious one, who can find it</h1>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
const url = `http://35.240.137.247`;
export default {
  data() {
    return {
      signin: true,
      signup: false,
      email: "",
      password: "",
      username: ""
    };
  },
  props: ["isLogin"],
  methods: {
    handlefileupload(event) {
      let file = event.target.files || event.dataTransfer.files;
      this.file = file[0];
    },
    gotosignin() {
      this.email = "";
      this.username = "";
      this.password = "";
      this.signin = true;
      this.signup = false;
    },
    gotosignup() {
      this.email = "";
      this.username = "";
      this.password = "";
      this.signin = false;
      this.signup = true;
    },
    register() {
      Swal.showLoading()
      let formData = new FormData();
      formData.set("username", this.username);
      formData.set("email", this.email);
      formData.set("file", this.file);
      formData.set("password", this.password);
      axios({
        url: `${url}/users/register`,
        method: "post",
        data: formData
      })
        .then(({ data }) => {
          Swal.close();
          this.email = "";
          this.username = "";
          this.password = "";
          this.file = "";
          this.gotosignin();
          Swal.fire(`Success`, `Register complete`, `success`);
        })
        .catch(err => {
          console.log(err);
          Swal.fire(`Error`, `${err}`, `error`);
        });
    },
    login() {
      const data = {
        email: this.email,
        password: this.password
      };
      axios({
        url: `${url}/users/login`,
        method: "post",
        data
      })
        .then(({ data }) => {
          this.email = "";
          this.username = "";
          this.password = "";
          localStorage.setItem("username", data.name);
          localStorage.setItem("token", data.token);
          localStorage.setItem("image", data.img);
          this.$emit("login");
          Swal.fire(`Success`, `Login success, Hi ${data.name}`, `success`);
        })
        .catch(err => {
          console.log(err);
          Swal.fire(`Error`, `Invalid email or password`, `error`);
        });
    }
  }
};
</script>

<style scoped>
.sign-box {
  background-color: whitesmoke;
  border-radius: 5px;
}
input {
  transition: 0.5s all;
}
input:hover {
  transition: 0.5s all;
  border: 3px solid grey;
}
label {
  font-weight: bolder;
}
button {
  font-size: 20px;
  transition: 0.7s all;
}
button:hover {
  color: black;
  transition: 0.7s all;
}
a {
  font-weight: bolder;
  color: grey;
  transition: 0.7s all;
}
a:hover {
  transition: 0.7 s all;
  text-decoration: none;
}
h1 {
  color: black;
  font-size: 35px;
  transition: 1s all;
}
h1:hover {
  color: #262626;
  transition: 1s all;
}
</style>