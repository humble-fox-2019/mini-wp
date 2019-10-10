<template>
    <div>
        <ul class="nav justify-content-center">
            <li class="nav-item">
                <a class="nav-link" href="#" v-show="!isLoggedIn" @click="$emit('show-login-form')">Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" v-show="!isLoggedIn" @click="$emit('show-register-form')">Register</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" v-show="isLoggedIn" @click="removeToken(); $emit('logged-out')">Logout</a>
            </li>
            <li class="nav-item active">
                <a class="nav-link active" href="#" v-show="isLoggedIn">My Blog</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">About</a>
            </li>
        </ul>
        <div>{{isLoggedIn}}<div>
    </div>
</template>

<script>
export default {
    props : {
        isLoggedIn : Boolean,
        required : true
    },
    methods : {
        removeToken : function(){
            localStorage.removeItem('token')
        }
    }
}
</script>