<template>
    <div class="navbar-sss">
        <div class="navbar1">
            <div class="navbar1-item1">
                <div class="icon-1">
                    Icon
                </div>
                <div class="title-1">
                    Latest-News
                </div>
            </div>

            <div class="navbar1-item2">
                Dimana ini woeoeoeoeo
            </div>

        </div>
        <div class="navbar2">
            <div class="search-1">
                <input type="text" placeholder="Search...">
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>


@media only screen and (min-width: 571px) {
    .navbar1-item2 {
        font-size: 15px;
        padding-top: 10px;
        padding-left: 7px;
        color: #ffffff
    }
}
@media only screen and (max-width: 571px) {
    .navbar1-item2 {
        display: none;
    }
}
.navbar-sss {
    width: 100%;
    height: 42px;
    background-color: #05132D;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.navbar1 {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    height: 100%;
}

.navbar1-item1 {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    background-color: #09396D;
    height: 100%;
    width: 168px;
}

/* .navbar1-item2 {
    font-size: 15px;
    padding-top: 10px;
    padding-left: 7px;
    color: #ffffff
} */

.title-1{
    margin-top: 13px;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 13px;
    color: #fff;
    font-weight: 700;
}

.icon-1{
    padding-top: 10px;
    font-size: 15px;
    padding-right: 15px;
    padding-left: 9px;
}

.navbar2 {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.search-1 input {
    border: none;
    color: #fff;
    background-color: #05132D;
    margin-top: 10px;
}

::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: #fff;
    font-size: 15px;
  }

</style>