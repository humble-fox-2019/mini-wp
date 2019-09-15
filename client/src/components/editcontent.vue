<template>
    <div>
        <div id="createPost">
             <form action enctype="multipart/form-data">
                <input type="text" id="postTitleInput" v-model="title" placeholder="Your title here">
                <div id=tagcontainer>
                    <vue-tags-input id="insidetag" v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags" />
                </div>
                <div class="filess">
                    <input type="file" ref="file" v-on:change="handlefileupload($event)" id="imagepost"/>
                </div>
                <wysiwyg v-model="content"></wysiwyg>
                <button class="button" @click.prevent="editArticle" id="savePost"><i class="fa fa-send"></i> Submit</button>
            </form>
        </div>
          <!-- <div class="col-12" style="height: 75vh; margin-top:20px;">
    <div class="row">
      <b-form-input class="col-12" type="text" id="title" placeholder="Title" v-model="title"></b-form-input>
      <b-form-file
        ref="inputFile"
        :state="Boolean(file)"
        placeholder="Choose an image or drop it here..."
        v-on:change="onFileChange"
      ></b-form-file>
      <wysiwyg v-model="text" />
    </div>
    <div class="row">
      <b-button variant="primary" href="#" @click.prevent="create">Submit</b-button>
      <b-button variant="warning" href="#" @click.prevent="clear">clear</b-button>
    </div>
  </div> -->
    </div>
</template>

<script>
// import wysiwyg from ""
import VueTagsInput from "@johmun/vue-tags-input";
// let baseurl = "http://localhost:3000"
let baseurl = "http://34.87.55.207"
export default {
    props: {
        editarticle: Object
    },
    components:{
        VueTagsInput
    },
    data(){
        return{
            title:"",
            content:"",
            image:"",
            tag: "",
            tags: []
        }
    },
    methods:{
        test(){
            this.$emit("aa")
        },
        handlefileupload() {
            let file = event.target.files || event.dataTransfer.files;
            this.image = file[0];
        },
       editArticle(){
           //this.$emit("aa")
           console.log("masuk ke editarticle")
           let id = this.editarticle._id
                let taggs = []
                    for(let i = 0; i < this.tags.length;i++){
                        taggs.push(this.tags[i].text)
                    }
                    console.log(taggs)
                    console.log(this.image)
                    let formData = new FormData();
                    formData.set("featured_image", this.image);
                    formData.set("title", this.title);
                    formData.set("content", this.content);
                    formData.set("tagku", taggs);
                    console.log("><<<<<<<<<<<<")
                    console.log(formData)
                    Swal.showLoading()
                axios({
                    method:"PATCH",
                    url:`${baseurl}/miniWp/${id}`,
                    headers:{
                        token: localStorage.getItem('token')
                    },
                    data:formData
                }).then((response)=>{
                    console.log("<<<<<<<<<<<====")
                    console.log(response.data)
                    Swal.close()
                    this.title = ""
                    this.content = ""      
                    this.tags = []  
                    this.image = ""
                    this.$emit("successEdit")
                    Swal.fire("Good job, Success Edit Article")
                    })
                    .catch(error => {
                        let message = error.response.data && error.response.data.message || 'Failed to Create'
                        Swal.fire("Error!",message, "error");
                    });
            },
    }, 
    created(){
        console.log("masuk ke form edit")
        this.title = this.editarticle.title
        this.content = this.editarticle.content
        this.image = this.editarticle.featured_image
        let myTag = []
        for(let i=0; i < this.editarticle.articletags.length; i++){
            let tag = this.editarticle.articletags[i]
            let updateTag = {}
            updateTag.text = tag
            myTag.push(updateTag)
        }
        console.log(myTag)
        this.tags = myTag
    }
}
</script>

<style scoped>
#tagcontainer {
    margin-left: 300px;
    width: 900px;
}
#insidetag {
    max-width: 780px;
    width: 780px;
}
#imagepost {
    margin-left: 300px
}
#test{
    margin-left: 300px
}
</style>