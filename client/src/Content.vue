<template>
  <div @click="getDetail(article._id)">
    <div>
        <div class="box-content" >
            <div class="image-contents22">
                <img :src="article.featured_image">
            </div>
            <div class="description-content22 pt-2 ">
                <a href="#" class="desTitle">{{article.title}}</a>
            </div>
            <div class="content-date-btn ">
                <button >News</button>
                <p>May 12, 2019</p>
            </div>
            <div class="content-description33">
                <p>
                    {{article.content.slice(0 , 20)}}....
                </p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props : ['onPage','article'],
    watch : {
        storage (){
            if(this.storage){
                this.onPage = 'home'
            }else {
                this.onPage = 'login'
            }
        }
    },
    methods : {
        getDetail (id){
            this.$emit('detail' , id)
        }
    }
}
</script>

<style>
.title-depan {
    color: #001936;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 24px;
    z-index: 1;
    font-weight: 900;
}

.row-luar {
    height: 150px;
    width: 2000px;
    margin-bottom: 20px;
}

.content-luar {
    height: 100%;
    width: 100%;
    background-color: red;
}

.box-content {
    width: 364px;
    height: 430px;
    margin-bottom: 20px;
    padding-right: 21px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
.image-contents22 {
    height: 66%;
    width: 100%;
}
.image-contents22 img{
    width: 100%;
    height: 100%;
}

.desTitle {
    font-family: 'Nunito Sans', sans-serif;
    margin-top: 100px;
    font-size: 20px;
    color: #001936;
    font-weight: 700;
}

.description-content22 {
   height: 34%;
   /* background-color: whitesmoke; */
}

.content-date-btn {
    padding-bottom: 8px;
    display: flex;
    flex-direction: row;
}

.content-date-btn button {
    background-color: #0a396d;
    border: none;
    color: #fff;
    font-family: 'Nunito Sans', sans-serif;
    height: 30px;
    width: 60px;
    margin-right: 5px;
}

.content-date-btn p {
    line-height: 25px;
    font-weight: 400;
    margin-left: 13px;
    font-size: 12px;
    font-family: 'Nunito Sans', sans-serif;
    color: #bfbfbf; 
}

.content-description33 {
    padding-bottom: 42px;
    display: flex;
    flex-direction: row;
}

.content-description33 p {
    font-size: 15px;
    font-family: 'Nunito Sans', sans-serif;
    color: #8b8d91;
    font-weight: 400;
    line-height: 25px;
    margin-bottom: 10px;    
    /* margin-top: 10px; */
}


</style>