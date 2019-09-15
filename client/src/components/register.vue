<template>
    <div class="h-screen flex items-center justify-center">
        <div v-if="alert.status">
            <div class="absolute mt-16 mr-6 top-0 right-0 bg-gray-800 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <strong v-if="alert.status === 'error'" class="font-bold">Holy smokes!</strong>
                <div v-for="(msg, index) in alert.msgs" :key="index">
                    <span class="block sm:inline">{{ msg }}</span>
                </div>
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
import pulseloader from './pulseloader'

export default {
    components: {
        pulseloader
    },
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            server: 'http://34.87.72.235',
            loading: false,
            alert: {
                status: '',
                msgs: []
            }
        }
    },
    methods: {
        toLoginPage() {
            this.$emit('toLoginPage', this.alert)
        },
        register() {
            this.loading = true

            axios({
                method: `post`,
                url: `${this.server}/users/register`,
                data: this.user
            })
                .then(({ data }) => {
                    console.log(data)

                    this.loading = false
                    this.alert.status = 'success'
                    this.alert.msgs = [`${data.email} registration success`]
                    this.toLoginPage()
                })
                .catch(err => {
                    console.log(err.response.data.message)

                    this.loading = false
                    this.alert.status = 'error'

                    let message = err.response.data.message
                    let errs = message.substr(message.indexOf(':') + 2).split(',')
                    let msgs = []
                    errs.forEach(err => {
                        msgs.push(err.substr(err.indexOf(':') + 2))
                    })
                    this.alert.msgs = msgs
                })
        }
    }
}
</script>

<style>

</style>