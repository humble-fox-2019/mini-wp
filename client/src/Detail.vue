<template>
  <div class="container d-flex flex-row mt-5">
      <div class="detail-kiri">
          <div class="gambar-detail">
              <img :src="detailArticle.featured_image" alt="">
          </div>
            <div class="content-detail-1 d-flex flex-row mb-3">
              <button class="button-news">News</button>
              <p class="p-news">May 10, 2017</p>
            </div>
            <div class="content-detail-2">
                <p class="title-detail">{{detailArticle.title}}</p>
            </div>
            <div class="content-detail-3">
                <p>
                   {{detailArticle.content}}
                </p>
            </div>
            <div class="action-detail d-flex flex-row" v-if=" idUser == detailArticle.author" >
                <button @click="editArticle(detailArticle._id)">Edit</button>
                <button @click="deleteArticle(detailArticle._id)">Delete</button>
            </div>
      </div>
      <div class="detail-kanan">
          <div class="content-detail-4">
              <p>Tags</p>
          </div>
          <div class="list-tag-detail row ml-2">
              <a href="#" v-for="(tag , index) in detailArticle.tagList" :key="index" @click="getTag(tag.name)" >
                    {{tag.name}}
              </a>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    props : ['detailArticle'],
    data (){
        return {
            idUser : localStorage.getItem('idUser')
        }
    },
    methods : {
        getTag(tag){
            this.$emit('tags' , tag)
        },
        editArticle (id){
            this.$emit('edits' , id)
        },
        deleteArticle (id){ 
            axios({
                method : 'DELETE',
                url : `http://34.87.89.246/article/${id}`,
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                this.$emit('deletes')
            })
            .catch(console.log)
        }
    }
}
</script>

<style>
.detail-kiri {
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 900px;
}
.detail-kanan {
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 900px;
    margin-left: 13px;
}

.gambar-detail {
    width: 100%;
    margin-bottom: 20px;
}

.gambar-detail img {
    width: 100%;
}.button-news {
    background-color: #0a396d;
    border: none;
    color: #fff;
    font-family: 'Nunito Sans', sans-serif;
    height: 30px;
    width: 60px;
    margin-right: 5px;
}

.p-news {
    line-height: 25px;
    font-weight: 400;
    margin-left: 13px;
    font-size: 12px;
    font-family: 'Nunito Sans', sans-serif;
    color: #bfbfbf; 
}
.content-detail-2 {
    width: 100%;
}
.title-detail {
    margin-bottom: 10px;
    text-align: left;
    color: #001936;
    font-size: 27px;
}
.content-detail-3 p {
    font-size: 15px;
    font-family: nunito sans,sans-serif;
    color: #8b8d91;
}
.content-detail-4 p {
    color: #333;
    font-size: 20px;
    font-weight: 700;
    text-transform: uppercase;
    font-family: "Nunito Sans",sans-serif;
}
.list-tag-detail a {
    border: 1px solid #7c95b1;
    padding: 8px;
    color: #7c95b1;
    margin-right: 10px;
    margin-bottom: 10px;
}

.action-detail button {
    width: 60px;
    /* border: none; */
    margin-right: 10px;
}

</style>