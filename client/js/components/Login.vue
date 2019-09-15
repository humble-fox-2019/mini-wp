<template>
    <div>
        <div class="formSection" id="signin-page">
            <div class="infos">
                <h2 class="brand">DeepPress</h2>
                <i class="fab fa-envira icons"></i>
                <p>Let's Build some website!</p>
            </div>
            <form class="form">
                <h2 style="font-size:30px">Sign In </h2>
                <ul class="noBulletli">
                    <li>
                        <span class="error" v-if="emailError">Invalid Email Format</span>
                        <input type="email" class="inputFields" id="email" placeholder="Email" v-model="email" />
                    </li>
                    <li>
                        <span class="error" v-if="passwordError">Password Min (5) character</span>
                        <input type="password" class="inputFields" id="password" placeholder="Password" v-model="password" />
                    </li>
                    <li id="center-btn">
                        <button id="signin-btn" @click.prevent="login()">Sign In</button>
                    </li>
                </ul>
                <small>Don't have account yet? Register <a @click.prevent="changeCurrentPage('register')" href="#">here</a> </small>
                <br>
                <small>Or, login with</small>
                <div style="display: flex; justify-content:center; padding-top:20px">
                    <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure">Login</GoogleLogin>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import server from "../api/helper";
const { serverURL , axios , Swal , client_id } = server

import GoogleLogin from 'vue-google-login';
export default {
    data: function () {
        return {
            email : "",
            password : "",
            emailError : false,
            passwordError: false,
            params: {
                client_id
            },
            renderParams: {
                width: 120,
                height: 40
            }
        }
    },
    methods: {
        onSuccess ( googleUser ) {
            const idToken = googleUser.Zi.id_token
            // console.log( idToken )
            axios({
                method:"POST",
                url : `${serverURL}/googleSignIn`,
                data: {
                    idToken
                }
            })
            .then( response => {
                // console.log( response.data , "GOOGLE SIGN IN MASUK")
                const { token } = response.data;
                localStorage.setItem('token' , token );
                this.changeCurrentPage('home')
            })
            .catch ( err => {
                // console.log( err.response );
                this.$buefy.toast.open({
                    duration: 5000,
                    message: `Oppss... Somthing gone wrong.. can't signin using google sign in!`,
                    type: 'is-danger'
                })  
                // console.log("GOOGLE SIGNI NERROR");
            })
        },
        onFailure ( err ) {
            // console.log( err );
            this.$buefy.toast.open({
                duration: 5000,
                message: `Oppss... Somthing gone wrong when using google sign in!`,
                type: 'is-danger'
            })  
        },
        login(){
            if ( this.emailError || this.passwordError || this.email.length == 0 || this.password.length == 0) {
                Swal.fire('Error' , "Invalid Email/Password" , 'error')
            } else {
                axios({
                    method: "POST",
                    url : `${serverURL}/login`,
                    data : {
                        email : this.email,
                        password : this.password
                    }
                })
                .then ( response => {
                    const { token } = response.data
                    localStorage.setItem('token' , token );
                    this.changeCurrentPage('home')
                })
                .catch( err => {
                    // console.log( err.response )
                    const errMsg = err.response.data.message;
                    Swal.fire("Fail to login", errMsg , 'error');
                })
            }
            
        },
        validPassword( password ) {
            if ( password.length < 5) return false;
            return true
        },
        validEmail ( email ) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test( email )  
        },
        changeCurrentPage( page ) {
            this.$emit('changeCurrentPage', page )
            
        },
        onSignIn() {
            var id_token = googleUser.getAuthResponse().id_token;
        }
    },
    watch : {
        email : function () {
            // console.log(!this.validEmail( this.email ))
            if ( !this.validEmail( this.email ) ) {
                this.emailError = true
            } else {
                this.emailError = false
            }
        },
        password : function ( val ) {
            if ( !this.validPassword( this.password ) ) {
                this.passwordError = true
            } else {
                this.passwordError = false
            }
        }
    },
    components : {
        GoogleLogin
    }
}
</script>

<style>

</style>