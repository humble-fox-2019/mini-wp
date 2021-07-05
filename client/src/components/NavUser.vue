<template>
  <div class="navbar-dash">
    <div class="logo">
      <img src="/assets/image/logo.png" alt />
      <h2>

      E.P
      </h2>
    </div>
    <div class="icon">
      <div class="reader" id="icon-bar" @click="backToHome">Home</div>
      <div class="write" id="icon-bar" @click="getWriteForm">Write</div>
      <div class="logout" id="icon-bar" @click="signOutMe">Logout</div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {};
  },
  methods: {
    signOutMe() {
      Swal.fire({
        title: "Are you sure to log out?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Log Out"
      }).then(result =>{
        if (result.value){
          localStorage.removeItem("token");
          if (gapi){
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                // console.log('User signed out.');
            });
          }
          this.$emit("signOut");
          Swal.fire("See you again", "Success to log out", "success");
          this.$router.push('/')
        }
        else {
          Swal.fire("Cancel", "You still online here..", "success");
        }
      })
    },
    backToHome() {
      this.$emit("changeToGetAll");
    },
    getWriteForm() {
      this.$emit("changeToWrite");
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.navbar-dash {
  display: grid;
  grid-template-columns: 1.2fr 9fr;
  width: 100%;
  height: 8vh;
  position: sticky;
  top: 0;
  background: rgb(52, 87, 97);
  font-family: "Patua One", cursive;
  font-size: 3vh;
  color: white;
  z-index: 10;
}

.logo {
  box-shadow: 0 -15px 15px -15px black inset;
  padding-left: 10px;
  background: rgb(52, 87, 97);
  display: flex;
  justify-content: flex-start;
}

div.logo h4 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: rgb(255, 208, 0);
  font-family: "Diplomata SC", cursive;
  font-weight: bolder;
  font-size: 20px;
}

div.logo img {
  margin-left: 25px;
  width: 45%;
}

.icon {
  box-shadow: 0 -15px 15px -15px rgb(0, 0, 0) inset;
  display: flex;
  flex-direction: columns;
  justify-content: flex-end;
  background: rgb(52, 87, 97);
}

h2 {
  font-family: 'Patua One', cursive;
  font-size: 34px;
  margin-left: 15px;
  margin-block-start: 0.2em;
  justify-self: flex-start;
  color: gold;
}

#icon-bar {
  margin-right: 2.5%;
  margin-top: 0.5%;
  font-size: 35px;
  font-weight: bolder;
}

#icon-bar:hover {
  color: rgb(247, 213, 26);
  cursor: pointer;
}
</style>>
