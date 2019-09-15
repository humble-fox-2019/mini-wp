<template>
  <div class="sign-in">
    <div class="signin">
      <div class="formsign">
        <h1>Sign In</h1>
        <form action @submit.prevent="signIn">
          <div>
            <div>
              <label for="emaillog">Email</label>
            </div>
            <input type="email" id="emaillog" placeholder="Email" v-model="emailLogin" />
          </div>
          <div>
            <div>
              <label for="passwordlog">Password</label>
            </div>
            <input type="password" id="passwordlog" v-model="passwordLogin" />
          </div>
          <div class="subss">
            <button>SignIn</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emailLogin: "",
      passwordLogin: ""
    };
  },
  methods: {
    signIn() {
      let email = this.emailLogin;
      let password = this.passwordLogin;
      axios({
        url: "http://34.87.37.210/users/signin",
        method: "POST",
        data: {
          email,
          password
        }
      })
        .then(data => {
          Swal.fire({
            position: "center",
            type: "success",
            title: "Successfully login",
            showConfirmButton: false,
            timer: 1500
          });
          localStorage.setItem("token", data.data.token);
          this.$emit("pageIn");
        })
        .catch(err => {
          let message =
            (error.response.data && error.response.data.message) ||
            "failed to SignIn";
          Swal.fire("Error!", message, "error");
        });
    }
  }
};
</script>

<style scoped>
.sign-in {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
.signin {
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0002;
}
.formsign {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90%;
  justify-content: center;
}
.subss {
  margin-top: 5%;
}
</style>