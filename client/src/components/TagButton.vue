<template>
  <button @click.prevent="findByTag(tag)" class="btn p-1 mr-1">{{tag}}</button>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
const url = `http://35.240.137.247`;
export default {
  props: ["tag"],
  methods: {
    findByTag(tag) {
      const token = localStorage.getItem("token");
      axios({
        url: `${url}/articles/tag?key=${tag}`,
        method: "get",
        headers: {
          token
        }
      })
        .then(({ data }) => {
          console.log(data);
          this.$emit('findByTag', data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
button {
  transition: 0.5s all;
  border: 3px solid #262626;
}
button:hover {
  transition: 0.5s all;
  background-color: #262626;
  color: black !important;
}
</style>