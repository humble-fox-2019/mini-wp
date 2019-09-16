<template>
   <div class="login-form shadow" v-if="onPage == 'login'" >
       <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
        <p class="titlelogin55">Login To Your Account</p>
        <form @submit.prevent="Login" >
            <input type="text" placeholder="email" class="input-login" v-model="email">
            <input type="text" placeholder="password" class="input-login" v-model="password">
            <input type="submit" class="submit-button-login" value="SIGN IN">
        </form>
    </div>
</template>

<script>
import GoogleSignInButton from 'vue-google-signin-button-directive'
import axios from 'axios'
export default {
    props : ['onPage'],
    directives: {
        GoogleSignInButton
    },
    data () {
        return {
            clientId: '255957545157-h8t985f4eovr4l7rftbppvoul5s7rnnt.apps.googleusercontent.com',
            email : 'luffy@mail.com',
            password : '12345678'
        }
    },
    methods : {
        OnGoogleAuthSuccess (idToken) {
            axios.post('http://localhost:3000/user/google',{
                id_token : idToken
            })
            .then(({data})=>{
                console.log(data , ' berhaASILSF FEKMFEWKMFWE')
            })
            .catch(console.log)
        },
        OnGoogleAuthFail (error) {
            console.log(error)
        },
        Login (){
            let { email , password } = this
            axios.post('http://localhost:3000/user/login',{
                email  , password
            })
            .then(({data})=>{
                localStorage.setItem('token' ,  data.token)
                this.$emit('login' ,  data)
            })
            .catch(console.log)
        }
    },
    watch : {
        storage (){
            if(this.storage){
                this.onPage = 'home'
            }else {
                this.onPage = 'login'
            }
        }
    },
}
</script>

<style>
.google-signin-button {
  color: black;
  background-color: whitesmoke;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  margin-top: 19px;
  margin-left: 150px;
}




.item-login p {
    font-size: 17px;
    text-align: left;
    padding-left: 90px;
}
.login-form {
    margin: 0 auto;
    background-color: #262836;
    height: 500px;
    width: 520px;
    margin-top: 70px;
    border: 1px solid;
    border-color: whitesmoke;
    margin-bottom: 40px;
    border-radius: 0.4rem;
}

.titlelogin55 {
    /* margin : 0 auto; */
    text-align: center;
    color: #807D76;
    font-size: 27px;
    font-family: helvetica neue, Arial, sans-serif;
    padding-top: 30px;
    margin-top: 7px;
}

.login-form form {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
}

.input-login {
    margin : 0 auto;
    text-align: center;
    width: 70%;
    height: 50px;
    border-radius: 2.0rem;
    background-color: #33354A;
    border: 1px solid #ccc!important;
    border-color: #807D76;
    margin-bottom: 18px;
}

.submit-button-login {
    margin : 0 auto;
    text-align: center;
    margin-top: 30px;
    width: 50%;
    height: 50px;
    border-radius: 2.0rem;
    background-color: #33354A;
    border: 2px solid;
    border-color: #90485E;
}
</style>