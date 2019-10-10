<template>
    <form>
        <label>Register your email</label>
        <input type="text" v-model="user.email" placeholder="Enter email here...">
        <label>Enter password</label>
        <input type="text" v-model="user.password" placeholder="Enter password here...">
        <button type="button" @click="register">Register</button>
    </form>
</template>
<script>
import axios from 'axios'

export default {
    data : function (){
        return {
            user : {
                email : "",
                password : "",
            }
        }
    },
    methods : {
        register : function(){
            axios({
                method : 'POST',
                url : 'http://localhost:3000/user/register',
                data : {
                    email: this.user.email,
                    password: this.user.password
                }
            }).then((response)=>{
                console.log(response.data.message);
                localStorage.setItem('token',response.data.token);
                $emit('register-success')
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
}
</script>