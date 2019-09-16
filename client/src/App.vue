<template>
  <div class="beforeSign">
    <div v-if="!login">
      <NavHome @doneSignIn="passSign" @doneSignG="passSign"></NavHome>
      <Home></Home>
    </div>
    <div v-else>
      <NavUser @signOut="falseSign" @changeToGetAll="toGetAll" @changeToWrite="toWrite"></NavUser>
      <div class="wrapper">
        <div>
          <LeftBar @changeToGetAll="toGetAll" @changeToWrite="toWrite"></LeftBar>
        </div>
        <div class="timeline">
          <GetAll v-if="page==='getall'" @changeToEdit="toEdit" @changeToRead="toRead" @getNewList="toGetAll"></GetAll>
          <Write v-else-if="page==='write'" @backToHome="toGetAll" ></Write>
          <Edit v-else-if="page==='edit'" v-bind:id="editThis" @changeToGetAll="toGetAll"></Edit>
          <Read v-else-if="page==='read'" v-bind:readOne="readOne" @changeToGetAll="toGetAll"></Read>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Home from "./components/Home.vue";
import NavHome from "./components/NavHome.vue";
import NavUser from "./components/NavUser.vue";
import LeftBar from "./components/LeftBar.vue";
import GetAll from "./components/GetAll.vue";
import Write from "./components/Write.vue";
import Edit from "./components/Edit.vue";
import Read from "./components/Read.vue";

export default {
  data() {
    return {
      login: false,
      page: false,
      editThis : "",
      readOne : ""
    };
  },
  components: {
    NavHome,
    Home,
    NavUser,
    LeftBar,
    GetAll,
    Write,
    Edit,
    Read
  },
  methods: {
    passSign() {
      this.login = true;
      this.toGetAll()
      console.log("here");
      console.log(this.login);
    },
    falseSign() {
      this.login = false;
      console.log(this.login);
    },
    toGetAll(){
      this.page = "getall"
    },
    toWrite(id){
      this.page ="write"
      this.editThis = id
    },
    toEdit(input){
      console.log(this.$emit)
      console.log('hellloo');
      console.log(input);
      this.editThis = input
      this.page = "edit"
    },
    toRead(input){
      this.readOne = input
      this.page = "read"
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.login = true;
    this.page = "getall";
  } else {
    this.login = false;
  }
  },
};
</script>

<style>

.beforeSign {
  height: 100vh;
  width: 100vw;
}
.afterSign {
  height: 100vh;
  width: 100vw;
}
.wrapper {
  min-height: 100vh;
  color: rgb(46, 29, 29);
  display: grid;
  grid-template-columns: 1.5fr 6fr;
  grid-auto-rows: minmax(50px, auto);
}
.timeline {
  background: linear-gradient(90deg, #b4d2d9, rgb(208, 223, 228));
}
</style>