<template>
  <div class="read-article">
    <div class="box">
      <h2 class="label-artcle">{{title}}</h2>
      <div class="pic">
        <img v-bind:src="image" alt />
      </div>
      <div>
        <p>{{content}}</p>
      </div>
      <input type="button" @click="backToHome" value="Close"/>
    </div>
  </div>
</template>

<script>
let baseUrl = 'http://35.247.158.142'
export default {
  data() {
    return {
      title: "",
      content: "",
      image: ""
    };
  },
  methods: {
    backToHome() {
        this.$emit("changeToGetAll")
    }
  },
  props: {
    readOne: String
  },
  created() {
    axios({
      method: "GET",
      url: baseUrl + "/articles/" + this.readOne,
      headers: {
        token: localStorage.token
      }
    }).then(({ data }) => {
      this.title = data.article.title;
      this.content = data.article.content;
      this.image = data.article.featured_image;
    });
  }
};
</script>
<style scoped>

.read-article {
  background: #362908;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.box{
margin : 6%;
background: white;
min-height: 300px;
width: 80%;
display: flex;
flex-direction: column;
align-items:  center;
}

h2{
    font-size: 45px;
    margin-top: 58px
}
p{
    font-family :'Heebo', sans-serif;
    margin-top : 6vh;
    font-size: 13pt; 
    width : 800px;
    margin-left: 40px;
    margin-right: 40px
}
input{
    margin : 5%;
    height: 4vh;
    font-size: 21pt
}
img {
  object-fit: contain;
  height: 350px;
  width: 580px;
}

.pic {
  width: 580px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right : 6px;
  padding-left: 6px;
  background: rgb(216, 209, 209);
  margin: 28px 20px 20px 20px;
}
</style>