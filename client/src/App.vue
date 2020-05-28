<template>
    <div id="main">
        <Auth  v-if="!auth.isLogin"
               @auth="auth = $event"
        ></Auth>
        <Dashboard v-if="auth.isLogin" @signout="signOut"></Dashboard>
    </div>
</template>

<script>
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import axios from '../src/api/server';

const token = localStorage.getItem('token');

export default {
    data() {
        return {
            message: 'Helloow!!',
            auth: {
                isLogin: false,
                name: ''
            },
            page: 'dashboard'
        };
    },
    components: { 
        Auth, Dashboard 
    },
    methods: {
        checkLogin() {
            if (token) {
                axios({
                    url: '/users',
                    method: 'GET',
                    headers: {
                        token
                    }
                }).then(({ data }) => {
                    this.auth.name = data.name;
                    this.auth.isLogin = true;
                }).catch(err => {
                     if(err.response) {
                        console.log(err.response.data);
                        this.$toasted.show(err);
                    } else {
                        console.log(err.message);
                        this.$toasted.show(err.message);
                    }
                })
            } else {
                this.auth.isLogin = false;
            }
        }, 

        signOut() {
            console.log('signout diklik')
            localStorage.removeItem('token');
            this.auth.isLogin = false,
            this.auth.name = ''
        }
    },
    mounted() {
        this.checkLogin();
    }
};
</script>

<style>
   
</style>