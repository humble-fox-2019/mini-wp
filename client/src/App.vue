<template>
  <div id="app">
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    let token = localStorage.getItem('token')
    if(token) {
      this.$router.push('/dashboard')
    }
  }
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Manjari&display=swap');

$black: rgb(49, 49, 49);
$white: #ffffff;
$milk: #f5f5f5;
$primary-color: #3bc05d;
$primary-hover: #67e286;
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
a{
  text-decoration: none;
}
.wrapper{

  width: 100%;
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
      &:focus{
        outline: none;
      }
      &:disabled{
        opacity: .6;
        cursor: unset;
      }
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
      &:focus{
        outline-color: $primary-color;
      }
    }
  }
}
#google-signin-btn-0{
  display: inline-block !important;
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
.dashboard{
  background-color: $primary-color;
  display: flex;
  padding: 10px 0 10px 10px;
  min-height: 100vh;

  .side-bar{
    flex-basis: 200px;
    flex-grow: 1;
    padding: 20px;

    .logo{
      margin-bottom: 40px;
    }
    .logo img{
      width: 100px;
    }
    .menu{
      margin: 20px 0;
      border-bottom: 1px solid $primary-hover;
      padding-bottom: 20px;
      h2{
        font-size: 12pt;
        color: $primary-hover;
        margin-bottom: 20px;
      }
      a{
        display: flex;
        flex-direction: column;
        padding: 10px 20px;
        border-radius: 5px;
        color: $black;
      }
      a:not(:last-child){
        margin-bottom: 20px;
      }
      .router-link-exact-active{
        background-color: $primary-hover;
      }
    }
  }
  .content{
    flex-grow: 4;
    flex-basis: 1000px;
    padding: 40px 20px;
    background-color: $white;
    border-radius: 30px 0 0 30px;
    overflow: hidden;

    .content-header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
      padding-bottom: 40px;
      border-bottom: 1px solid #cfcfcf;

      h2{
        font-size: 10pt;
        color: $primary-color;
      }

      .search-box{
        width: 400px;
        position: relative;

        label{
          position: absolute;
          top: 50%;
          right: 20px;
          transform: translateY(-50%);
          color: #b4b4b4;
        }
        input{
          width: 100%;
          box-sizing: border-box;
          padding: 15px 20px;
          border: none;
          background-color: $milk;
          border-radius: 5px;

          &:focus{
            outline: none;
          }
        }
      }
    }
    .content-body{
      display: flex;
      flex-direction: column;

      .article{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: $white;
        padding: 10px;
        a{
          display: flex;
          align-items: center;
          flex-grow: 1;
          color: $black;
          margin-right: 50px;

          .article-image{
            flex-basis: 150px;
            height: 90px;
            overflow: hidden;
            position: relative;
            background-color: rgb(233, 233, 233);
            background-image: url('assets/book.jpg');
            background-size: cover;
            background-position: center;
            border-radius: 15px;
          }

          .article-text{
            flex-grow: 1;
            flex-basis: 300px;
            padding: 10px 10px 10px 20px;

            h1{
              font-size: 16pt;
              margin-bottom: 10px;
            }
          }
        }
        .article-action{
          display: flex;

          span i{
            padding: 10px;
            color: #949494;
            cursor: pointer;

            &:hover{
              color: #b4b4b4;
            }
          }

          span:not(:last-child){
            margin-right: 10px;
          }
        }
      }
      .article:not(:last-child){
        margin-bottom: 20px;
      }
      .article:hover{
        box-shadow: 0 5px 20px rgba(0,0,0,.05);
      }
    }
  }
}
.add-article{
  display: flex;
  flex-direction: column;
  .add-article-header {
    border-bottom: 1px solid #f5f5f5;
    padding-bottom: 10px;
    margin-bottom: 30px;
    h1{
      font-size: 14pt;
      color: $primary-color;
    }
  }
  .add-article-title{
    margin-bottom: 30px;
    input{
      border: none;
      border-bottom: 1px solid #d4d4d4;
      width: 100%;
      font-size: 28pt;

      &::placeholder{
        color: #d4d4d4;
      }
      &:focus{
        outline: none;
      }
    }
  }
}
.error{
  text-align: left;
  ul{
    list-style: none;
    li{
      color: red;
    }
  }
}
.input-picture{
  width: 200px;
  height: 100px;
  background-color: $milk;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 30px;
  position: relative;

  .text{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 100%;

    span{
      font-size: 12pt;
      font-weight: bold;
      display: block;
      color: #acacac;
    }
    i{
      font-size: 16pt;
      display: block;
      color: #acacac;
    }
  }
  .preview-picture{
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }
}
.input-picture input{
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  opacity: 0;
  cursor: pointer;
}
button.button-post{
  align-self: flex-end;
  padding: 15px 30px;
  background-color: $primary-color;
  color: $white;
  border-radius: 5px;
  margin: 30px 0;
}
button.button-post:hover{
  background-color: $primary-hover;
}
.slide-enter-active{
  animation: fadeIn .5s;
}
.slide-leave-active{
  animation: fadeIn .05s reverse;
}
.fade-enter-active{
  animation: fadeInLeft .5s;
}
.fade-leave-active{
  animation: fadeInRight .01s reverse;
}
.shake-enter-active{
  animation: shake .5s;
}
.shake-leave-active{
  animation: fadeOut .2s;
}
</style>
