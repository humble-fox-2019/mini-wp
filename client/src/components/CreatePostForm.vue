<template>
    <div class="quill-container">
        <label>Article title</label><br>
            <input type="text" name="title" id="form-title" v-model="form.title"><br>
        <div id="editor">
                <p>Hi there! What's on your mind?</p>
                <p><br></p>
        </div>
        <button @click="submitData()">Create post</button>
        <button @click="$emit('hide-form')">Close</button>
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
            }
        }
    },
    methods : {
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