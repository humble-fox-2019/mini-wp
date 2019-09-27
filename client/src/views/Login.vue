<template>
  <div>
    <Navbar />
    <div class="home">
      <h1>Let's Go</h1>
      <form action @submit.prevent="login">
        <div>
          <div>
            <label for="emaillog">Email</label>
          </div>
          <input type="email" id="emailLogin" placeholder="Email" v-model="email" />
        </div>
        <div>
          <div>
            <label for="passwordlog">Password</label>
          </div>
          <input type="password" id="passwordLogin" v-model="password" />
        </div>
        <div class="subss">
          <button>SignIn</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../components/LandingNavbar";
export default {
  components: {
    Navbar
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      let email = this.email;
      let password = this.password;
      axios({
        url: "http://localhost:3000/login",
        method: "POST",
        data: {
          email,
          password
        }
      })
        .then(data => {
          console.log(data);
          Swal.fire({
            position: "center",
            type: "success",
            title: "Successfully login",
            showConfirmButton: false,
            timer: 1500
          });
          localStorage.setItem("token", data.data.token);
          //this.$emit("pageIn");
          this.$router.push("Dashboard");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  width: 100%;
  font-family: "Exo", sans-serif;
  color: #fff;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
}

.login {
  display: flex;
  justify-content: center;
}
</style>