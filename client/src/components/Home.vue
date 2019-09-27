<template>
    <div class="background-curve">
      <img src="/assets/image/undraw1.svg" alt  class="undraw"/>
      <img src="/assets/image/curve.png" alt class="curve"/>
      <div class="aboutus">
        <h1>Erste Press</h1>
        <p>You can write and save your personal article here.<br>
        You can insert image on your article too.. <br> 
        By using Erste Press as your personal article,<br>
        You already rescuing earth from global warming.</p>
        <p>
          "Use paperless so our tree don't became rare"
        </p>
        <h4>- Ayu Sudi Dwijayanti</h4>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
img.undraw{
  align-self: flex-start;
  margin-top: 5%;
  margin-left: 5%;
  position: absolute;
  height: 70vh;
}
img.curve{
  width: 90vw;
  height: 80vh;
}

.aboutus{
  margin: 10%;
  left: 50%; 
  position: absolute;
  align-self: flex-start;
  animation: reveal 2s forwards;
}

h1{
  color: rgb(233, 199, 88);
  text-shadow: 4px 4px #221616;
  font-family: 'Patua One', cursive;
  font-size: 60px;
}

p{
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
}

h4{
  font-family: 'Libre Baskerville', serif;
  font-weight: bolder;
  font-size: 18px;
}

@keyframes reveal {
  from {
    clip-path: inset(0 0 0 100%);
    }
  to {
    clip-path: inset(0 0 0 0);
  }
}

.background-curve{
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: calc(100vh - 8vh);
  width: 100vw;
  background: rgb(174, 210, 219);
}
</style>