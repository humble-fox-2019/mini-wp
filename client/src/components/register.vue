<template>
  <div class="register">
    <form>
      <h3>Sign Up</h3>
      <div>
        <i class="far fa-user"></i>
        <input type="text" placeholder="Name" v-model="name" />
      </div>
      <div>
        <i class="far fa-envelope"></i>
        <input type="text" placeholder="Email" v-model="email" />
      </div>

      <div>
        <i class="fas fa-lock"></i>
        <input type="password" placeholder="Password" v-model="password" />
      </div>
      <input type="submit" value="Sign Up" @click.prevent="getRegister" />
      <p style="font-size: 10px;">
        Already have an Hackticle Account? Sign In
        <a
          @click.prevent="toLogin"
          href="#"
          style="text-decoration: none; color: #187ECF"
        >here</a>
      </p>
    </form>
  </div>
</template>

<script>
import Axios from "axios";
import Swal from "sweetalert2";

let baseUrl = `http://localhost:3000`;
export default {
  data: function() {
    return {
      name: "",
      password: "",
      email: ""
    };
  },
  methods: {
    toLogin() {
      this.$emit("changeToLoginPage");
    },
    getRegister() {
      let name = this.name;
      let email = this.email;
      let password = this.password;
      Swal.fire({
        title: `Creating Your Account...`,
        allowOutsideClick: () => !Swal.isLoading()
      });
      Swal.showLoading();
      Axios({
        method: `post`,
        url: `${baseUrl}/users`,
        data: {
          name,
          email,
          password
        }
      })
        .then(response => {
          Swal.close();
          Swal.fire("Success!", "Your Account is Created!", "success");
          this.$emit("registerDone");
        })
        .catch(error => {
          let msg = error.response.data.message || "Fail to Register";
          Swal.fire("Error!", msg, "error");
        })
        .finally(() => {
          this.name = "";
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>

<style scoped>
h3 {
  margin-bottom: 20px;
  font-size: 33px;
  font-weight: 600;
  line-height: 44px;
  color: #333;
}
.register {
  width: 500px;
  height: 500px;
  margin: 10px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

form {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.register div {
  border: 2px solid #187ecf;
  border-radius: 10px;
  margin-bottom: 20px;
  height: 50px;
  width: 400px;
  display: flex;
  align-items: center;
  padding: 10px;
}

input[type="text"],
input[type="password"] {
  width: 300px;
  height: 40px;
  font-size: 16px;
  border: none;
  padding-left: 5px;
  outline: none;
}

input[type="submit"] {
  background-color: #187ecf;
  border-radius: 10px;
  margin-bottom: 10px;
  width: 400px;
  height: 50px;
  font-size: 20px;
  color: white;
}

div .social {
  border: none;
  display: flex;
  flex-direction: column;
}
</style>