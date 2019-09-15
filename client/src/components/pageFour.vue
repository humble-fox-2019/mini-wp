<template>
    <div>
        <navbar 
        @publish="publish"
        @gotosecondpage="gotosecondpage"
        @gotothirdpage="gotothirdpage" 
        :page="page" 
        @gotofirstpage="gotofirstpage"></navbar>
        <div class="editor">
            <div class="colum">
                <contentwrite  :title="articles.title" :content="articles.content" @updatecontent="updatecontent" @updatetitle='updatetitle'></contentwrite>
                <form v-if="articles.length === 0" action="/profile" method="post" enctype="multipart/form-data">
                        <input
                            type="file"
                            ref="image"
                            accept="image/*"
                            v-on:change="handleimage"
                            required>
                </form>
            </div>
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
            content: "",
            image:null
        }
    },
    components: {
        navbar,
        contentwrite
    },
    methods: {

        handleimage(){
            this.image = this.$refs.image.files[0]
        },        
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
            let formData = new FormData()

            formData.append('image', this.image)
            formData.append('title', this.title)
            formData.append('content', this.content)
            formData.append('publish', publish)       
            Swal.showLoading()
            if(this.articles.length !== 0){
                let url = `${baseUrl}/articles/${this.articles._id}`
                axios({
                    url,
                    method: 'patch',
                    data:{
                        title: this.title,
                        content: this.content,
                        publish,
                    },
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(response => {
                    Swal.close()
                    if(publish){
                        this.$emit('gotosecondpage')
                    }else{
                        this.$emit('gotothirdpage')
                    }
                })
                .catch(err =>{
                    if(err.response){
                        Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: `${err.response.data.message}`
                        })
                    }
                    else if(err.request){
                         Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: `No response from server`
                        })
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
                    data: formData,
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(response => {
                    Swal.close()
                    if(publish){
                        this.$emit('gotosecondpage')
                    }else{
                        this.$emit('gotothirdpage')
                    }
                })
                .catch(err =>{
                    if(err.response){
                         Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: `${err.response.data.message}`
                        })
                    }
                    else if(err.request){
                        Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: `No response from server`
                        })
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
    .colum{
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
</style>