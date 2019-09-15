<template>
  <nav class="navbarin">
    <div class="left-nav">
      <a href="#" style="cursor: default;">
        <i class="fab fa-wordpress fa-lg"></i> iPress
      </a>
    </div>
    <div class="right-nav">
      <div class="next-right">
        <div>
          <button class="right" id="button1" @click="checkWrite">
            <i class="far fa-edit write"></i>
            Write
          </button>
        </div>
        <div class="rightcorner">
          <div>
            <a href @click="signOut">
              <i class="fas fa-sign-out-alt fa-lg white"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  data() {
    return {};
  },
  methods: {
    signOut() {
      this.$emit("sign-out");
      localStorage.removeItem("token");
      Swal.fire("Success!","Successfully LoggedOut!", "success");
      let auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log("User signed out.");
      });
    },
    checkWrite(){
      this.$emit('writeArticle')

    }
  }
};
</script>

<style scoped>
.navbarin {
  display: flex;
  align-content: center;
}
.left-nav {
  background-color: black;
  padding: 15px;
  width: 10%;
}
.right-nav {
  background-color: #21759b;
  padding: 15px;
  width: 90%;
  display: flex;
  justify-content: space-between;
}
.white {
  color: white;
}
a {
  color: white;
  text-decoration: none;
}
.right {
  margin-right: 20px;
}
.rightcorner {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.write {
  color: #21759b;
}
.right-nav {
  background-color: #21759b;
  padding: 15px;
  width: 90%;
  display: flex;
  justify-content: flex-end;
}
.next-right {
  display: flex;
  width: 30%;
  justify-content: space-around;
}
#button1 {
  margin-right: 10%;
  border: none;
  color: #21759b;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  width: 120%;
  padding: 5%;
  cursor: pointer;
}
</style>