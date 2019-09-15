<template>
    <div class="h-screen flex items-center justify-center">
        <form class="bg-white shadow-md rounded px-12 pt-6 pb-8 mb-4 flex items-center flex-col">
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
                    @click.prevent="register"
                    class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button">
                    Register
                </button>
            </div>
            <br>
            <p class="text-gray-500">
                already have an account?
                <a @click.prevent="toLoginPage" href="#" class="font-extrabold text-gray-700">login</a>
                here
            </p>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            server: 'http://34.87.72.235'
        }
    },
    methods: {
        toLoginPage() {
            this.$emit('toLoginPage')
        },
        register() {
            axios({
                method: `post`,
                url: `${this.server}/users/register`,
                data: this.user
            })
                .then(({ data }) => {
                    console.log(data)
                    this.toLoginPage()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>

<style>

</style>