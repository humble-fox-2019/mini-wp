<template>
    <form>
        <label>Email</label>
        <input type="text" v-model="user.email" placeholder="Enter email here...">
        <label>Password</label>
        <input type="text" v-model="user.password" placeholder="Enter password here...">
        <button type="button" @click="login">Login</button>
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
        login : function (){
            axios({
                method : 'POST',
                url : 'http://localhost:3000/user/login',
                data : {
                    email : this.user.email,
                    password : this.user.password
                }
            }).then((response)=>{
                console.log('login sucess')
                localStorage.setItem('token', response.data.token)
                this.$emit('logged-in')
            }).catch((err)=>{
                console.log('login fail')
                console.log(err)
            })
        }
    }
}
</script>