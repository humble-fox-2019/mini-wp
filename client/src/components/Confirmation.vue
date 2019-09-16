<template>
  <div class="foreground">
    <div class="confirmation">
      <div class="confirmation-text">
        <p>{{ message }}</p>
      </div>
      <div class="confirmation-button">
        <span @click="$emit('confirmation', true)">Yes</span>
        <span @click="$emit('confirmation', false)">No</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['message']
}
</script>

<style scoped>

.foreground{
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,.4);
}

.confirmation{
  padding: 20px;
  background-color: #ffffff;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.confirmation-text{
  margin: 20px 0;
}
.confirmation-button{
  display: flex;
  justify-content: space-between;
}
.confirmation-button span{
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;
}
.confirmation-button span:first-child{
  background-color: rgb(214, 52, 52);
  color: #ffffff;
  flex-basis: 40%;
  flex-grow: 0;
}
.confirmation-button span:first-child:hover{
  background-color: rgb(235, 78, 78);
}
.confirmation-button span:last-child{
  flex-basis: 50%;
  flex-grow: 0;
  background-color: rgb(255, 255, 255);
  color: #59dd38;
  border: 2px solid #59dd38;
}
.confirmation-button span:last-child:hover{
  color: #7bf05e;
  border: 2px solid #7bf05e;
}
</style>