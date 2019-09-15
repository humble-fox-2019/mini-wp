<template>
  <!-- Default form login -->

  <div class="card-body mx-auto mt-2" id="formLogin" style="width:30%">
    <div  style="display:flex;">
    <!-- <img :src="image" class="mx-auto" style="width:200px;height:200px"> -->
    </div>
    <h2 class="text-center">Sign In</h2>
    <form v-on:submit.prevent="login">
      <div class="form-group">
        <label for="email">E-mail:</label>
        <input v-model="inputEmail" type="email" class="form-control" id="email" required />
      </div>
      <div class="form-group">
        <label for="pwd">Password:</label>
        <input v-model="inputPassword" type="password" class="form-control" id="pwd" required />
      </div>
      <center>
        <button
          type="submit"
          class="btn btn-default"
          style="font-weight:bold;background-color:rgb(34, 4, 65);color:rgb(255, 255, 255);"
        >login</button>
      </center>
    </form>
    <hr />
    <div class="text-center">
      <button style="font-weight:bold"   v-google-signin-button="clientId" class="google-signin-button">Continue with Google</button>
    </div>
    <hr />
    <!-- <h3>OR</h3> -->

    <center>
      <span>Doesn't have an account?</span>
    </center>
    <center>
      <span>
        Register
        <a href="#" @click="showRegisterForm()">here</a>
      </span>
    </center>
    <hr />
  </div>

  <!-- Default form login -->
</template>
<script>
import axios from "axios";
import GoogleSignInButton from "vue-google-signin-button-directive";
import GSignInButton from "vue-google-signin-button";
// import Swal from "sweetalert2"
import image from '../../img/logo.png'

export default {
    directives: {
    GoogleSignInButton
  },
  data() {
    return {
      image : image,
      clientId:
          "323874734298-vrlavakg3iqb6ig2qbp22c7ijisk1pd9.apps.googleusercontent.com",
      googleSignInParams: {
        clientId:
          "323874734298-vrlavakg3iqb6ig2qbp22c7ijisk1pd9.apps.googleusercontent.com"
      },
      inputEmail: "",
      inputPassword: "",
      isInit: false,
      isSignIn: false
    };
  },
  methods: {

    OnGoogleAuthSuccess(idToken) {
      // Receive the idToken and make your magic with the backend
      console.log(idToken)
      axios({
        method: "POST",
        url: "http://localhost:3000/users/signIn",
        data: {
            idToken
        }
        })
        .then(response => {
          localStorage.setItem("token", response.data.token);
          // localStorage.setItem("author", response.data.author);
          localStorage.setItem("currentUser", response.data.currentUser) 
          let currentUser = JSON.parse(localStorage.getItem("currentUser"))
          this.$emit("fromLoginFormLoginCond", true)
        })
        .catch(err => {
            console.log("error")
        })
    },
    OnGoogleAuthFail(error) {
      console.log(error);
    },
    login() {
      console.log(this.inputEmail, this.inputPassword);
      let email = this.inputEmail;
      let password = this.inputPassword;
      axios({
        method: "POST",
        url: `http://localhost:3000/users/login`,
        data: {
          email,
          password
        }
      })
        .then(response => {
          Swal.fire({
                    type: 'success',
                    title: 'Login success !',
                    showConfirmButton: false,
                    timer: 1500
                })
          // console.log(response.data);
          // console.log(JSON.parse(response.data.currentUser).username)
          localStorage.setItem("currentUser", response.data.currentUser) 
          localStorage.setItem("token", response.data.token);
          let currentUser = JSON.parse(localStorage.getItem("currentUser"))
          // console.log(currentUser)
          // console.log(currentUser.username)
          // localStorage.setItem("author", response.data.author);
          this.$emit("fromLoginFormLoginCond", true, currentUser);
        })
        .catch(err => {
          let message = err.response.data.message || "please input valid data";
          Swal.fire({
                    type: 'error',
                    title: 'Login failed !',
                    text:message
                })
        });
    },
    showRegisterForm() {
      this.$emit("fromLoginFormRegisterCond", false);
    },
   
  },
  mounted() {
    // let that = this
    // let checkGauthLoad = setInterval(function(){
    //   that.isInit = that.$gAuth.isInit
    //   that.isSignIn = that.$gAuth.isAuthorized
    //   if(that.isInit) clearInterval(checkGauthLoad)
    // }, 1000);
  }
};
</script>
<style>
.google-signin-button {
  color: white;
  background-color: rgb(34, 4, 65);
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
