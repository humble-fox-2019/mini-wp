<template>
   <div>
    <div class="login-form shadow" v-if="onPage == 'login' && onPageHere == 'login' " >
       <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
        <p class="titlelogin55">Login To Your Account</p>
        <form @submit.prevent="Login" >
            <input type="text" placeholder="email" class="input-login" v-model="email">
            <input type="password" placeholder="password" class="input-login" v-model="password">
            <input type="submit" class="submit-button-login" value="SIGN IN">
        </form>
        <div class="mt-4" style="margin-left : 200px;">
            <a href="#" @click="GantiPageDisini('register')" >
                Register Here
            </a>
        </div>
    </div>    
        <div class="login-form shadow" v-if="onPage == 'login' && onPageHere == 'register' " >
        <p class="titlelogin55">Register</p>
        <form @submit.prevent="Register" >
            <input type="text" placeholder="username" class="input-login" v-model="username">
            <input type="text" placeholder="email" class="input-login" v-model="email">
            <input type="password" placeholder="password" class="input-login" v-model="password">
            <input type="submit" class="submit-button-login" value="SIGN IN">
        </form>
        <div class="mt-4" style="margin-left : 200px;">
            <a href="#" @click="GantiPageDisini('login')">
                Login Here
            </a>
        </div>
    </div>    
   </div> 
   
</template>

<script>
import GoogleSignInButton from 'vue-google-signin-button-directive';
import axios from 'axios'
export default {
    props : ['onPage'],
    directives: {
        GoogleSignInButton
    },
    data () {
        return {
            clientId: '183650412538-0fqi2t6c59ep63mobn8ro5t35319smku.apps.googleusercontent.com',
            email : '',
            password : '',
            onPageHere : 'login',
            username : ''
        }
    },
    methods : {
        OnGoogleAuthSuccess (idToken) {
            axios.post('http://34.87.89.246/user/google',{
                id_token : idToken
            })
            .then(({data})=>{
                localStorage.setItem('idUser' ,  data.user._id)
                localStorage.setItem('token' ,  data.token)
                this.$emit('login' ,  data)
                console.log(data , ' berhaASILSF FEKMFEWKMFWE')
            })
            .catch(console.log)
        },
        GantiPageDisini (page){
            this.onPageHere = page
        },
        OnGoogleAuthFail (error) {
            console.log(error)
        },
        Login (){
            let { email , password } = this
            axios.post('http://34.87.89.246/user/login',{
                email  , password
            })
            .then(({data})=>{
                localStorage.setItem('token' ,  data.token)
                localStorage.setItem('idUser' ,  data.user._id)
                this.$emit('login' ,  data)
            })
            .catch(err=>{
                this.$swal(err.response.data.message ,'Click Me','error');
                this.password = ''
                this.email = ''
            })
        },
        Register (){
            let { email , password , username } = this
            axios.post('http://34.87.89.246/user/register',{
                email , password , username
            })
            .then(({data})=>{
                localStorage.setItem('token' ,  data.token)
                localStorage.setItem('idUser' ,  data.user._id)
                this.$emit('login' ,  data)
            })
            .catch(err=>{
                this.$swal(err.response.data.message ,'Click Me','error');
                this.username = ''
                this.password = ''
                this.email = ''
            })
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
  background-color: #D95350;
  color: #FFFFFF;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  margin-top: 19px;
  margin-left: 150px;
  font-weight: 200px;
}




.item-login p {
    font-size: 17px;
    text-align: left;
    padding-left: 90px;
}
.login-form {
    margin: 0 auto;
    background-color: whitesmoke;
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
    background-color: #FFFFFF;
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
    background-color: #D95350;
    border: 2px solid;
    border-color: #90485E;
}
</style>