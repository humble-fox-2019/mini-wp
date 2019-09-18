<template>
  <div class="navbar">
    <div class="logo">
      <img src="/assets/image/logo.png" alt />
      <h1>E.P</h1>
    </div>
    <div>
      <div class="dropdown">
        <button class="dropbtn">
          Sign In
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <form action class="formSign" @submit.prevent="signinMe">
            <h2>Sign In</h2>
            <label for>Email :</label>
            <input type="email" v-model="signEmail" />
            <label for>Password</label>
            <input type="password" v-model="signPassword" />
            <input type="submit" value="Submit" />
            <!-- <div id="google-signin-button" class="g-signin2" data-onsuccess="onSignIn"></div> -->
          </form>
            <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google <i class="fab fa-google"></button>
        </div>
      </div>
      <div class="dropdown">
        <button class="dropbtn">
          Register
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <form action class="formRegister" @submit.prevent="registMe">
            <h2>Register</h2>
            <label for>Name :</label>
            <input type="text" name="nameRegist" id="nameRegist" v-model="registerName" />
            <label for>Email :</label>
            <input type="email" name="emailRegist" id="emailRegist" v-model="registerEmail" />
            <label for>Password</label>
            <input
              type="password"
              name="passwordRegist"
              id="passwordRegister"
              v-model="registerPassword"
            />
            <input type="submit" value="Submit" />
            <!-- <div id="google-signin-button" class="g-signin2" data-onsuccess="onSignIn"></div> -->
          </form>
            <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google <i class="fab fa-google"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleSignInButton from "vue-google-signin-button-directive";
import toastr from "toastr";
toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-top-center",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "2500",
  extendedTimeOut: "800",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut"
};

let baseUrl = "http://35.247.158.142";
export default {
  directives: {
    GoogleSignInButton
  },
  component: {
    GoogleSignInButton
  },
  data() {
    return {
      registerName: "",
      registerEmail: "",
      registerPassword: "",
      signEmail: "",
      signPassword: "",
      clientId: "264807503866-e9bn257e3mpemegm957tjsglk87i12b6.apps.googleusercontent.com"
    };
  },
  mounted() {
    gapi.signin2.render('google-signin-button', {
      onsuccess: this.onSignIn
    })
  },
  methods: {
    OnGoogleAuthSuccess(idToken) {
      // console.log("idToken",idToken);
      // const token = googleUser.getAuthResponse().id_token;
      axios({
        method: "POST",
        url: baseUrl + "/users/signGoogle",
        data: {
          googleToken: idToken
        }
      })
        .then(data => {
          // console.log("data", data);
          localStorage.setItem("token", data.data.token);
          this.$emit("doneSignG");
        })
        .catch(err => {
          console.log(err);
        });
    },

     OnGoogleAuthFail (error) {
      console.log(error)
    },

    signinMe() {
      let email = this.signEmail;
      let password = this.signPassword;
      axios({
        method: "POST",
        url: baseUrl + "/users/login",
        data: {
          email,
          password
        }
      })
        .then(response => {
          // console.log(response);
          localStorage.setItem("token", response.data.token);
          this.$emit("doneSignIn");
        })
        .catch(err => {
          let error = err.response.data.errMsg;
          toastr.warning(error).css({
            width: "500px",
            "max-width": "600px",
            height: "18vh",
            "font-size": "28px",
            display: "flex",
            "align-items": "center"
          });
        });
    },
    registMe() {
      let name = this.registerName;
      let email = this.registerEmail;
      let password = this.registerPassword;
      // console.log(name, email, password);
      axios({
        method: "POST",
        url: baseUrl + "/users/create",
        data: {
          name,
          email,
          password
        }
      })
        .then(response => {
          toastr.success("Success create an account").css({
            width: "500px",
            "max-width": "600px",
            height: "18vh",
            "font-size": "28px",
            display: "flex",
            "align-items": "center"
          });
        })
        .catch(err => {
          // console.log(err);
          let error = err.response.data.errMsg.join("<br>");
          toastr.warning(error).css({
            width: "500px",
            "max-width": "600px",
            height: "18vh",
            "font-size": "28px",
            display: "flex",
            "align-items": "center"
          });
        });
    },
    clearInput() {
      this.registerName = "";
      this.registerEmail = "";
      this.registerPassword = "";
      this.signEmail = "";
      this.signPassword = "";
    }
  }
};
</script>

<style scoped>
* {
  font-family: "Monstserrat Black", sans-serif;
}
.navbar {
  display: grid;
  grid-template-columns: 1.2fr 9fr;
  background: linear-gradient(rgb(77, 52, 52), rgb(29, 23, 23));
  overflow: hidden;
  height: 8vh;
  width: 100%;
  font-family: Arial;
  box-shadow: 0 -15px 15px -15px rgb(0, 0, 0) inset;
}

.logo {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

h1 {
  font-family: "Patua One", cursive;
  font-size: 40px;
  margin-left: 15px;
  margin-block-start: 0.2em;
  justify-self: flex-start;
  color: gold;
}

h2 {
  font-size: 28px;
}

div.logo img {
  margin-left: 25px;
  width: 42%;
}

.dropdown {
  float: right;
  overflow: hidden;
}

.dropdown .dropbtn {
  height: 8vh;
  font-size: 28px;
  border: none;
  outline: none;
  color: white;
  background-color: inherit;
  font-family: inherit;
  margin-right: 20px;
}

.dropdown:hover .dropbtn {
  background-color: rgb(247, 211, 10);
  cursor: pointer;
  color: black;
}

.dropdown-content {
  padding-top: 1.3%;
  display: none;
  position: absolute;
  background-color: white;
  border-radius: 15px;
  width: 320px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  right: 0;
  left: auto;
  z-index: 1;
}

.dropdown-content a {
  float: none;
  color: black;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content {
  background-color: rgb(255, 255, 255);
}

.dropdown:hover .dropdown-content {
  display: block;
}

button.dropbtn {
  padding-left: 5px;
}

input[type="submit"] {
  border-radius: 10px;
  background: rgb(43, 63, 102);
  color: white;
  margin: 15% 10% 10% 10%;
  width: 30%;
  min-height: 4.8vh;
  align-self: flex-start;
  -webkit-appearance: none;
}

input[type="submit"]:hover {
  color: black;
  cursor: pointer;
  background: rgb(248, 209, 79);
}

input {
  font-size: 18px;
  width: 83%;
  height: 3.5vh;
}

label {
  margin-top: 4%;
  font-size: 22px;
}

.formSign {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.formRegister {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}


.google-signin-button {
  color: rgb(0, 0, 0);
  background-color: rgb(255, 187, 0);
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
  margin-bottom: 20px;
  margin-left : 32px;
}

.buttonGoogle p {
  margin-top: 12px;
  margin-left: 10px;
  font-size: 13pt;
}

.buttonGoogle {
  margin-left: 10%;
  color: aliceblue;
  align-self: flex-start;
  background: rgb(15, 15, 48);
  height: 50px;
  width: 250px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 0;
  margin-bottom: 55px;
}

div.g-signin2{
  align-self : flex-start;
  min-height : 60px;
  margin-left : 45px
}
</style>