<template>
  <div class="add-form" v-if="onPage != 'login'" >
    <div class="header-1">
        <div class="title-logo">
            <!-- <img src="https://storage.cloud.google.com/sultanrh32/gambar.png" alt=""> -->
        </div>
        <div class="title-logo-2" v-if="onPage != 'login' && onPage != 'addForm'">
            <img src="https://colorlib.com/newspaper-x/wp-content/uploads/sites/15/2017/05/banner.png" alt="">
        </div>
    </div>
    <div class="header-2">
        <div class="content-header2">
            <a href="#" class="item-header2" @click="pindahPage('home')">Home</a>
            <a href="" class="item-header2">News</a>
            <a href="" class="item-header2">Blog</a>
            <a href="" class="item-header2">Contact</a>
        </div>
        <div>
        </div>
    </div>
    <div class="image-header-1" v-if="onPage != 'login' && onPage != 'addForm' && onPage != 'detail'">
        <div class="luar-sini container d-flex flex-row">
            <div class="image-header-2">
                <img src="https://colorlib.com/newspaper-x/wp-content/uploads/sites/15/2017/05/00_header_slider_02-550x360.jpg" alt="">
            </div>
            <div class="image-header-3">
                <img src="https://colorlib.com/newspaper-x/wp-content/uploads/sites/15/2017/05/00_header_slider_02-550x360.jpg" alt="">
                <img src="https://colorlib.com/newspaper-x/wp-content/uploads/sites/15/2017/05/00_header_slider_02-550x360.jpg" alt="">
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props : ['onPage'],
    methods : {
        pindahPage(page){
            this.$emit('pindah' , page)
        }
    }
}
</script>

<style>
.header-1 {
    height: 122px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}



@media only screen and (min-width: 1270px) {
.title-logo-2 img {
    padding-top: 19px;
    /* padding-right: 270px; */
    width: 729;
    height: 90;
}
.title-logo  {
    /* padding-top: 30px; */
    /* margin-right: 310px; */
    width: 5px;
    height: 4px;
}

}

@media only screen and (max-width: 1270px) {
    .title-logo-2 img {
        width: 0;
        height: 0;
    }
    .title-logo img {
        padding-top: 25px;
        margin: 0 auto;
    }
}


.header-2 {
    height: 65px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    border-top: 1px solid;
    border-top-color: #dcdcdc;
    border-bottom: 1px solid;
    border-bottom-color: #dcdcdc;
    width: 100%;
} 

.content-header2 {
    height: 100%;
    width: 50%;
    margin-right: 720px;
    margin-top: 20px;
}

.item-header2 {
    margin-left: 20px;
    font-family: nunito sans,sans-serif;
    font-size: 15px;
    color: #939393;
}
.image-header-1 {
    background-color: #0e0e11;
    height: 440px;
}

.luar-sini {
    height: 100%;
}
.image-header-2 {
    height: 100%;
}
.image-header-2 img {
    opacity: 0.6;
    height: 100%;
}

.image-header-3 {
    height: 100%;
}
.image-header-3 img {
    opacity: 0.6;
    height: 50%;
}
</style>