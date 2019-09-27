<template>
  <div>
    <Navbar />
    <div class="home">
      <h1>Let's Go</h1>
      <form action @submit.prevent="login">
        <div>
          <div>
            <label for="emaillog">Name</label>
          </div>
          <input type="name" id="nameLogin" placeholder="Name" v-model="name" />
        </div>
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
          <button>Register</button>
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
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      let email = this.email;
      let password = this.password;
      let name = this.name;
      axios({
        url: "http://localhost:3000/register",
        method: "POST",
        data: {
          name,
          email,
          password
        }
      })
        .then(data => {
          Swal.fire({
            position: "center",
            type: "success",
            title: "Register Success",
            showConfirmButton: false,
            timer: 1500
          });
          localStorage.setItem("token", data.data.token);
          //this.$emit("pageIn");
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
</style>