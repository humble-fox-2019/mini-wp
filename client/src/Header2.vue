<template>
  <div>
    <div class="header-1">
        <div class="title-logo">
            <!-- <img src="https://storage.cloud.google.com/sultanrh32/gambar.png" alt=""> -->
        </div>
        <div class="title-logo-2">
            <img src="https://colorlib.com/newspaper-x/wp-content/uploads/sites/15/2017/05/banner.png" alt="">
        </div>
    </div>
    <div class="header-2">
        <div class="content-header2">
            <a href="" class="item-header2">Home</a>
            <a href="" class="item-header2">News</a>
            <a href="" class="item-header2">Blog</a>
            <a href="" class="item-header2">Contact</a>
        </div>
        <div>
        </div>
    </div>
    <div class="image-header-1">
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

}
</script>

<style>
.header-1 {
    height: 122px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    border-bottom: 1px solid;
    border-bottom-color: whitesmoke;
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
} 

.content-header2 {
    height: 100%;
    width: 50%;
    /* margin-left: 320px; */
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