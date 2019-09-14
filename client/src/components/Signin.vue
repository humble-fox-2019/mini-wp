<template>
  <div class="signin">
    <form @submit.prevent="signin">
      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" autocomplete="off" v-model="email" />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" autocomplete="off" v-model="password" />
      </div>
      <transition name="shake">
        <div class="error" v-if="errors.length > 0">{{errors}}</div>
      </transition>
      <button type="submit" class="btn btn-login" id="button-signin">Signin</button>
    </form>

    <div class="form-footer">
      <p>Don't have an account yet ?</p>
      <span @click="$emit('changepage', 'signup')">Signup here!</span>
    </div>
  </div>
</template>

<script>
import axios from "../api/server";

export default {
  data() {
    return {
      email: "candrasaputra@live.com",
      password: "password123",
      errors: ""
    };
  },
  methods: {
    signin() {
      axios
        .post("/signin", { email: this.email, password: this.password })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data.userData.id);
          localStorage.setItem("name", data.userData.name);
          this.$emit("changepage", "dashboard");
        })
        .catch(err => {
          this.errors = err.response.data.message;
          setTimeout(() => {
            this.errors = "";
          }, 2000);
        })
        .finally(() => {
          // Add some stuff like loading done
        });
    }
  }
};
</script>

<style scoped>
</style>