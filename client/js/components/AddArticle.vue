<template>
  <div>
    <!-- Add New Article -->
    <div class="main-container" id="addNewArticle">
      <h3 class="m-3 article-header" style="text-align: center;">Add New Article</h3>
      <div class="shadow newArticle">
        <form>
          <div class="form-group">
            <label>
              <i class="fas fa-pencil-alt"></i> Title
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="Some Title Here..."
              v-model="title"
            />
          </div>
          <div class="form-group">
            <label>
              <i class="fas fa-tags"></i> Tags
            </label>
            <div>
                <vue-tags-input
                  v-model="tag"
                  :tags="tags"
                  @tags-changed="newTags => tags = newTags"
                />
            </div>
            <!-- <input type="text" class="form-control" placeholder="Tags" v-model="tags" /> -->
          </div>
          <div class="form-group">
            <label>
              <i class="fas fa-bookmark"></i> Content
            </label>
            <br />
            <!-- <textarea name id cols="30" rows="10" v-model="content"></textarea> -->
            <!-- <wysiwyg v-model="content"></wysiwyg> -->
             <wysiwyg v-model="content" id="editor"></wysiwyg>
            <!-- <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor> -->
          </div>
          <div class="form-group">
            <label>
              <i class="far fa-images"></i> Image
            </label>
            <div class="file-inputs">
              <!-- <input type="file" class="form-control-file" @change="onFileChange" /> -->
              <input type="file" v-on:change="handlefileupload($event)" lang="es" required/>
            </div>
          </div>
          <div class="wrap" style="text-align: center">
            <a href="#" class="button2" style="background-color:darkslateblue; color:white" @click.prevent="addNewArticle"
            >Add Article</a>
          </div>
        </form>
      </div>
    </div>
    <!-- END OF ADD ARTICLE -->
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
import server from '../api/helper';

const { axios , serverURL , Swal } = server

export default {
  data: function() {
    return {
      title: "",
      tag: '',
      tags: [],
      content: ""
    };
  },
  methods: {
    handlefileupload(event) {
      let file = event.target.files || event.dataTransfer.files;
      this.file = file[0];
    },
    addNewArticle() {
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
                message: `Please upload the photo field!`,
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

		axios({
			method: "POST",
			url: `${serverURL}/articles`,
			data: formData,
			headers: {
				token
			}
		})
		.then( response => {
            Swal.close();
			this.title= ""
            this.tags= []
            this.tag = ''
            this.content= ""
            console.log("ADD SUCCESS")
            this.$buefy.toast.open({
                message: 'Add Article Success!',
                type: 'is-success'
            })
            this.$emit("fetchArticle");
		})
		.catch(err => {
            Swal.close();
			this.$buefy.toast.open({
                duration: 5000,
                message: err.response.data.message,
                type: 'is-danger'
            })  
		});
    }
  },
  components: {
    // wysiwyg: vueWysiwyg.default.component,
    VueTagsInput
  }
};
</script>

<style scoped>
.ti-new-tag-input ti-valid {
  border-radius: 20px;
}
.vue-tags-input {
  max-width: 100% !important;
}
.ti-new-tag-input-wrapper > input {
  border-radius: 0px !important;
}
</style>