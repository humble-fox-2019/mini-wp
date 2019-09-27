<template>
  <div class="left-bar">
    <div class="account">
      <div class="avatarImg">
        <img
          src="https://img.pngio.com/blank-avatarpng-avatar-png-486_489.png"
          alt="Avatar"
        />
        <h2>{{nameUser}}</h2>
      </div>
    </div>
    <div class="media">
      <p class="newArticle">
        <i class="fas fa-plus-square" type="button" @click="getFormArticle"></i> Create Article
      </p>
      <p class="userArticle">
        <i class="fas fa-newspaper" type="button" @click="showDashboard"></i> My Article
      </p>
      <p name="none">
        <i class="fas fa-tools" type="button" ></i> Setting
      </p>
      <p name="none">
        <i class="fas fa-border-all" type="button" ></i> Style
      </p>
    </div>
  </div>
</template>

<script>
let baseUrl = 'http://35.247.158.142'
export default {
  data() {
    return {
      nameUser : ""
    };
  },
  props: {
    user: String
  },
  methods: {
    getFormArticle() {
      this.$emit("changeToWrite");
    },
    showDashboard() {
      this.$emit("changeToGetAll");
    },
    getUser(){
      axios({
        method : 'GET',
        url : baseUrl+'/users/account',
        headers : {
          token : localStorage.token
        }
      })
      .then(response =>{
        this.nameUser = response.data.name
      })
    }
  },
  created() {
   this.getUser()
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Heebo|Merriweather|Montserrat|Patua+One&display=swap");

.left-bar {
  height: 100%;
  background: rgb(219, 219, 214);
  box-shadow: -10px 0 10px -10px rgb(134, 125, 125) inset;
}

.account {
  color: aliceblue;
  height: 36vh;
  background: linear-gradient(180deg, rgb(19, 2, 11), rgb(87, 86, 80));
  box-shadow: -10px 0 10px -10px rgb(134, 125, 125) inset;
}

h2{
  font-family: 'Montserrat', sans-serif;
  font-weight: bolder;
  font-size: 30;
}

.avatarImg {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10%;
}

div.avatarImg img {
  margin: 20px;
  width: 10vw;
  border-radius: 50%;
}

.media {
  font-family: 'Heebo', sans-serif;
  font-size: 18px;
  font-weight: bold;
  padding: 9%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background: rgb(219, 219, 214);
  box-shadow: -10px 0 10px -10px rgb(134, 125, 125) inset;
}

.media p{
  margin: 15px
}

.media p:hover {
  color: rgb(8, 67, 134);
  font-size: 21px;
  cursor: pointer;
}
.media p:hover[name="none"] {
  color: rgb(8, 67, 134);
  font-size: 21px;
  cursor: not-allowed;
}
</style>