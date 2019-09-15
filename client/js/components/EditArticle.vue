<template>
  <div>
      <div class="main-container" id="editArticle">
          <h3 class="m-3 article-header" style="text-align: center;">Edit Article</h3>
          <div class="shadow newArticle">
              <form>
                    <div class="form-group">
                        <label><i class="fas fa-pencil-alt"></i> Title</label>
                        <input type="text" class="form-control" placeholder="Some Title Here..." v-model="title">
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-tags"></i> Tags</label>
                        <div>
                            <vue-tags-input
                            v-model="tag"
                            :tags="tags"
                            @tags-changed="newTags => tags = newTags"
                            />
                        </div>
                        <!-- <input type="text" class="form-control" placeholder="Tags" v-model="tag"> -->
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-bookmark"></i> Content</label>
                        <!-- <textarea class="form-control" rows="13" placeholder="Remember write something nice..." v-model="content"></textarea> -->
                        <!-- <wysiwyg v-model="editContent"></wysiwyg> -->
                        <wysiwyg v-model="content" id="editor"></wysiwyg>

                    </div>
                    <div class="form-group">
                        <div>
                            <img :src="image" alt="image" width="80px">
                        </div>
                        <label><i class="far fa-images"></i> Image</label>
                        <div class="file-inputs">
                            <input type="file" v-on:change="handlefileupload($event)" lang="es" required/>
                        </div>
                    </div>
                    <div class="wrap" style="text-align: center"> 
                        <a href="#" class="button2" style="background-color:darkslateblue; color:white" @click.prevent="editArticle()">Edit Article</a>
                    </div>
                </form>
            </div>
        </div>
        <!-- End Of Edit Article -->
  </div>
</template>

<script>
import server from '../api/helper';
import VueTagsInput from '@johmun/vue-tags-input';

const { serverURL , axios , Swal } = server;
export default {
    data :function () {
        return {
            title : "",
            tag: '',
            tags: [],
            image : "https://i.pinimg.com/originals/15/51/69/1551696c66b26f200c3ba94641316780.jpg",
            content : ""
        }
    },
    props : ['articleData'],
    methods:{
        handlefileupload(event) {
            let file = event.target.files || event.dataTransfer.files;
            this.file = file[0];
            // console.log(this.file)
        },
        editArticle( ) {
            if ( !this.title || !this.content  ) {
                this.$buefy.toast.open({
                    duration: 5000,
                    message: `Title and Content can't be empty!`,
                    type: 'is-danger'
                })  
                return;
            }
            if ( !this.file ) {
                this.$buefy.toast.open({
                    duration: 5000,
                    message: `Please update the photo! and must not be emtpy`,
                    type: 'is-danger'
                })    
                return;  
            } 

            Swal.showLoading();
            const token = localStorage.getItem("token");
            let formData = new FormData();
            this.tags.forEach( el => {
                formData.append('tags' , el.text )
            })
            
            formData.set("file", this.file);
            formData.set("title", this.title);
            formData.set("content", this.content);
            // console.log( formData )
            axios({
                method: "PUT",
                url : `${serverURL}/articles/${this.articleData._id}`,
                data: formData,
                headers : {
                    token
                }
            })
            .then( response => {
                Swal.close();
                // console.log( "updated" )
                 this.$buefy.toast.open({
                    message: 'Update Article Success!',
                    type: 'is-success'
                })
                // console.log( response.data )
                this.$emit('changeMainPage')
            })
            .catch( err => {
                Swal.close()
                // console.log( "EDIT ARTTICLE EROR");
                // console.log( err.response )
                this.$buefy.toast.open({
                    duration: 5000,
                    message: err.response.data.message,
                    type: 'is-danger'
                })  
            })
        }
    },
    components : {
        VueTagsInput
    },
    created : function () {
        this.title = this.articleData.title;
        
        this.articleData.tags.forEach( ( tag, index ) => {
            this.tags.push({ text: tag });
        })
        if ( this.articleData.image ) 
            this.image = this.articleData.image
        
        this.content = this.articleData.content
    }
}
</script>

<style>

</style>