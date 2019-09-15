<template>
  <nav id="navbarout">
    <div class="left-nav-out">
      <a href="#" class="black" @click="clickHome()">
        <i class="fab fa-wordpress fa-2x black"></i> iPress
      </a>
    </div>
    <div class="right-nav-out">
      <div class="next-right">
        <div class="rightcorner">
          <button
            v-google-signin-button="clientId"
            class="google-signin-button"
          ><i class="fab fa-google"></i></button>
        </div>
        <div class="rightcorner">
          <div>
            <a href="#" @click="clickSignIn()">
              <i class="fas fa-sign-in-alt fa-lg right black"></i>
            </a>
          </div>
          <div>
            <a href="#" @click="clickSignUp()">
              <i class="fas fa-user-plus fa-lg black"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import GoogleSignInButton from "vue-google-signin-button-directive";
export default {
  directives: {
    GoogleSignInButton
  },
  component: {
    GoogleSignInButton
  },
  data() {
    return {
      clientId:
        "281543541051-9rj8v5412lbf0m167jpud70u4cmq02bo.apps.googleusercontent.com"
    };
  },
  methods: {
    clickSignIn() {
      this.$emit("changeToLogin");
    },
    clickSignUp() {
      this.$emit("changeToSignUp");
    },
    clickHome() {
      this.$emit("changeToHome");
    },
    OnGoogleAuthSuccess(idToken) {
      axios({
        method: "POST",
        url: "http://34.87.37.210/users/Gsignin",
        data: {
          idToken
        }
      }).then(data => {
        Swal.fire({
          position: "center",
          type: "success",
          title: "Successfully login",
          showConfirmButton: false,
          timer: 1500
        });
        localStorage.setItem("token", data.data.token);
        this.$emit('pageGIn')
      });
    },
    OnGoogleAuthFail (error) {
      console.log(error)
    }
  }
};
</script>

<style scoped>
#navbarout {
  display: flex;
  align-content: center;
  background-color: none;
}
.left-nav-out {
  padding: 15px;
  width: 10%;
}
.right-nav-out {
  padding: 15px;
  width: 90%;
  display: flex;
  justify-content: flex-end;
}
.black {
  color: black;
}
a {
  text-decoration: none;
}
.next-right {
  display: flex;
  width: 30%;
  justify-content: space-around;
}
.rightcorner {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.right {
  margin-right: 20px;
}
button {
  height:40px;
  width:40px;
  cursor: pointer;
}
</style>