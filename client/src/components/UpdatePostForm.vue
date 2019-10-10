<template>
    <div class="quill-container" v-show="showUpdateForm">
        <label>Article title</label><br>
            <input type="text" name="title" id="form-title" v-model.lazy="form.title">
        <div v-bind:id="`c${this.post._id}`">
                <p>{{form.description}}</p>
                <p><br></p>
        </div>
        <button @click="updateData">Update post</button>
        <button @click="$emit('hide-update-form')">Close</button>
    </div>
</template>
<script>
import Quill from 'quill'
import axios from 'axios'
//<button @click="getQuillContent()">Update post</button>
export default {
    
     data : function (){
        return {
            quill : "",
            form : {
                _id : "",
                title : "",
                description : "",
            }
        }
    },
    methods : {
        updateData : function(){
            console.log(this.post._id)
            console.log(this.post.title)
            console.log(this.post.description)
            axios({
                method: 'PATCH',
                url: 'http://localhost:3000/posts/' + this.post._id,
                data : {
                    title: this.form.title,
                    description: this.quill.getText()
                }
            }).then(res => {
                console.log(res)
                console.log('success')
                /* this.form.id = ''
                this.form.title = ''
                this.form.description = '' */
            }).catch((err) => {
                console.log(err);
            })
        },
        getQuillContent : function(){
            console.log(document.getElementById(`c${this.form._id}`))
            /* console.log(this.post._id)
            this.form.description = this.quill.getText()
            console.log(this.form.description)
            console.log(this.form.title);
            console.log(this.showUpdateForm); */
        }
    },
    props: {
        post: {
        type: Object,
        required: true
    }, 
        showUpdateForm : Boolean
    }
       ,
    mounted : function (){
        this.form = this.post
        let bro = `#c${this.post._id}`
        this.$nextTick(function () {
            // Code that will run only after the entire view has been rendered
            console.log(document.getElementById("c5d7e1199faf8f80e821df9de"))
            console.log(document.querySelectorAll("#c5d7e1199faf8f80e821df9de"))
            this.quill = new Quill(bro,{theme: 'snow'});
        })
    }   
}
</script>