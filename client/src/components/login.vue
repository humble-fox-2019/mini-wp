<template>
    <div class="h-screen flex flex-col items-center justify-center">
        <div v-if="alert.status === 'error'">
            <div class="absolute mt-16 mr-6 top-0 right-0 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <strong class="font-bold">Holy smokes!</strong>
                <div v-for="(msg, index) in alert.msgs" :key="index">
                    <span class="block sm:inline">{{ msg }}</span>
                </div>
            </div>
        </div>
        <div v-if="alert.status === 'success'">
            <div class="absolute mt-16 mr-6 top-0 right-0 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <strong class="font-bold">Great!</strong>
                <div v-for="(msg, index) in alert.msgs" :key="index">
                    <span class="block sm:inline">{{ msg }}</span>
                </div>
            </div>
        </div>
        <div v-if="alert.status === 'bye'">
            <div class="absolute mt-16 mr-6 top-0 right-0 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <strong class="font-bold">Bye. . .</strong>
            </div>
        </div>
        <pulseloader v-if="loading === true"></pulseloader>
        <form v-else-if="loading === false" class="bg-white shadow-md rounded px-12 pt-6 pb-8 mb-4 flex items-center flex-col">
            <div class="mb-4">
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    type="text" 
                    placeholder="email"
                    v-model="user.email">
            </div>
            <div class="mb-6">
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                    type="password" 
                    placeholder="password"
                    v-model="user.password">
            </div>
            <div class="flex items-center justify-between">
                <button
                    @click.prevent="login"
                    class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button">
                    Login
                </button>
            </div>
            <br>
            <p class="text-gray-500">
                don't have an account?
                <a @click.prevent="toRegisterPage" href="#" class="font-extrabold text-gray-700">register</a>
                here
            </p>
            <br>
            <div>
                <div class="g-signin2" data-onsuccess="onSignIn"></div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import pulseloader from './pulseloader'

export default {
    components: {
        pulseloader
    },
    props: ['alert'],
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            server: 'https://34.87.72.235',
            loading: false,
        }
    },
    methods: {
        toRegisterPage() {
            this.$emit('toRegisterPage')
        },
        login() {
            this.alert.status = ''
            this.loading = true

            axios({
                method: `post`,
                url: `${this.server}/users/login`,
                data: this.user
            })
                .then(({ data }) => {
                    this.loading = false
                    console.log(data)
                    localStorage.setItem('token', data.token)
                    this.$emit('login', this.user)
                })
                .catch(err => {
                    console.log(err.response.data.message)

                    this.loading = false
                    this.alert.status = 'error'

                    let message = err.response.data.message
                    this.alert.msgs = [message]
                })
        }
    }
}
</script>

<style>

</style>