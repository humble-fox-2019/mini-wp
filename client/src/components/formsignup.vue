<template>
  <div class="sign-in">
    <div class="signin">
      <div class="formsign">
        <h1>Sign Up</h1>
        <form action @submit.prevent="register">
          <div>
            <div>
              <label for="Name">Name</label>
            </div>
            <input type="text" id="Name" placeholder="Name" v-model="nameSignup" />
            <div>
              <label for="email">Email</label>
            </div>
            <input type="email" id="email" placeholder="Email" v-model="emailSignup" />
          </div>
          <div>
            <div>
              <label for="password">Password</label>
            </div>

            <input type="password" id="password" v-model="passwordSignup" />
          </div>
          <div class="subss">
            <button>SignUp</button>
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
        emailSignup: '',
        passwordSignup: '',
        nameSignup: ''
    };
  },
  methods: {
    register() {
      let email = this.emailSignup;
      let password = this.passwordSignup;
      let name = this.nameSignup;
      axios({
        method: "POST",
        url: "http://34.87.37.210/users/register",
        data: {
          email,
          password,
          name
        }
      })
        .then(data => {
          Swal.fire({
            position: "center",
            type: "success",
            title: "Your Data is Registered",
            showConfirmButton: false,
            timer: 1500
          });
          this.$emit('register')
        })
        .catch(error => {
          let message = error.response.data && error.response.data.message || 'failed to register'
          Swal.fire("Error!",message, "error");
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