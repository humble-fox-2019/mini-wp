<template>
    <div class="quill-container">
        <form enctype="multipart/form-data">
            <label>Article title</label><br>
            <input type="text" name="title" id="form-title" v-model="form.title"><br>
            <label>Feature image</label><br>
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
            <div id="editor">
                    <p>Hi there! What's on your mind?</p>
                    <p><br></p>
            </div>
            <button type="button" @click="submitFile">Create post</button>
            <button type="button" @click="$emit('hide-form')">Close</button>
        </form>
    </div>
</template>
<script>
import Quill from 'quill'
import axios from 'axios'

export default {
    
     data : function (){
        return {
            quill : "",
            form : {
                title : "",
                description : "",
                file : ""
            }
        }
    },
    methods : {
        handleFileUpload(){
            this.form.file = this.$refs.file.files[0];
        },
        submitFile(){
            console.log('submit')
            this.form.description = this.quill.getText()
            let formData = new FormData();
            formData.append('title', this.form.title);
            formData.append('file', this.form.file);
            formData.append('description', this.form.description);
            axios.post('http://localhost:3000/posts',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token' : localStorage.getItem('token')
                }
            }
            ).then(function(){
                console.log('SUCCESS!!');
            })
            .catch(function(){
                console.log('FAILURE!!');
            });
        },
        submitData : function(){
            this.form.description = this.quill.getText()
            console.log(this.form.description)
            console.log("wyo")
            axios({
                method: 'POST',
                url: 'http://localhost:3000/posts/',
                data : {
                    title: this.form.title,
                    description: this.form.description,
                    createdAt: new Date()
                }
            }).then(()=>{
                console.log('success')
            }).catch((err)=>{
                console.log(err)
            })
        },
        getQuillContent : function(){
            this.form.description = this.quill.getText()
            console.log(this.form.description)
            console.log(this.form.title);
        }
    },
    mounted : function (){
        this.quill = new Quill('#editor',{theme: 'snow'});
    } 
   /*  ,
        props : {
            isClicked: {
                type: Object,
                required: true
            }
        } */
    
}
</script>