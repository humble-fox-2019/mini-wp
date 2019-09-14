<template>
  <div class="signin">
    <form @submit.prevent="signin">
      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" required autocomplete="off" v-model="email" />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          autocomplete="off"
          v-model="password"
        />
      </div>
      <transition name="shake">
        <div class="error" v-if="errors.length > 0">
          <ul>
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
        </div>
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
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    signin() {
      console.log("object");
    }
  }
};
</script>

<style scoped>
</style>