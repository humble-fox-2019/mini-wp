<template>
    <div>
        <navbar 
        @publish="publish"
        @gotosecondpage="gotosecondpage"
        @gotothirdpage="gotothirdpage" 
        :page="page" 
        @gotofirstpage="gotofirstpage"></navbar>
        <div class="editor">
            <contentwrite  :title="articles.title" :content="articles.content" @updatecontent="updatecontent" @updatetitle='updatetitle'></contentwrite>
        </div>
        
    </div>
</template>

<script>
let baseUrl = 'http://localhost:3000'
import axios from 'axios'
import navbar from './navbar'
import contentwrite from './contentWrite'
export default {
    props: ['page', 'articles'],
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
        gotothirdpage(){
            this.$emit('gotothirdpage')
        },
        gotofirstpage(){
            this.$emit('gotofirstpage')
        },
        gotosecondpage(){
            this.$emit('gotosecondpage')
        },
        publish(publish){
            if(this.articles.length !== 0){
                let url = `${baseUrl}/articles/${this.articles._id}`
                console.log(url)
                axios({
                    url,
                    method: 'patch',
                    data:{
                        title: this.title,
                        content: this.content,
                        publish
                    },
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(response => {
                    if(publish){
                        this.$emit('gotosecondpage')
                    }else{
                        this.$emit('gotothirdpage')
                    }
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
            }else{
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
                    if(publish){
                        this.$emit('gotosecondpage')
                    }else{
                        this.$emit('gotothirdpage')
                    }
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
            }
            
        },
        updatecontent(value){
            this.content = value
        },
        updatetitle(value){
            this.title = value
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