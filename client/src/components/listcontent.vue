<template>
<div id="content-container-outside">
<div id=content-container>
        <div class="content">
            <div class="center">
                <div class="published-drafts">
                    <div id="container-pod">
                            <div class="btn-group">
                                    <button class="button">Published</button>
                                    <button class="button">Drafts</button>
                            </div>
                    </div>
                    <div>
                        <input type="text" id="search-article" placeholder="Search.." title="Type in a category">
                    </div>
                </div>
                <div class="list-article" v-for="(article,index) in articles" :key="index">
                    <div id="name-article">
                        <div class="photo-container">
                            <img :src="article.featured_image" alt="foto" id="photo"/>
                            <h4>{{article.title}}</h4>
                            <p v-html="String(article.content).substr(0,500)"></p>
                        </div>
                    <h5>Created by: {{article.author}}</h5>
                    <h6>{{String(new Date(article.createdAt)).substr(0,21)}}</h6>
                    <div>
                    <h6>tags:</h6>
                        <a href="#" v-for="(tag,index) in article.articletags" :key="index">
                        <vs-chip>{{tag}}</vs-chip>
                        </a>
                    </div>
                        <div class="btn-group">
                            <button class="button" @click.prevent="clickEdit(article)"><i class="fa fa-pencil"></i> Edit</button>
                            <button class="button" @click.prevent="deleteData(article._id)"><i class="fa fa-trash"></i> Trash</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>
</div>
</template>

<script>
// let baseurl = "http://localhost:3000"
let baseurl = "http://34.87.55.207"
export default {
    props : ["articles"],
    methods:{
            deleteData(id){
                console.log(id)
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then(result=>{
                    if(result.value){
                        axios({
                            method: 'DELETE',
                            url:`${baseurl}/miniWp/`+id,
                            headers:{
                                token: localStorage.getItem('token')
                            }
                        }).then((response)=>{
                    Swal.fire("Success Delete");
                    this.$emit("successDelete")
                }).catch(error => console.log(error))                       
                    } else {
                        Swal.close()
                    }
                }).catch(error=>{
                    let message =
            (error.response.data && error.response.data.message) ||
            "failed to Delete";
            Swal.fire("Error!", message, "error");
                })
            },
            clickEdit(input) {
                this.$emit("updateFile", input);
            }
    }
}
</script>

<style scoped>
#photo-container{
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
}
#photo {
    width: 300px;
    height: 200px;
    margin-left: 20px;
}
#content-container{
    overflow: scroll;
}
#content-container-outside{
    overflow: scroll;
}
</style>