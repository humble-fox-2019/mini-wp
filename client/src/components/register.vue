<template>
  <div class="card-body mx-auto mt-2" id="formRegister" style="width:30%">
      <h2 class="text-center">Register Now</h2>
      <br>
            <form v-on:submit.prevent="register">
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" class="form-control" v-model="username">
                </div>
                <div class="form-group">
                    <label for="email">E-mail:</label>
                    <input type="email" class="form-control" v-model="email">
                </div>
                <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input type="password" class="form-control" v-model="password">
                </div>
                <center><button type="submit" class="btn btn-default"  style="font-weight:bold;background-color:rgb(34, 4, 65); color : rgb(255, 255, 255);" >register</button> </center>
                <hr>
                <hr>
                <center><span>Already have an account?</span></center>
                <center><span>Login <a href="#" @click="changeToLoginForm()" >here</a> </span></center>
                <hr>     
            </form>
        </div>
</template>

<script>
import axios from "axios"
const server_url = "http://34.87.39.22"
export default {

    data (){
        return {
            username : "",
            email :"",
            password : ""
        }
    },
    methods : {
        changeToLoginForm(){
            this.$emit("fromRegisterForm", true)
        },
        register(){
            let username = this.username
            let email = this.email
            let password = this.password

            axios({
                url : `${server_url}/users/register`,
                method : 'POST',
                data : {
                    username, email, password
                } 
            })
            .then(response=>{
                Swal.fire({
                    type: 'success',
                    title: 'Register success !',
                    showConfirmButton: false,
                    timer: 1500
                })
                console.log(response)
            })
            .catch(err=>{
                let message = (err.response.data.message)
                // swal("Error!", errMessage , "error")
                Swal.fire({
                    type: 'error',
                    title: 'register failed !',
                    text : message
                })
            })
        }
    }

}
</script>

<style>

</style>
