<template>
    <div class="container p-20" id="editPost">
        <input type="text" class="text-3xl mb-3 bg-transparent focus:outline-none" id="postTitleInput" placeholder="Yout title here" v-model="selectedArticle.title">
        <wysiwyg v-model="selectedArticle.content"></wysiwyg>
        <div class="flex">
            <button @click.prevent="save" class="mt-3 bg-white hover:bg-gray-100 py-1 px-4 rounded shadow ml-auto" id="save">
                save
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: ['selectedArticle'],
    data() {
        return {
            server: 'http://34.87.72.235',
            token: localStorage.getItem('token'),
        }
    },
    methods: {
        save() {
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
                    this.$emit('save')
                })
                .catch(err => {
                    console.log(err.response.data.message)
                })
        }
    }
}
</script>

<style>

</style>