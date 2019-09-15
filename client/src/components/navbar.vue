<template>
    <div>
        <div id="after-login">
        <div class="container" id="container-navbar">
                <div class="item-navbar" id="logo-navbar">
                    <img src="./logo.png" id="logo-navbar">
                </div>
                <h3 id="tagline">Yuk Cerita-cerita Sore</h3>
                <input type="text" id="mySearch" placeholder="Search.." title="Type in a category">
                <div class="item-navbar" id="login-logout" @click.prevent="logout"><button class="button"><span>Logout</span></button></div>
        </div>        
    </div>
</template>

<script>
export default {
    methods:{
        logout(){
            Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Logout"
            }).then(result=>{
                if(result.value){
                    this.$emit("signout");
                    localStorage.removeItem("token");
                    Swal.fire("Success!","Successfully LoggedOut!", "success");
                } else {
                    Swal.close()
                }
            }).catch(error=>{
                    let message =
            (error.response.data && error.response.data.message) ||
            "failed to logout something wrong with our server";
          Swal.fire("Error!", message, "error");
                })
            
        }
    }
}
</script>

<style scoped>
#container-navbar{
    display:flex;
    justify-content:space-between;
    align-items: center
}
#mySearch{
    height: 20px;
    width: 140px;
}
#login-logout{
    margin-right: 30px;
}

#tagline{
    margin-right: 500px;
}

#menu-navbar{
    align-items:center;
}

#logo-navbar {
    width:200px;
    height:120px;
}
</style>