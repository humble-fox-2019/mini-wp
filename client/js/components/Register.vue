<template>
    <div>
        <div class="formSection" id="register-page">
            <div class="infos">
                <h2 class="brand">DeepPress</h2>
                <i class="fab fa-envira icons"></i>
                <p>Let's Build some website!</p>
            </div>
            <form class="form">
                <h2 style="font-size:30px">Register</h2>
                <ul class="noBulletli">
                    <li>
                        <span class="error" v-if="usernameError">Username Min (5) character</span>
                        <input type="text" class="inputFields" id="username-register" placeholder="Username" v-model="username" />
                    </li>
                    <li>
                        <span class="error" v-if="passwordError">Password Min(5) Character</span>
                        <input type="password" class="inputFields" id="password-register" placeholder="Password" v-model="password" />
                    </li>
                    <li>
                        <span class="error" v-if="password2Error">You retype different password! Please make it same!</span>
                        <input type="password" class="inputFields" placeholder="Password" v-model="password2" />
                    </li>
                    <li>
                        <span class="error" v-if="emailError">Invalid Email Format</span>
                        <input type="email" class="inputFields" id="email-register" placeholder="Email" v-model="email" />
                    </li>
                    <li id="center-btn">
                        <button id="register-btn" @click.prevent="register">Register Now</button>
                    </li>
                </ul>
                <small>Already got an account? Login <a @click.prevent="changeCurrentPage('login')" href="#">here</a> </small>
            </form>
        </div>
    </div>
</template>

<script>
import server from "../api/helper";
const { serverURL , axios , Swal } = server
export default {
    data: function () {
        return {
            username : "",
            password : "",
            password2: "",
            email : "",

            usernameError: false,
            passwordError : false,
            password2Error: false,
            emailError : false

        }
    },
    methods: {
        register() {
            if ( this.usernameError || this.passwordError || this.password2Error || this.emailError || 
            this.username.length == 0 || this.password.length == 0 || this.password2.length == 0 || this.email.length == 0) {
                Swal.fire("Oppsss", "Please fill the form properly :)" , 'error');
            } else {
                axios({
                    method : "POST",
                    url : `${serverURL}/register`,
                    data : {
                        email : this.email,
                        password : this.password,
                        username : this.username
                    }
                })
                .then ( response => {
                    Swal.fire("Register Success", "Login to continue..." , 'success')
                    this.changeCurrentPage('login')
                })
                .catch ( err => {
                    console.log( err.response )
                    const errMsg = err.response.data.message;
                    Swal.fire("Fail to Register", errMsg , 'error');
                })
            }
        },
        changeCurrentPage( page ) {
            this.$emit('changeCurrentPage' , page)
        },
        valid( password ) {
            if ( password.length < 5) return false;
            return true
        },
        validEmail ( email ) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test( email )  
        },
    },
    watch : {
        username : function() {
            if ( !this.valid( this.username ) ) {
                this.usernameError = true
            } else {
                this.usernameError = false
            }
        },
        password : function () {
            if ( !this.valid( this.password ) ) {
                this.passwordError = true
            } else {
                this.passwordError = false
            }
        },
        password2 : function() {
            if ( !this.valid( this.password2 ) ) {
                this.password2Error = true
            } else {
                this.password2Error = false
            }
        },
        email : function() {
            if ( !this.validEmail( this.email ) ) {
                this.emailError = true
            } else {
                this.emailError = false
            }
        }
    }
}
</script>

<style>

</style>