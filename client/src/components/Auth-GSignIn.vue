<template>
  <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>

</template>

<script>
import axios from '../api/server';
import GoogleSignInButton from 'vue-google-signin-button-directive'
export default {
  directives: {
    GoogleSignInButton
  },
  data: () => ({
    clientId: '992859751739-vsdj5hisdtus8h8g69renopa77igc7ad.apps.googleusercontent.com'
  }),
  methods: {
    OnGoogleAuthSuccess (idToken) {
      axios({
          url: '/users/signin/google',
          method: 'POST',
          data: {
              idToken
          }
      })
      .then(({data}) => {
        localStorage.setItem('token', data.token);
        let auth = {
          isLogin: true,
          name: data.name,
        }
        this.$emit('gauth',auth);
      })
      .catch(err => {
        if(err.response) {
            console.log(err.response.data);
            this.$toasted.show(err);
        } else {
            console.log(err.message);
            this.$toasted.show(err.message);
        }
      })
      // Receive the idToken and make your magic with the backend
    },
    OnGoogleAuthFail (err) {
        console.log(err)
        this.$toasted.show(err.error);
    }
  }
}
</script>

<style scoped>
button {
  
}
</style>