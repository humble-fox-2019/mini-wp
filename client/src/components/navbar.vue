<template>
  <nav>
    <div class="text">
      <h3>
        <a href="#">Hackticle</a>
      </h3>
      <h4>
        <a href="#">Public</a>
      </h4>
      <h4>
        <a href="#">Publish</a>
      </h4>
      <h4>
        <a href="#">Draft</a>
      </h4>
    </div>
    <div class="icon">
      <h3 :style="{visibility : isVisibleWrite, transition : '.5s'}">Write</h3>
      <a @click.prevent="toWritePage" href="#" @mouseover="showWrite" @mouseleave="hiddenWrite">
        <i class="fas fa-edit" style="color:white"></i>
      </a>
      <a href="#" @click="signOut()" @mouseover="showLogout" @mouseleave="hiddenLogout">
        <i class="fas fa-sign-out-alt" style="color:white"></i>
      </a>
      <h3
        style="padding-left:10px"
        :style="{visibility : isVisibleLogout, transition : '.5s'}"
      >Logout</h3>
    </div>
  </nav>
</template>

<script>
export default {
  data: function() {
    return {
      isVisibleWrite: "hidden",
      isVisibleLogout: "hidden"
    };
  },
  methods: {
    showLogout() {
      this.isVisibleLogout = "visible";
    },
    showWrite() {
      this.isVisibleWrite = "visible";
    },
    hiddenWrite() {
      this.isVisibleWrite = "hidden";
    },
    hiddenLogout() {
      this.isVisibleLogout = "hidden";
    },
    toWritePage() {
      this.$emit("toSecondPage");
    },
    signOut() {
      if (gapi.auth2) {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function() {
          console.log("User signed out.");
        });
      }
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      this.$emit("toLandingPage");
    }
  }
};
</script>

<style scoped>
nav {
  width: 100vw;
  height: 50px;
  background-color: #187ecf;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.text {
  display: flex;
  justify-content: space-between;
  width: 400px;
}

.text a {
  text-decoration: none;
  color: white;
}

.text h4 {
  font-size: 16px;
  align-self: center;
  color: white;
}

.icon a {
  text-decoration: none;
}

.icon {
  display: flex;
  align-items: center;
  width: 200px;
}

h3 {
  font-family: "Work Sans", sans-serif;
  color: white;
  font-size: 30px;
}

.icon h3 {
  font-size: 16px;
}

.icon i {
  margin-left: 10px;
}
</style>