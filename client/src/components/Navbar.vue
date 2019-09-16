<template>
    <ul class="nav justify-content-center">
        <li class="nav-item">
            <a class="nav-link" href="#" v-show="!isLoggedIn" @click="isLoggedIn = true">Login</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" v-show="!isLoggedIn" @click="isLoggedIn = true">Register</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" v-show="isLoggedIn" @click="isLoggedIn = false">Logout</a>
        </li>
        <li class="nav-item active">
            <a class="nav-link active" href="#" v-show="isLoggedIn">My Blog</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">About</a>
        </li>
    </ul>
</template>

<script>
export default {
    data : function (){
        return {
            isLoggedIn : false
        }
    }
}
</script>