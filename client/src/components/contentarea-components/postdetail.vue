<template>
    <div class="container p-20" id="editPost">
        <div v-if="alert.status === 'error'">
            <div class="absolute mt-16 mr-6 top-0 right-0 bg-gray-800 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <strong class="font-bold">Holy smokes!</strong>
                <div v-for="(msg, index) in alert.msgs" :key="index">
                    <span class="block sm:inline">{{ msg }}</span>
                </div>
            </div>
        </div>
        <pulseloader v-if="loading === true" class="flex justify-center"></pulseloader>
        <div v-else-if="loading === false">
            <input
                type="text"
                class="text-3xl mb-3 bg-transparent focus:outline-none"
                placeholder="Yout title here"
                v-model="selectedArticle.title">
            <wysiwyg v-model="selectedArticle.content"></wysiwyg>
            <div class="flex">
                <button 
                    @click.prevent="save" 
                    class="mt-3 bg-white hover:bg-gray-100 py-1 px-4 rounded shadow ml-auto">
                    save
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import pulseloader from '../pulseloader'

export default {
    components: {
        pulseloader
    },
    props: ['selectedArticle'],
    data() {
        return {
            server: 'http://34.87.72.235',
            token: localStorage.getItem('token'),
            loading: false,
            alert: {
                status: '',
                msgs: []
            }
        }
    },
    methods: {
        save() {
            this.loading = true

            let method, url

            if(this.selectedArticle._id) {
                method = `patch`
                url = `${this.server}/articles/${this.selectedArticle._id}`
            } else {
                method = `post`
                url = `${this.server}/articles`
            }

            axios({
                method,
                url,
                headers: {
                    token: this.token
                },
                data: this.selectedArticle
            })
                .then(({ data }) => {
                    console.log('from postdetail', data);
                    this.loading = false
                    this.alert.status = 'success'
                    this.alert.msgs = [`success added a new article`]
                    this.$emit('save', this.alert)
                })
                .catch(err => {
                    this.loading = false

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