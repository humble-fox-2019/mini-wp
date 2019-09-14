<template>
    <div>
        <h1>Sign in.</h1>
        <div id="errorPosition">
            <p v-bind:style="{visibility: errorShow}">{{error}}</p>
        </div>
        <form action="">
            <input v-on:keyup.enter="login" v-model="email" type="email" placeholder="Email">
            <input v-on:keyup.enter="login" v-model="password" type="password" placeholder="Password">
            <button v-if="loading === false" @click.prevent="login" type="submit">Sign in</button>
            <button v-else type="submit"  @click.prevent=""><i class="fas fa-spinner fa-pulse"></i></button>
        </form>
        <a href="" @click.prevent="toregister"><h4>Don't have an account?</h4></a>
        
        <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
        
    </div>
</template>

<script>
import axios from 'axios'
let baseUrl = "http://localhost:3000"
export default {
    data: function(){
        return {
            email: "",
            password: "",
            error: "",
            errorShow: "hidden",
            loading: false
        }
    },
    methods: {
        login(){
            this.loading = true
            axios({
                method: 'post',
                url: `${baseUrl}/users/loginform`,
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(response =>{
                this.resetLogin()
                localStorage.setItem('token', response.data.token)
                this.$emit('gotosecondpage')
            })
            .catch(err =>{
                if(err.response){
                    this.error = err.response.data.message
                }else if(err.request){
                    this.error = "No response from server"
                }
                this.errorShow = 'visible'
            })
            .finally(()=>{
                this.loading = false
            })
        },
        toregister(){
            this.resetLogin()
            this.$emit('toregister')
        },
        resetLogin(){
            this.email = ""
            this.password = ""
            this.error = ""
            this.errorShow = 'hidden'
            this.loading = false
        }
    }
}
</script>

<style scoped>
    h1 {
        margin-top: 0px;
        margin-bottom: 0px;
        font-family: 'Roboto', sans-serif;
    }
    #errorPosition{
        height: 8vh; 
        display:flex; 
        justify-items: start;
        align-items: flex-end;
        
    }
    form{
        display: flex;
        flex-direction: column;
    }
    p {
        font-family: 'Roboto', sans-serif;
        color: red;
        padding: 5px;
        position: relative;
        bottom: 0px;
        left: 0px;
        word-wrap:break-word;
        width: 100%;
        margin: 0px;
    }
    input, button{
        height: 5vh;
        box-sizing: border-box;
        border-radius: 20px;
        outline: none;
        border: 1px solid #cccccc;
        font-size: 1rem;
        margin-bottom: 1.5vh;
    }
    
    input { 
        padding-left: 1vw;
    }
    input:focus{
        box-shadow: 0px 0px 5px #016087;
        transition-duration: 0.5s;
        border-radius: 10px;
    }
    button {
        background: #bdc3c7;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #2c3e50, #bdc3c7);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #2c3e50, #bdc3c7); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        color: white;
        font-size: 1.3rem;
        margin-top: 3vh;
        margin-bottom: 3vh;
        height: 6vh;
    }
    button:hover {
        -webkit-box-shadow: 0px 5px 30px -10px rgba(0,0,0,0.57);
        -moz-box-shadow: 0px 5px 30px -10px rgba(0,0,0,0.57);
        transition: all 0.4s ease 0s;
    }
    .g-signin2 {
        display: flex;
        justify-content: space-evenly;
    }
    h4{
        margin: 0px;
        font-family: 'Roboto', sans-serif;
         color: black;
    }
    a{
        text-decoration: none
    }
    div{
        width: 25vw;
    }
</style>


