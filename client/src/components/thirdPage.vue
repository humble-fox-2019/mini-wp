<template>
    <div>
        <navbar 
        @publish="publish"
        @gotofifthpage="gotofifthpage"
        @gotofourthpage="gotofourthpage"
        @gotosecondpage="gotosecondpage" 
        :page="page" 
        @gotofirstpage="gotofirstpage"></navbar>
        <div class="editor">
            <contentwrite @updatecontent="updatecontent" :title.sync="title"></contentwrite>
        </div>
        
    </div>
</template>

<script>
let baseUrl = 'http://localhost:3000'
import axios from 'axios'
import navbar from './navbar'
import contentwrite from './contentWrite'
export default {
    props: ['page'],
    data: function(){
        return {
            title: "",
            content: ""
        }
    },
    components: {
        navbar,
        contentwrite
    },
    methods: {
        gotofourthpage(){
            this.$emit('gotofourthpage')
        },
        gotofifthpage(){
            this.$emit('gotofifthpage')
        },
        gotofirstpage(){
            this.$emit('gotofirstpage')
        },
        gotosecondpage(){
            this.$emit('gotosecondpage')
        },
        publish(publish){
            axios({
                url: `${baseUrl}/articles`,
                method: 'post',
                data: {
                    title: this.title,
                    content: this.content,
                    publish
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(response => {
               console.log(response)
            })
            .catch(err =>{
                if(err.response){
                    console.log(`${err.response.data.message}`)
                }
                else if(err.request){
                    alert("No response from server")
                }
                else {
                    console.log(err)
                }
            })
            .finally(()=>{

            })
        },
        updatecontent(value){
            this.content = value
        }
    }
}
</script>

<style scoped>
    .editor{
        margin-top: 5vh;
        width: 100%;
        display: flex;
        justify-content: center;
    }
</style>