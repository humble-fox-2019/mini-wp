<template>
  <div class="home">
    <div class="tengah">
      <h1>Welcome to iPress</h1>
      <p>by Iqbal</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  }
};
</script>

<style scoped>
.home {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 110vh;
    
}
.tengah {
    width: 500px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>