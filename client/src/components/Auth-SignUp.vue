<template>
    <div class="signup-form">
        <form @submit.prevent="signup">
            <h2>Create an Account</h2>
            <p class="hint-text">Sign up with your social media account or email address</p>
            <div class="social-btn text-center">
                <div class="g-signin2" data-onsuccess="onSignIn"></div>
            </div>
            <div class="or-seperator"><b>or</b></div>
            <div class="form-group">
                <input type="text" class="form-control input-lg" name="fullname" id="fullname" placeholder="Full name" required="required" v-model="name">
            </div>
            <div class="form-group">
                <input type="email" class="form-control input-lg" name="email" id="email" placeholder="Email Address" required="required" v-model="email">
            </div>
            <div class="form-group">
                <input type="password" class="form-control input-lg" name="password" id="password" placeholder="Password" required="required" v-model="password">
            </div>
            <div class="form-group">
                <button class="btn btn-secondary btn-lg btn-block signup-btn" id="btnSignUp">Sign Up</button>
            </div>
        </form>
        <div class="text-center">Already have an account? <a id="btnLoginHere" @click="$emit('update-auth-page', 'signin')">Login here</a></div>
    </div>
</template>

<script>
import axios from '../api/server';

export default {
    data() {
        return {
            name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        signup() {
            axios({
                url: '/users/signup',
                method: 'POST',
                data: {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }
            }).then(({ data }) => {
                console.log(data);
                let auth = {
                    isLogin: true,
                    name: this.name
                };
                localStorage.setItem('token', data.token);
                this.$emit('auth', auth);
            }).catch(err => {
                if (err.response) {
                    console.log(err.response.data)
                } else {
                    console.log(err.message);
                }
            })
        }
    }
}
</script>

<style scoped>

.form-control {
    font-size: 14px;
    transition: all 0.4s;
    box-shadow: none;
}
.form-control:focus {
    border-color: #5cb85c;
}
.form-control, .btn {
    border-radius: 50px;
    outline: none !important;
}
.signup-form, .signin-form {
    width: 480px;
    margin: 50px auto;
    padding: 30px 0;
    border-radius: 5px;
    margin-bottom: 20px;
    background: #fff;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    padding: 40px;
}

.signup-form a, .signin-form a {
    color: #5cb85c;
}    
.signup-form h2, .signin-form h2 {
    text-align: center;
    font-size: 34px;
    margin: 10px 0 15px;
}
.signup-form .hint-text, .signin-form .hint-text {
    color: #999;
    text-align: center;
    margin-bottom: 20px;
}
.signup-form .form-group, .signin-form .form-group{
    margin-bottom: 20px;
}
.signup-form .btn, .signin-form .btn {        
    font-size: 18px;
    line-height: 26px;
    font-weight: bold;
    text-align: center;
    border-radius: 18px;
}


.or-seperator {
    text-align: center;
    border-top: 1px solid #e0e0e0;
}
.or-seperator b {
    padding: 0 10px;
    width: 40px;
    height: 40px;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
    background: #fff;
    display: inline-block;
    border: 1px solid #e0e0e0;
    border-radius: 50%;
    position: relative;
    top: -22px;
    z-index: 1;
}
.social-btn .btn {
    color: #fff;
    margin: 10px 0 0 15px;
    font-size: 15px;
    border-radius: 50px;
    font-weight: normal;
    border: none;
    transition: all 0.4s;
}	
.social-btn .btn:first-child {
    margin-left: 0;
}
.social-btn .btn:hover {
    opacity: 0.8;
}
.social-btn .btn-primary {
    background: #507cc0;
}
.social-btn .btn-info {
    background: #64ccf1;
}
.social-btn .btn-danger {
    background: #df4930;
}
.social-btn .btn i {
    float: left;
    margin: 3px 10px;
    font-size: 20px;
}

#btnLoginHere, #btnRegisterHere {
    color: #1fb8a3;
    cursor: pointer;
}
</style>