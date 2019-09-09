<template>
  <div id="app">
    <transition name="slide">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Manjari&display=swap');

$black: rgb(49, 49, 49);
$white: #ffffff;
$milk: #f5f5f5;
$primary-color: #3bc05d;
*{
  font-family: 'Manjari', sans-serif;
  margin: 0;
  padding: 0;
}
body{
  color: $black;
}
button{
  border: none;
  cursor: pointer;
}
#app{
  position: relative;
  background-color: red;
}
.wrapper{
  position: absolute;
  width: 100%;
  overflow: hidden;
}
.header{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px;

  .logo img{
    width: 100px;
  }
}
.signup{
  display: flex;
  height: 100vh;
  .left{
    background-color: $primary-color;
    flex-basis: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    text-align: center;
    h1{
      color: $white;
      font-size: 32pt;
    }
    p{
      color: $white;
      margin: 20px 0;
    }
    a{
      display: inline-block;
      text-decoration: none;
      color: $white;
      border-radius: 50px;
      border: 2px solid $white;
      padding: 15px 40px;
    }
  }
  .right{
    flex-grow: 1;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    .form{
      min-width: 400px;
      text-align: center;
      padding: 10px;

      h1{
        font-size: 32pt;
        color: $primary-color;
        margin-bottom: 20px;
      }
      .another-login{
        margin-bottom: 20px;
      }
      p{
        margin-bottom: 20px;
      }
    }

    .input-submit button{
      border-radius: 50px;
      padding: 15px 40px;
      background-color: $primary-color;
      color: $white;
    }
  }
}
.signin{
  display: flex;
  height: 100vh;
  .left{
    background-color: $primary-color;
    flex-basis: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    text-align: center;
    h1{
      color: $white;
      font-size: 32pt;
    }
    p{
      color: $white;
      margin: 20px 0;
    }
    a{
      display: inline-block;
      text-decoration: none;
      color: $white;
      border-radius: 50px;
      border: 2px solid $white;
      padding: 15px 40px;
    }
  }
  .right{
    flex-grow: 1;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    .form{
      min-width: 400px;
      text-align: center;
      padding: 10px;

      h1{
        font-size: 32pt;
        color: $primary-color;
        margin-bottom: 20px;
      }
      .another-login{
        margin-bottom: 20px;
      }
      p{
        margin-bottom: 20px;
      }
    }

    .input-submit button{
      border-radius: 50px;
      padding: 15px 40px;
      background-color: $primary-color;
      color: $white;
    }
  }
}
.another-login button{
  border: none;
  background-color: transparent;
  border: 1px solid $black;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  color: $black;
  font-size: 10pt;

  &:not(:last-child){
    margin-right: 10px;
  }
}
.another-login i{
  line-height: 1em;
}
.input-group{
  margin-bottom: 20px;
  width: 100%;
  position: relative;

  label{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
  }
  input{
    width: 100%;
    padding: 20px 20px 20px 40px;
    box-sizing: border-box;
    border-radius: 5px;
    border: none;
    background-color: $milk;

    &:focus{
      outline-color: $primary-color;
    }
  }
}
.slide-enter-active{
  animation: fadeInLeft .5s;
}
.slide-leave-active{
  animation: fadeInLeft .2s reverse;
}
</style>
