<template>
  <div class="container-fluid add-form-inti" >
      <form enctype="multipart/form-data" class="form-question" @submit.prevent="addToDB" >
         <input type="text" v-model="title" placeholder="Add Your Title Here" class="add-title" /> 
        <!-- <textarea class="textz mt-3" placeholder="  Add Your Question Here !!" v-model="content"></textarea> -->
        <div class="mt-4">
          <wysiwyg v-model="content"/>
        </div>
        <div class="hastag-list d-flex flex-row mt-3"  v-if="hastagList.length > 0">
          <div v-for="(tag , index) in hastagList" :key="index" class="row ml-4" style="background-color : whitesmoke;">
            <button class="buttonX" @click="deleteTag(index)">X</button>
            <a href="#">{{tag}}</a>
          </div>
        </div>
        <input type="text" v-model="hastag" class="add-hastag mt-3" placeholder="  add your hastag here" />
       <p style="text-align : left;" class="mt-2">*setiap memasukkan hastag baru harus klik spasi terlebih dahulu</p> 
       <input type="file" id="file" ref="myFiles" @change="previewFile">
        <input type="submit" class="buttonadd" value="Create" />
      </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "add-form",
  props : ['onPage'],
  data() {
    return {
      content: "",
      title: "",
      hastag: "",
      hastagList: [],
      image : ''
    };
  },    
    watch: {
        hastag(val) {
            if (val[val.length - 1] == " ") {
                this.hastagList.push( val);
                this.hastag = "";
            }
        }
    },
    methods : {
        deleteTag (index){
            this.hastagList.splice(index , 1)
        },
        addToDB (){
            let { title ,  content , hastagList , image } = this
            var bodyFormData = new FormData();
            bodyFormData.append('image' , image[0])
            bodyFormData.append('title' ,  title)
            bodyFormData.append('content' ,  content)
            bodyFormData.append('tagList' ,  hastagList)
            axios({
                method : 'POST',
                url : 'http://localhost:3000/article',
                data : bodyFormData,
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(({data})=>{
              this.$swal('Sukses Create !!','Click Me','success');
              this.$emit('new' , data)
            })
            .catch(err=>{
              this.$swal(err.response.data.message ,'Click Me','error');
            })
        },
        previewFile(){
            this.image = this.$refs.myFiles.files
        }
    }
};
</script>

<style>
.title-ll {
    margin: 0;
    padding: 0;
    text-align: left;
}
.title-ll p {
    font-size: 20px;

}
.add-form-inti {
  margin-top: 30px;
  margin-bottom: 10px;
  width: 70%;
  height: 600px;
}
.title-atas {
  font-size: 23px;
}


.title-bawah {
  font-size: 19px;
}
.form-question {
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.textz {
  width: 100%;
  height: 100px;
  margin: 0;
  padding: 0;
}

.text-down {
  background-color: #d4d4d4;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 229px;
}

.add-hastag {
  background-color: #d4d4d4;
  border : none;
  width: 100%;
  height: 30px;
}

.hastag-list {
  width: 100%;
  height: 20px;
}

.buttonX {
    background-color : whitesmoke; width : 20px; height : 24px; padding : 0; margin : 0; color : black;
}

.add-title {
    height: 30px;
    color: black;
    background-color: #d4d4d4;
    border: none;
}

::placeholder {
  color: black;
}

.buttonadd {
    margin-top: 20px;
    width:  100px;
    background-color: black;
    color: pink;
    border: none;
}
</style>